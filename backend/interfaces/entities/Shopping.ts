import { Entity } from './../entities/Entity';
export interface Shopping extends Entity{
    product: string,
    price: number,
    stock: number,
    category: string,
    image?: string
}