import { 
    GetStock,
    RegisterStock,
    UpdateStock,
    DeleteStock
} from "../../dtos/dtos.module";

export interface IShoppingBLL{
    GetStock(product?: string): Promise<GetStock[] | GetStock>;
    RegisterStock(data: RegisterStock): Promise<RegisterStock>;
    UpdateStock(data: UpdateStock): Promise<Object>;
    DeleteStock(data: DeleteStock): Promise<Object>;
}