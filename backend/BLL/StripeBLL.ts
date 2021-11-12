import { IStripeBLL } from "../interfaces/BLL/IStripeBLL";
import { Stripe } from 'stripe';
import { Utility } from './../utilitys/Utility';

export class StripeBLL implements IStripeBLL {
    constructor() { }

    public GetPayments(): Promise<any> {
        return new Promise((resolve, reject) => {
            const utility = new Utility();
            utility.AppSettingsJson()
                .then(async (val: any) => {
                    const apiKey = val.Parameters.APIKEYSTRIPE;
                    const stripe = new Stripe(apiKey, {
                        apiVersion: '2020-08-27'
                    });
                    await stripe.paymentIntents.list({
                        limit: 3
                    })
                    .then(payments => {
                        console.log(payments, ' aqui')
                    })
                });
        });
    }

}