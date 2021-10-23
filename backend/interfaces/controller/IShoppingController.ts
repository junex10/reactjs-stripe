export interface IShoppingController{
    GetStock(req, res): Promise<void>;
    RegisterStock(req, res): Promise<void>;
    UpdateStock(req, res): Promise<void>;
    DeleteStock(req, res): Promise<void>;
}