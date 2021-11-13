export class GetCartDTO{
    product: string;
    price: number;
    many: number;
    image?: string;
}
export class AddCartDTO{
    email: string;
    cart: CartDTO[];
}
export class CartDTO{
    product: string;
    price: number;
    many: number;
}