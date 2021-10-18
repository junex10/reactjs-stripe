import { Entity } from './../entities/Entity';
export interface Shopping extends Entity{
    product: string,
    price: number,
    stock: number,
    promotion?: Promotion,
    category: string,
    image?: string
}
export interface Promotion{
    promotion: string,
    balance: number,
    starDate: Date,
    endDate: Date
}