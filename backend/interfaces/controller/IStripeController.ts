export interface IStripeController{
    GetPayments(req, res): Promise<void>;
}