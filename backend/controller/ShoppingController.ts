import { IShoppingBLL } from "../interfaces/BLL/IShoppingBLL";
import { IShoppingController } from "../interfaces/controller/IShoppingController"

export class ShoppingController implements IShoppingController {
    private readonly shoppingBusiness: IShoppingBLL;
    constructor(
        shoppingBusiness: IShoppingBLL
    ) {
        this.shoppingBusiness = shoppingBusiness;
    }

    public async GetStock(req, res): Promise<void> {
        try {
            const product = req.params.product;
            await this.shoppingBusiness.GetStock(product)
            .then(x => {
                res.status(200);
                res.send(x);
            });
        }
        catch(err) {
            res.status(err.status);
            res.send({message: err.message})
        }
    }
    public async RegisterStock(req, res): Promise<void> {
        try {
            await this.shoppingBusiness.RegisterStock(req.body)
            .then(x => {
                res.status(200);
                res.send(x);
            });
        }
        catch(err) {
            res.status(err.status);
            res.send({message: err.message})
        }
    }
}