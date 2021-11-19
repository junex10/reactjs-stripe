export class GetStock {
    product: string;
    stock: number;
    category: string;
    image?: string;
    price: number;
    createDate?: Date;
}
export class RegisterStock {
    product: string;
    price: number;
    stock: number;
    category: string;
    image?: string;
    createDate?: Date;
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