import { IStripeBLL } from "../interfaces/BLL/IStripeBLL";
import { IStripeController } from "../interfaces/controller/IStripeController";

export class StripeController implements IStripeController {
    private readonly stripeBusiness: IStripeController;
    constructor(
        stripeBusiness: IStripeController
    ) {
        this.stripeBusiness = stripeBusiness;
    }
}