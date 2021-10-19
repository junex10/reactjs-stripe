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
    UpdateNamesDTO
} from './../dtos/dtos.module';

import { JWTAuthManager } from "../auth/JWTAuthManager";
import { User } from '../interfaces/entities/User';
import { currentUserCreated } from '../commons/config';

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
                        profile: val.profile
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
                            await bcrypt.hash(data.password, BcryptEnum.saltRound)
                            .then((passwordHashed: string) => hashPassword = passwordHashed);
                            const newUser: User = {
                                email: data.email,
                                password: hashPassword,
                                profile: {
                                    role: "Usuario",
                                    access: currentUserCreated
                                },
                                online: false
                            };
                            Users.schema
                                .collection
                                .insertOne(newUser)
                                .then((x: any) => {
                                    resolve({
                                        message: 'Contraseña cambiada correctamente'
                                    });
                                })
                                .catch(y => reject({ status: 500, message: 'No se pudo registrar el usuario' }))
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
                    await Users.schema
                        .findOneAndUpdate({ email: val.email }, {
                            person: {
                                areaCode: data.areaCode,
                                phone: data.phone,
                                name: val.person.name,
                                lastname: val.person.lastname
                            }
                        })
                    const changedPhone: UpdatePhoneDTO = {
                        phone: data.phone,
                        areaCode: data.areaCode,
                        email: data.email
                    };
                    resolve(changedPhone);
                })
                .catch(y => reject({ status: 500, message: 'No se pudo cambiar el número de teléfono' }));
        });
    }
    public async UpdateNames(data: UpdateNamesDTO): Promise<UpdateNamesDTO> {
        return await new Promise((resolve, reject) => {
            Users.schema
                .findOne({ email: data.email })
                .then(async val => {
                    await Users.schema
                        .findOneAndUpdate({ email: data.email }, {
                            person: {
                                areaCode: val.person.areaCode,
                                phone: val.person.phone,
                                name: data.name,
                                lastname: data.lastname
                            }
                        })
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
}