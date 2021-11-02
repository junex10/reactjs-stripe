import { Entity } from './../entities/Entity';
export interface User extends Entity{
    email: string,
    password: string,
    profile: Profile,
    apply?: boolean,
    online: boolean,
    cards?: Cards[],
    person?: Person,
    permits: Permits,
    cart?: Cart[]
}
export interface Profile{
    role: string,
    access: Access[]
}
export interface Access{
    view: string
}
export interface Cards{
    creditCardNumber: string,
    cvc: number,
    expirationDate: string
}
export interface Person{
    name: string;
    lastname: string;
    phone?: string;
    areaCode?: string;
    active?: boolean;
}
export interface Permits{
    name: string,
    keys?: PermitsKeys[]
}
export interface PermitsKeys{
    name: string,
    control: ControlKeys
}
export interface ControlKeys{
    [index: number]: string;
}
export interface Cart{
    product: string,
    price: number,
    many: number
}