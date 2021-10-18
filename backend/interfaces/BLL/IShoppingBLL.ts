import { 
    GetStock,
    RegisterStock
} from "../../dtos/dtos.module";

export interface IShoppingBLL{
    GetStock(product?: string): Promise<GetStock[] | GetStock>;
    RegisterStock(data: RegisterStock): Promise<RegisterStock>;
}