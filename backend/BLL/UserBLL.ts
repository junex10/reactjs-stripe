import Users from './../context/schemas/UsersSchema';

import { IUserBLL } from "../interfaces/BLL/IUserBLL";

import {
    GetUsersDTO, 
    GetUserByIdDTO,
    AuthUsersDTO,
    AuthUserSavedDTO,
    RegisterUserDTO
} from './../dtos/dtos.module';

import { JWTAuthManager } from "../auth/JWTAuthManager";
import { User } from '../interfaces/entities/User';

import * as bcrypt from 'bcrypt';

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
    public async RegisterUser(data: RegisterUserDTO): Promise<RegisterUserDTO> {
        return await new Promise((resolve, reject) => {
            if (data.password !== data.repeat_password) {
                reject({ status: 500, message: 'La contraseña no es igual' })
            } else {
                Users.schema
                    .find({ email: data.email })
                    .then(founded => {
                        if (founded.length > 0) reject({ status: 500, message: 'El usuario ya existe' })
                        else {
                            let newData: RegisterUserDTO;
                            const newUser: User = {
                                email: data.email,
                                password: data.password,
                                profile: {
                                    role: "Usuario",
                                    access: [
                                        {
                                            view: "userProfile",
                                            controlName: "all"
                                        },
                                        {
                                            view: "userLogs",
                                            controlName: "all"
                                        },
                                        {
                                            view: "userAccount",
                                            controlName: "all"
                                        }
                                    ]
                                },
                                online: false
                            };
                            Users.schema
                                .collection
                                .insertOne(newUser)
                                .then((x: any) => {
                                    newData = {
                                        email: data.email,
                                        password: data.password,
                                        repeat_password: data.repeat_password
                                    };
                                    resolve(newData);
                                })
                                .catch(y => reject({ status: 500, message: 'No se pudo registrar el usuario' }))
                        }
                    })
            }
        });
    }
}