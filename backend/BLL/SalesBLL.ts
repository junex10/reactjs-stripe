import Sales from './../context/schemas/SalesSchema';
import { ISalesBLL } from "../interfaces/BLL/ISalesBLL";
import {
    GetSpentDTO,
    GetCartDTO,
    NewSaleDTO
} from './../dtos/dtos.module';
import { Stripe } from 'stripe';
import { Utility } from './../utilitys/Utility';

export class SalesBLL implements ISalesBLL {
    constructor() { }

    public GetSpent(spent: string, email: string): Promise<GetSpentDTO[] | Object> {
        return new Promise((resolve, reject) => {
            Sales.schema
                .find({ 'buyerEmail': email })
                .then(val => {
                    if (val.length > 0) {
                        let defaultData: GetSpentDTO[];
                        switch (spent) {
                            case 'month':
                                const actualMonth = new Date().getMonth() + 1;
                                let data = [];
                                val.map((date: any) => {
                                    if (actualMonth === new Date(date.createDate).getMonth() + 1) {
                                        date.sale.map(value => {
                                            data.push({
                                                spentType: value.category,
                                                spent: value.price
                                            })
                                        })
                                    }
                                });
                                defaultData = [...data];
                                resolve(defaultData);
                                break;
                            case 'year':
                                const actualYear = new Date().getFullYear();
                                let dataYear = [];
                                val.map((date: any) => {
                                    if ((new Date(date.createDate).getFullYear()) === actualYear) {
                                        date.sale.map(value => {
                                            dataYear.push({
                                                spentType: value.category,
                                                spent: value.price
                                            })
                                        })
                                    }
                                })
                                defaultData = [...dataYear];
                                resolve(defaultData);
                                break;
                            default:
                                let dataAll = [];
                                val.map((date: any) => {
                                    date.sale.map(value => {
                                        dataAll.push({
                                            spentType: value.category,
                                            spent: value.price
                                        })
                                    })
                                })
                                resolve(dataAll);
                                break;
                        }
                    } else {
                        reject({ status: 500, message: 'No se encontró ninguna venta' })
                    }
                })
                .catch(y => {
                    reject({ status: 500, message: 'No se encontró ninguna venta' })
                })
        });
    }
    public GetCart(email: string, img?: boolean): Promise<GetCartDTO[]> {
        return new Promise((resolve, reject) => {
            Sales.schema
                .findOne({ buyerEmail: email })
                .then(val => {
                    let data: GetCartDTO[];
                    let tmpData = [];
                    val.sale.map(sale => {
                        tmpData.push({
                            product: sale.product,
                            price: sale.price,
                            many: sale.many,
                            image: (img) ? (sale.image !== undefined) ? sale.image : '' : ''
                        })
                    });
                    data = [...tmpData];
                    resolve(data);
                })
                .catch(y => {
                    reject({ status: 500, message: 'No se encontró ningun carrito de compras' })
                })
        });
    }
    public NewSale(data: NewSaleDTO[]): Promise<Object> {
        return new Promise((resolve, reject) => {
            const utility = new Utility();
            utility.AppSettingsJson()
                .then(async (val: any) => {
                    const apiKey = val.Parameters.APIKEYSTRIPE;
                    const stripe = new Stripe(apiKey, {
                        apiVersion: '2020-08-27'
                    });
                    const domain = "http://localhost:4000";
                    const session = await stripe.checkout.sessions.create({
                        line_items: [
                            {
                                price: 'price_1Ju30wA7sSACybeETYnF4QzF',
                                quantity: 1,
                            },
                        ],
                        payment_method_types: [
                            'card',
                        ],
                        mode: 'subscription',
                        success_url: `${domain}/success.html`,
                        cancel_url: `${domain}/cancel.html`
                    })
                    resolve({
                        paymentUrl: session.url
                    });
                });
        })
    }

}