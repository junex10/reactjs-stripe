import { IStripeBLL } from "../interfaces/BLL/IStripeBLL";
import { IStripeController } from "../interfaces/controller/IStripeController";

export class StripeController implements IStripeController {
    private readonly stripeBusiness: IStripeBLL;
    constructor(
        stripeBusiness: IStripeBLL
    ) {
        this.stripeBusiness = stripeBusiness;
    }

    public async GetPayments(req: any, res: any): Promise<void> {
        try {
            await this.stripeBusiness.GetPayments()
                .then(x => {
                    res.status(200);
                    res.send(x);
                });
        } 
        catch(err) {
            res.status(err.status);
            res.send({ message: err.message })
        }
    }
    
}