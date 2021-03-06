import * as bcrypt from 'bcrypt';

import Users from './../context/schemas/UsersSchema';

import { IUserBLL } from "../interfaces/BLL/IUserBLL";

import {
    GetUsersDTO,
    GetUserByIdDTO,
    AuthUsersDTO,
    AuthUserSavedDTO,
    RegisterUserDTO,
    EditUserEmailDTO,
    EditUserPasswordDTO,
    UpdatePhoneDTO,
    UpdateNamesDTO,
    UpdateCreditCard,
    GetUserByEmailDTO,
    AddCardDTO,
    AddCartDTO,
    GetClientsDTO,
    DecodeTokenDTO
} from './../dtos/dtos.module';

import { JWTAuthManager } from "../auth/JWTAuthManager";
import { User } from '../interfaces/entities/User';
import { ACCESS, ACCESS_KEY, APIKEYSTRIPE, APIVERSIONSTRIPE } from '../commons/config';
import { Stripe } from 'stripe';
import { BcryptEnum } from './../commons/enum/index.enum';
import * as jwt from 'jsonwebtoken';
import { Utility } from '../utilitys/Utility';
import { IAPPSettings } from '../interfaces/IAPPSettings';

export class UserBLL implements IUserBLL {

    constructor(
    ) {
    }
    public async AuthUser(data: AuthUsersDTO): Promise<AuthUserSavedDTO> {
        return await new Promise((resolve, reject) => {
            let dataFinded: GetUserByIdDTO;
            Users.schema.find({ email: data.email })
                .then((val: any) => {
                    bcrypt.compare(data.password, val[0].password)
                        .then(async (compare: boolean) => {
                            if (compare) {
                                dataFinded = {
                                    email: val[0].email,
                                    profile: val[0].profile,
                                    permits: val[0].permits,
                                    person: val[0].person,
                                    cards: val[0].cards,
                                    id: val[0].id,
                                    client: val[0].client,
                                    created: val[0].createData
                                };
                                new JWTAuthManager().buildToken(dataFinded)
                                    .then((value: AuthUserSavedDTO) => {
                                        resolve(value);
                                    });
                            } else {
                                reject({
                                    status: 500,
                                    message: 'No se encontr?? al usuario y/o la clave es inv??lida'
                                });
                            }
                        });
                })
                .catch(() => {
                    reject({
                        status: 500,
                        message: 'No se encontr?? al usuario'
                    });
                });
        });
    }
    public async GetUsers(data: GetClientsDTO): Promise<GetUsersDTO[]> {
        return await new Promise((resolve, reject) => {
            let datos: GetUsersDTO[] = [];
            Users.schema
                .find()
                .then((x: any) => {
                    if (x.length > 0) {
                        x.forEach((value, index) => {
                            if (index < data.limit) {
                                datos.push({
                                    id: value._id,
                                    email: value.email,
                                    password: value.password,
                                    profile: value.profile,
                                    person: value.person,
                                    permits: value.permits,
                                    client: value.client,
                                    created: value.createDate
                                });
                            }
                        });
                        resolve(datos);
                    } else {
                        reject({
                            status: 500,
                            message: 'No hay usuarios registrados'
                        })
                    }
                })
                .catch(y => {
                    reject({ status: 500, message: 'No hay usuarios registrados' })
                })
        });
    }
    public async GetUserById(id: string): Promise<GetUserByIdDTO> {
        return await new Promise((resolve, reject) => {
            let data: GetUserByIdDTO;
            Users.schema
                .find()
                .where('_id', id)
                .then((x: any) => {
                    const val = x[0];
                    data = {
                        id: val._id,
                        email: val.email,
                        password: val.password,
                        profile: val.profile,
                        permits: val.permits,
                        person: val.person,
                        client: val.client,
                        cards: val.cards,
                        created: val.createDate
                    };
                    resolve(data);
                })
                .catch(y => reject({ status: 500, message: 'No se encontr?? al usuario' }))
        });
    }
    public async RegisterUser(data: RegisterUserDTO): Promise<Object> {
        return await new Promise((resolve, reject) => {
            if (data.password !== data.repeat_password) {
                reject({ status: 500, message: 'La contrase??a no es igual' })
            } else {
                Users.schema
                    .find({ email: data.email })
                    .then(async founded => {
                        if (founded.length > 0) reject({ status: 500, message: 'El usuario ya existe' })
                        else {
                            const apiKey = APIKEYSTRIPE;
                            const stripe = new Stripe(apiKey, {
                                apiVersion: APIVERSIONSTRIPE
                            });
                            let hashPassword: string = '';
                            const userProfile = (data.userType !== undefined) ? data.userType : 'Usuario';
                            await bcrypt.hash(data.password, BcryptEnum.saltRound)
                                .then((passwordHashed: string) => hashPassword = passwordHashed);
                            const userAccess = ACCESS.find(val => val.name == userProfile);
                            const userKeys = ACCESS_KEY.find(val => val.name == userProfile);
                            if (userAccess === undefined || userKeys === undefined) reject({ status: 400, message: 'No se existe el perfil de usuario ' })
                            else {
                                stripe.customers.create({
                                    description: 'Normal user',
                                    email: data.email
                                })
                                    .then(stripeData => {
                                        const newUser: User = {
                                            email: data.email,
                                            password: hashPassword,
                                            profile: {
                                                role: userProfile,
                                                access: userAccess.views
                                            },
                                            permits: {
                                                name: 'Usuario',
                                                keys: userKeys.keys
                                            },
                                            person: {
                                                name: data.person.name,
                                                lastname: data.person.lastname,
                                                areaCode: data.person.areaCode,
                                                phone: data.person.phone,
                                                active: true  
                                            },
                                            client: stripeData.id,
                                            createDate: new Date(),
                                            online: false
                                        };
                                        Users.schema
                                            .collection
                                            .insertOne(newUser)
                                            .then((x: any) => {
                                                resolve({
                                                    message: 'Usuario registrado sastifactoriamente'
                                                });
                                            })
                                            .catch(y => reject({ status: 500, message: 'No se pudo registrar el usuario' }))
                                    })
                                    .catch(() => reject({ status: 500, message: 'Ha ocurrido un error de conexi??n' }))

                            }
                        }
                    })
            }
        });
    }
    public async UpdatePhone(data: UpdatePhoneDTO): Promise<UpdatePhoneDTO> {
        return await new Promise((resolve, reject) => {
            Users.schema
                .findOne({ email: data.email })
                .then(async val => {
                    if (val.person !== undefined) {
                        await Users.schema
                            .findOneAndUpdate({ email: val.email }, {
                                person: {
                                    areaCode: data.areaCode,
                                    phone: data.phone,
                                    name: val.person.name,
                                    lastname: val.person.lastname
                                }
                            })
                    } else {
                        await Users.schema
                            .findOneAndUpdate({ email: val.email }, {
                                person: {
                                    areaCode: data.areaCode,
                                    phone: data.phone,
                                    name: '',
                                    lastname: ''
                                }
                            })
                    }
                    const changedPhone: UpdatePhoneDTO = {
                        phone: data.phone,
                        areaCode: data.areaCode,
                        email: data.email
                    };
                    resolve(changedPhone);
                })
                .catch(y => {
                    reject({ status: 500, message: 'No se pudo cambiar el n??mero de tel??fono' })
                });
        });
    }
    public async UpdateNames(data: UpdateNamesDTO): Promise<UpdateNamesDTO> {
        return await new Promise((resolve, reject) => {
            Users.schema
                .findOne({ email: data.email })
                .then(async val => {
                    if (val.person !== undefined) {
                        await Users.schema
                            .findOneAndUpdate({ email: data.email }, {
                                person: {
                                    areaCode: val.person.areaCode,
                                    phone: val.person.phone,
                                    name: data.name,
                                    lastname: data.lastname
                                }
                            })
                    } else {
                        await Users.schema
                            .findOneAndUpdate({ email: data.email }, {
                                person: {
                                    areaCode: '',
                                    phone: '',
                                    name: data.name,
                                    lastname: data.lastname
                                }
                            })
                    }
                    const changedNames: UpdateNamesDTO = {
                        email: data.email,
                        name: data.name,
                        lastname: data.lastname
                    };
                    resolve(changedNames);
                })
                .catch(y => reject({ status: 500, message: 'No se pudo cambiar los nombres' }));
        });
    }
    public async UpdateEmail(data: EditUserEmailDTO): Promise<EditUserEmailDTO> {
        return await new Promise((resolve, reject) => {
            Users.schema
                .findOneAndUpdate({ email: data.email }, {
                    email: data.newEmail
                })
                .then(x => {
                    if (x !== null) {
                        const changedEmail: EditUserEmailDTO = {
                            email: data.email,
                            newEmail: data.newEmail
                        };
                        resolve(changedEmail);
                    } else reject({ status: 400, message: 'No se pudo encontrar el correo electr??nico' });
                })
                .catch(y => reject({ status: 500, message: 'No se pudo cambiar el correo electr??nico' }));
        })
    }
    public async UpdatePassword(data: EditUserPasswordDTO): Promise<Object> {
        return await new Promise(async (resolve, reject) => {
            var passwordBcrypt: string = '';
            await bcrypt.hash(data.newPassword, BcryptEnum.saltRound)
                .then((passwordHash: string) => {
                    passwordBcrypt = passwordHash
                });
            Users.schema
                .findOneAndUpdate({ email: data.email }, {
                    password: passwordBcrypt
                })
                .then(x => {

                    if (x !== null) {
                        resolve({
                            message: 'Contrase??a cambiada correctamente'
                        });
                    } else reject({ status: 400, message: 'No se pudo encontrar el correo electr??nico' });
                })
                .catch(y => reject({ status: 500, message: 'No se pudo cambiar la contrase??a' }));
        })
    }
    public async UpdateCreditCard(data: UpdateCreditCard): Promise<Object> {
        return await new Promise((resolve, reject) => {
            Users.schema
                .findOne({ email: data.email })
                .then(userData => {
                    if (userData === null) reject({ status: 400, message: 'No se encontr?? al usuario' })
                    else {
                        const cards = userData.cards;
                        const changeCard = {
                            creditCardNumber: data.newCreditCard,
                            cvc: data.cvc,
                            expirationDate: data.expirationDate
                        };
                        let autoIncrement = 0;
                        cards.map((value, index) => {
                            if (value.creditCardNumber === data.creditCardNumber) {
                                cards.splice(index, 1);
                                autoIncrement++;
                            }
                        });
                        cards.push(changeCard);

                        if (autoIncrement === 1) {
                            Users.schema
                                .updateOne({ email: data.email }, {
                                    cards: cards
                                })
                                .then(() => {
                                    resolve({ message: 'Tarjeta de cr??dito actualizada' })
                                })
                                .catch(y => reject({ status: 500, message: 'No se pudo actualizar la tarjeta de cr??dito' }));
                        } else {
                            reject({ status: 400, message: 'No se encontr?? la tarjeta de cr??dito' })
                        }
                    }
                })
                .catch(y => {
                    reject({ status: 400, message: 'No se encontr?? al usuario' })
                });
        });
    }
    public async NewUser(data: RegisterUserDTO): Promise<AuthUserSavedDTO> {
        return await new Promise((resolve, reject) => {
            if (data.password !== data.repeat_password) {
                reject({ status: 400, message: 'La contrase??a no es igual' })
            } else {
                let dataFinded: GetUserByIdDTO;
                Users.schema
                    .find({ email: data.email })
                    .then(async founded => {
                        if (founded.length > 0) reject({ status: 400, message: 'El usuario ya existe' })
                        else {
                            const apiKey = APIKEYSTRIPE;
                            const stripe = new Stripe(apiKey, {
                                apiVersion: APIVERSIONSTRIPE
                            });
                            let hashPassword: string = '';
                            const userProfile = (data.userType !== undefined) ? data.userType : 'Usuario';
                            await bcrypt.hash(data.password, BcryptEnum.saltRound)
                                .then((passwordHashed: string) => hashPassword = passwordHashed);
                            const userAccess = ACCESS.find(val => val.name == userProfile);
                            const userKeys = ACCESS_KEY.find(val => val.name == userProfile);
                            if (userAccess === undefined || userKeys === undefined) reject({ status: 400, message: 'No se existe el perfil de usuario ' })
                            else {
                                stripe.customers.create({
                                    description: 'Normal user into the store stripe',
                                    email: data.email
                                })
                                    .then(stripeData => {
                                        const newUser: User = {
                                            email: data.email,
                                            password: hashPassword,
                                            profile: {
                                                role: userProfile,
                                                access: userAccess.views
                                            },
                                            permits: {
                                                name: 'Usuario',
                                                keys: userKeys.keys
                                            },
                                            client: stripeData.id,
                                            createDate: new Date(),
                                            online: false
                                        };
                                        Users.schema
                                            .collection
                                            .insertOne(newUser)
                                            .then((x: any) => {
                                                Users.schema
                                                    .findOne({ email: data.email })
                                                    .then((z: any) => {
                                                        dataFinded = {
                                                            email: z.email,
                                                            profile: z.profile,
                                                            permits: z.permits,
                                                            id: z.id,
                                                            client: z.client,
                                                            created: z.createData
                                                        };
                                                        new JWTAuthManager().buildToken(dataFinded)
                                                            .then((value: AuthUserSavedDTO) => {
                                                                resolve(value);
                                                            });
                                                    })
                                            })
                                            .catch(y => reject({ status: 400, message: 'No se pudo registrar el usuario' }))
                                    })
                                    .catch(() => reject({ status: 500, message: 'Ha ocurrido un error de conexi??n' }))
                            }
                        }
                    })
            }
        });
    }
    public GetUserByEmail(email: string, way?: string): Promise<GetUserByEmailDTO | AuthUserSavedDTO> {
        return new Promise((resolve, reject) => {
            let data: GetUserByEmailDTO;
            Users.schema
                .find()
                .where('email', email)
                .then((x: any) => {
                    if (x.length > 0) {
                        const val = x[0];
                        data = {
                            id: val._id,
                            email: val.email,
                            password: val.password,
                            profile: val.profile,
                            permits: val.permits,
                            person: val.person,
                            cards: val.cards,
                            client: val.client,
                            created: val.createDate
                        };
                        if (way === 'auth') {
                            new JWTAuthManager().buildToken(data)
                                .then((value: AuthUserSavedDTO) => {
                                    resolve(value);
                                });
                        } else resolve(data);
                    } else reject({ status: 500, message: 'No se encontr?? al usuario' })
                })
                .catch(y => {
                    reject({ status: 500, message: 'No se encontr?? al usuario' })
                })
        });
    }
    public AddCard(data: AddCardDTO): Promise<AddCardDTO> {
        return new Promise((resolve, reject) => {
            let dataReturn: AddCardDTO;
            Users.schema
                .findOne({ email: data.email })
                .then(val => {
                    const findCard = val.cards.find(card => card.creditCardNumber === data.creditCardNumber);
                    if (findCard !== undefined) reject({ status: 400, message: 'La tarjeta ya est?? registrada' });
                    else {
                        let cards = [...val.cards];
                        cards.push({
                            creditCardNumber: data.creditCardNumber,
                            cvc: data.cvc,
                            expirationDate: data.expirationDate
                        });
                        Users.schema
                            .updateOne({ email: data.email }, {
                                cards: cards
                            })
                            .then(() => {
                                dataReturn = {
                                    email: data.email,
                                    creditCardNumber: data.creditCardNumber,
                                    cvc: data.cvc,
                                    expirationDate: data.expirationDate
                                };
                                resolve(dataReturn)
                            })
                            .catch(() => reject({ status: 500, message: 'Error desconocido al registrar nueva tarjeta' }))
                    }
                })
        });
    }
    public AddCart(data: AddCartDTO): Promise<AddCartDTO> {
        return new Promise((resolve, reject) => {
            Users.schema
                .findOneAndUpdate({ email: data.email }, {
                    cart: data.cart
                })
                .then(value => {
                    if (value !== null) {
                        const actualCart: AddCartDTO = {
                            email: data.email,
                            cart: data.cart
                        };
                        resolve(actualCart)
                    } else reject({ status: 400, message: 'No se encontr??n al usuario' })
                })
                .catch(() => reject({ status: 500, message: 'Error de conexi??n, no se pudo guardar el carrito de compras' }))
        })
    }
    public DecodeToken(token: string): Promise<DecodeTokenDTO> {
        return new Promise((resolve, reject) => {
            new Utility().AppSettingsJson()
            .then((settings: IAPPSettings) => {
                const decodeToken = jwt.verify(token, settings.Jwt.Key);
                resolve(decodeToken);
            })
            .catch(() => reject({ status: 500, message: 'Error de conexi??n, no se pudo decodificar el token' }))
        })
    }
}