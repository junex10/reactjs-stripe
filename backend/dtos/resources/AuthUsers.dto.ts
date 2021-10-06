import { Profile } from "../../interfaces/entities/User";

import { GetUserByIdDTO } from './GetUsers.dto';

export class AuthUsersDTO{
    email: string;
    password: string;
}
export class AuthUserSavedDTO{
    user: string;
    token: string;
}