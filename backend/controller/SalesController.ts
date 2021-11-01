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
                    const spent = req.params.spent;
                    await this.salesBusiness.GetSpent(spent)
                        .then(x => {
                            res.status(200);
                            res.send(x);
                        })
                } catch(err) {
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