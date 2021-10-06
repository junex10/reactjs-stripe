import { Entity } from './../entities/Entity';
export interface User extends Entity{
    email: string,
    password: string,
    profile: Profile,
    apply?: boolean,
    online: boolean
}
export interface Profile{
    role: string,
    access: Access
}
export interface Access{
    view: string,
    controlName: string
}