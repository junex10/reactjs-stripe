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
    AddCardDTO
} from './../dtos/dtos.module';

import { JWTAuthManager } from "../auth/JWTAuthManager";
import { User } from '../interfaces/entities/User';
import { ACCESS, ACCESS_KEY } from '../commons/config';

import { BcryptEnum } from './../commons/enum/index.enum';

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
                                    id: val[0].id
                                };
                                new JWTAuthManager().buildToken(dataFinded)
                                    .then((value: AuthUserSavedDTO) => {
                                        resolve(value);
                                    });
                            } else {
                                reject({
                                    status: 500,
                                    message: 'No se encontró al usuario y/o la clave es inválida'
                                });
                            }
                        });
                })
                .catch(() => {
                    reject({
                        status: 500,
                        message: 'No se encontró al usuario'
                    });
                });
        });
    }
    public async GetUsers(): Promise<GetUsersDTO[]> {
        return await new Promise((resolve, reject) => {
            let datos: GetUsersDTO[] = [];
            Users.schema
                .find()
                .then((x: any) => {
                    if (x.length > 0) {
                        x.forEach(value => {
                            datos.push({
                                id: value._id,
                                email: value.email,
                                password: value.password,
                                profile: value.profile,
                                person: value.person,
                                permits: value.permits
                            });
                            resolve(datos);
                        });
                    } else {
                        reject({
                            status: 500,
                            message: 'No hay usuarios registrados'
                        })
                    }
                })
                .catch(y => reject({ status: 500, message: 'No hay usuarios registrados' }))
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
                        person: val.person
                    };
                    resolve(data);
                })
                .catch(y => reject({ status: 500, message: 'No se encontró al usuario' }))
        });
    }
    public async RegisterUser(data: RegisterUserDTO): Promise<Object> {
        return await new Promise((resolve, reject) => {
            if (data.password !== data.repeat_password) {
                reject({ status: 500, message: 'La contraseña no es igual' })
            } else {
                Users.schema
                    .find({ email: data.email })
                    .then(async founded => {
                        if (founded.length > 0) reject({ status: 500, message: 'El usuario ya existe' })
                        else {
                            let hashPassword: string = '';
                            const userProfile = (data.userType !== undefined) ? data.userType : 'Usuario';
                            await bcrypt.hash(data.password, BcryptEnum.saltRound)
                                .then((passwordHashed: string) => hashPassword = passwordHashed);
                            const userAccess = ACCESS.find(val => val.name == userProfile);
                            const userKeys = ACCESS_KEY.find(val => val.name == userProfile);
                            if (userAccess === undefined || userKeys === undefined) reject({ status: 400, message: 'No se existe el perfil de usuario ' })
                            else {
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
                    console.log(y)
                    reject({ status: 500, message: 'No se pudo cambiar el número de teléfono' })
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
                    } else reject({ status: 400, message: 'No se pudo encontrar el correo electrónico' });
                })
                .catch(y => reject({ status: 500, message: 'No se pudo cambiar el correo electrónico' }));
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
                            message: 'Contraseña cambiada correctamente'
                        });
                    } else reject({ status: 400, message: 'No se pudo encontrar el correo electrónico' });
                })
                .catch(y => reject({ status: 500, message: 'No se pudo cambiar la contraseña' }));
        })
    }
    public async UpdateCreditCard(data: UpdateCreditCard): Promise<Object> {
        return await new Promise((resolve, reject) => {
            Users.schema
                .findOne({ email: data.email })
                .then(userData => {
                    if (userData === null) reject({ status: 400, message: 'No se encontró al usuario' })
                    else {
                        const cards = userData.cards;
                        const changeCard = {
                            creditCardNumber: data.newCreditCard,
                            cvc: data.cvc,
                            expirationDate: data.expirationDate
                        };
                        let autoIncrement = 0;
                        cards.find((value, index) => {
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
                                    resolve({ message: 'Tarjeta de crédito actualizada' })
                                })
                                .catch(y => reject({ status: 500, message: 'No se pudo actualizar la tarjeta de crédito' }));
                        } else {
                            reject({ status: 400, message: 'No se encontró la tarjeta de crédito' })
                        }
                    }
                })
                .catch(y => reject({ status: 400, message: 'No se encontró al usuario' }));
        });
    }
    public async NewUser(data: RegisterUserDTO): Promise<AuthUserSavedDTO> {
        return await new Promise((resolve, reject) => {
            if (data.password !== data.repeat_password) {
                reject({ status: 400, message: 'La contraseña no es igual' })
            } else {
                let dataFinded: GetUserByIdDTO;
                Users.schema
                    .find({ email: data.email })
                    .then(async founded => {
                        if (founded.length > 0) reject({ status: 400, message: 'El usuario ya existe' })
                        else {
                            let hashPassword: string = '';
                            const userProfile = (data.userType !== undefined) ? data.userType : 'Usuario';
                            await bcrypt.hash(data.password, BcryptEnum.saltRound)
                                .then((passwordHashed: string) => hashPassword = passwordHashed);
                            const userAccess = ACCESS.find(val => val.name == userProfile);
                            const userKeys = ACCESS_KEY.find(val => val.name == userProfile);
                            if (userAccess === undefined || userKeys === undefined) reject({ status: 400, message: 'No se existe el perfil de usuario ' })
                            else {
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
                                                    id: z.id
                                                };
                                                new JWTAuthManager().buildToken(dataFinded)
                                                    .then((value: AuthUserSavedDTO) => {
                                                        resolve(value);
                                                    });
                                            })
                                    })
                                    .catch(y => reject({ status: 400, message: 'No se pudo registrar el usuario' }))
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
                            cards: val.cards
                        };
                        if (way === 'auth') {
                            new JWTAuthManager().buildToken(data)
                                .then((value: AuthUserSavedDTO) => {
                                    resolve(value);
                                });
                        } else resolve(data);
                    } else reject({ status: 500, message: 'No se encontró al usuario' })
                })
                .catch(y => {
                    console.log(y)
                    reject({ status: 500, message: 'No se encontró al usuario' })
                })
        });
    }
    public AddCard(data: AddCardDTO): Promise<AddCardDTO> {
        return new Promise((resolve, reject) => {
            let dataReturn: AddCardDTO;
            Users.schema
                .findOne({ email: data.email })
                .then(val => {
                    console.log(val.cards)
                    const findCard = val.cards.find(card => card.creditCardNumber === data.creditCardNumber);
                    if (findCard !== undefined) reject({ status: 400, message: 'La tarjeta ya está registrada' });
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
}