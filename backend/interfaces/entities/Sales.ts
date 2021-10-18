import { Entity } from './../entities/Entity';
export interface Sales extends Entity{
    sale: SaleInfo
}
export interface SaleInfo {
    product: string,
    price: number,
    many: number,
    category: string,
    image?: string
}