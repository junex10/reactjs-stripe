export interface IShoppingController{
    GetStock(req, res): Promise<void>;
    RegisterStock(req, res): Promise<void>;
}