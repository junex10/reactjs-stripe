export interface ISalesController{
    GetSpent(req, res): Promise<void>
    GetCart(req, res): Promise<void>
}