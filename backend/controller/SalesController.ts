import { ISalesBLL } from "../interfaces/BLL/ISalesBLL";
import { ISalesController } from "../interfaces/controller/ISalesController";
import { JWTAUTH } from "../commons/config";

export class SalesController implements ISalesController {
    private readonly salesBusiness: ISalesBLL;
    constructor(
        salesBusiness: ISalesBLL
    ) {
        this.salesBusiness = salesBusiness;
    }
    public async GetSpent(req, res): Promise<void> {
        await JWTAUTH
            .authToken(req.headers.authorization, { module: 'profile', control: 'spentReport' })
            .then(async () => {
                try {
                    const spent = req.params.date;
                    const email = req.params.email
                    await this.salesBusiness.GetSpent(spent, email)
                        .then(x => {
                            res.status(200);
                            res.send(x);
                        })
                } catch (err) {
                    res.status(err.status);
                    res.send({ message: err.message })
                }
            })
            .catch(err => {
                res.status(err.status);
                res.send({ message: err.message });
            });
    }
    public async GetCart(req, res): Promise<void> {
        try {
            const email = req.params.email;
            await this.salesBusiness.GetCart(email, true)
                .then(x => {
                    res.status(200);
                    res.send(x);
                })
        } catch (err) {
            res.status(err.status);
            res.send({ message: err.message })
        }
    }
    public async GetCartNotImage(req, res): Promise<void> {
        try {
            const email = req.params.email;
            await this.salesBusiness.GetCart(email, false)
                .then(x => {
                    res.status(200);
                    res.send(x);
                })
        } catch (err) {
            res.status(err.status);
            res.send({ message: err.message })
        }
    }
    public async NewSale(req: any, res: any): Promise<void> {
        try {
            await this.salesBusiness.NewSale(req.body)
                .then(x => {
                    res.status(200);
                    res.send(x);
                })
        } catch (err) {
            res.status(err.status);
            res.send({ message: err.message })
        }
    }
    public async GetSale(req: any, res: any): Promise<void> {
        await JWTAUTH
            .authToken(req.headers.authorization, { module: 'management', control: 'store' })
            .then(async () => {
                try {
                    const image = req.params.image;
                    const email = req.params.email;
                    await this.salesBusiness.GetSale(email, image)
                        .then(x => {
                            res.status(200);
                            res.send(x);
                        })
                } catch (err) {
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