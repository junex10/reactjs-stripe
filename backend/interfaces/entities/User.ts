import { Entity } from './../entities/Entity';
export interface User extends Entity{
    email: string,
    password: string,
    profile: Profile,
    apply?: boolean,
    online: boolean,
    cards?: Cards
}
export interface Profile{
    role: string,
    access: Access[]
}
export interface Access{
    view: string,
    controlName: string
}
export interface Cards{
    keyCardNumber: string,
    cvc: number,
    expirationDate: string
}