export class GetStock {
    product: string;
    stock: number;
    category: string;
    image?: string;
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
export class DeleteStock {
    id: string;
}