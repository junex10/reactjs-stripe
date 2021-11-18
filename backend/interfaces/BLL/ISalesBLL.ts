import {
    GetSpentDTO,
    GetCartDTO,
    NewSaleDTO,
    GetSaleDTO
} from "../../dtos/dtos.module";
export interface ISalesBLL{
    GetSpent(spent: string, email: string): Promise<GetSpentDTO[] | Object>;
    GetCart(email: string, img?: boolean): Promise<GetCartDTO[]>;
    NewSale(data: NewSaleDTO): Promise<Object>;
    GetSale(email: string, image?: string): Promise<GetSaleDTO[] | GetSaleDTO>;
}