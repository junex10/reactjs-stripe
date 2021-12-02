import { IShoppingBLL } from "../interfaces/BLL/IShoppingBLL";
import { IShoppingController } from "../interfaces/controller/IShoppingController";
import { JWTAUTH } from "../commons/config";

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
        catch (err) {
            res.status(err.status);
            res.send({ message: err.message })
        }
    }
    public async RegisterStock(req, res): Promise<void> {
        await JWTAUTH
            .authToken(req.headers.authorization, { module: 'store', control: 'registerStock' })
            .then(async () => {
                try {
                    await this.shoppingBusiness.RegisterStock(req.body)
                        .then(x => {
                            res.status(200);
                            res.send(x);
                        });
                }
                catch (err) {
                    res.status(err.status);
                    res.send({ message: err.message })
                }
            })
            .catch(err => {
                res.status(err.status);
                res.send({ message: err.message });
            });

    }
    public async UpdateStock(req, res): Promise<void> {
        await JWTAUTH
            .authToken(req.headers.authorization, { module: 'store', control: 'updateStock' })
            .then(async () => {
                try {
                    await this.shoppingBusiness.UpdateStock(req.body)
                        .then(x => {
                            res.status(200);
                            res.send(x);
                        });
                }
                catch (err) {
                    res.status(err.status);
                    res.send({ message: err.message })
                }
            })
            .catch(err => {
                res.status(err.status);
                res.send({ message: err.message });
            });

    }
    public async DeleteStock(req, res): Promise<void> {
        await JWTAUTH
            .authToken(req.headers.authorization, { module: 'store', control: 'deleteStock' })
            .then(async () => {
                try {
                    await this.shoppingBusiness.DeleteStock(req.params.productId)
                        .then(x => {
                            res.status(200);
                            res.send(x);
                        });
                }
                catch (err) {
                    res.status(err.status);
                    res.send({ message: err.message })
                }
            })
            .catch(err => {
                res.status(err.status);
                res.send({ message: err.message });
            });
    }
    public async GetStockByCategory(req, res): Promise<void> {
        try {
            await this.shoppingBusiness.GetStockByCategory(req.params.category)
                .then(x => {
                    res.status(200);
                    res.send(x);
                });
        }
        catch (err) {
            res.status(err.status);
            res.send({ message: err.message })
        }
    }
    public async GetCategory(req: any, res: any): Promise<void> {
        try {
            await this.shoppingBusiness.GetCategory()
                .then(x => {
                    res.status(200);
                    res.send(x);
                });
        }
        catch (err) {
            res.status(err.status);
            res.send({ message: err.message })
        }
    }
    public async NewCategory(req: any, res: any): Promise<void> {
        await JWTAUTH
            .authToken(req.headers.authorization, { module: 'management', control: 'store' })
            .then(async () => {
                try {
                    await this.shoppingBusiness.NewCategory(req.body)
                        .then(x => {
                            res.status(200);
                            res.send(x);
                        });
                }
                catch (err) {
                    res.status(err.status);
                    res.send({ message: err.message })
                }
            })
            .catch(err => {
                res.status(err.status);
                res.send({ message: err.message });
            });
    }

}