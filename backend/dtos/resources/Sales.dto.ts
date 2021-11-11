export class NewSaleDTO{
    email?: string;
    products: NewSaleProductDTO[]
}
export class NewSaleProductDTO{
    product: string;
    many: number;
}