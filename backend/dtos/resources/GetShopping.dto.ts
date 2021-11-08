export class GetStock {
    product: string;
    stock: number;
    category: string;
    image?: string;
    price: number;
}
export class RegisterStock {
    product: string;
    price: number;
    stock: number;
    category: string;
    image?: string
}
export class UpdateStock {
    id: string;
    product: string;
    price: number;
    stock: number;
    category: string;
    image?: string;
}
export class GetCategory{
    name: string;
}