import { IStripeBLL } from "../interfaces/BLL/IStripeBLL";
import { Stripe } from 'stripe';
import Sales from "../context/schemas/SalesSchema";
import {
    APIKEYSTRIPE,
    APIVERSIONSTRIPE
} from './../commons/config';
export class StripeBLL implements IStripeBLL {
    constructor() { }

    public GetPayments(id?: string): Promise<Object | Object[]> {
        return new Promise(async (resolve, reject) => {
            const apiKey = APIKEYSTRIPE;
            const stripe = new Stripe(apiKey, {
                apiVersion: APIVERSIONSTRIPE
            });
            if (id !== undefined) {
                Sales.schema
                    .findOne({ _id: id })
                    .then(async sale => {
                        const pi = sale.paymentIntent;
                        await stripe.paymentIntents.retrieve(pi)
                            .then(async stripeVal => {
                                const charges = stripeVal.charges;
                                if (charges.data.length > 0) {
                                    const { paid } = charges.data[0];
                                    if (paid) {
                                        await Sales.schema.updateOne({ _id: id }, { confirm: paid });
                                        resolve({ message: 'Pago confirmado', paid: true })
                                    } else reject({ statu: 500, message: 'No se ha confirmado el pago' })
                                } else reject({ statu: 500, message: 'No se ha confirmado el pago' })
                            })
                    })
                    .catch((y) => {
                        reject({ status: 500, message: 'No se pudo verificar la confirmación el pago' })
                    })
            } else {
                await stripe.paymentIntents.list()
                    .then(payments => {
                        if (payments.data.length > 0) {
                            resolve(payments.data)
                        } else resolve({ message: 'No hay pagos efectuados' })
                    })
                    .catch(() => reject({ status: 500, message: 'No se pudo consultar al servidor' }))
            }
        });
    }

}