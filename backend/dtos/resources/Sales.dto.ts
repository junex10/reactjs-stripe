import { SaleInfo } from "../../interfaces/entities/Sales";

export class NewSaleDTO{
    email: string;
    products: NewSaleProductDTO[]
}
export class NewSaleProductDTO{
    product: string;
    many: number;
}
export class GetSaleDTO{
    id: string;
    sale: SaleInfo[];
    createDate: Date;
}