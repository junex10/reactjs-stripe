import { Promotion } from "../../interfaces/entities/Shopping";

export class GetStock {
    product: string;
    stock: number;
    category: string;
    image?: string;
    promotion?: Promotion;
}
export class RegisterStock {
    product: string;
    price: number;
    stock: number;
    category: string;
    image?: string
}