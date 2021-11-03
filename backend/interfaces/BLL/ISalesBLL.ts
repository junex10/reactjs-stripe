import {
    GetSpentDTO,
    GetCartDTO
} from "../../dtos/dtos.module";
export interface ISalesBLL{
    GetSpent(spent: string, email: string): Promise<GetSpentDTO[] | Object>;
    GetCart(email: string, img?: boolean): Promise<GetCartDTO[]>;
}