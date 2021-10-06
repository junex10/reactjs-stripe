import Users from './../context/schemas/UsersSchema';

import { IUserBLL } from "../interfaces/BLL/IUserBLL";

import { GetUsersDTO, GetUserByIdDTO } from "../dtos/resources/getUsers.dto";
import { AuthUsersDTO, AuthUserSavedDTO } from "../dtos/resources/AuthUsers.dto";

import { JWTAuthManager } from "../auth/JWTAuthManager";

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
}