import Sales from './../context/schemas/SalesSchema';
import Shopping from './../context/schemas/ShoppingSchema';
import User from './../context/schemas/UsersSchema';
import { ISalesBLL } from "../interfaces/BLL/ISalesBLL";
import {
    GetSpentDTO,
    GetCartDTO,
    NewSaleDTO,
    GetSaleDTO
} from './../dtos/dtos.module';
import { Stripe } from 'stripe';
import {
    APIKEYSTRIPE,
    APIVERSIONSTRIPE
} from './../commons/config';
import { SaleInfo } from './../interfaces/entities/Index';
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
    public NewSale(data: NewSaleDTO): Promise<Object> {
        return new Promise(async (resolve, reject) => {
            // Obtener primero los productos que se estan comprando en base de datos
            await Shopping.schema
                .find()
                .then(resultFetch => {
                    let productsTmp = [];
                    let lineItems = [];
                    resultFetch.map(products => {
                        const fetchingProduct = data.products.find(z => z.product === products.product)
                        const actualProduct = fetchingProduct !== undefined ? fetchingProduct.product : null;
                        if (products.product === actualProduct) {
                            productsTmp.push({
                                product: products.product,
                                price: products.price,
                                many: data.products.find(x => x.product === products.product).many,
                                category: products.category,
                                image: products.image
                            });
                            lineItems.push({
                                price_data: {
                                    currency: 'usd',
                                    product_data: {
                                        name: products.product,
                                    },
                                    unit_amount: products.price * 100
                                },
                                quantity: data.products.find(x => x.product === products.product).many
                            });
                        }
                    });
                    const productsSales = {
                        buyerEmail: data.email,
                        sale: productsTmp,
                        confirm: false,
                        paymentIntent: ''
                    };
                    Sales.schema
                        .collection
                        .insertOne(productsSales)
                        .then(async salePushed => {
                            const insertedId = salePushed.insertedId;
                            const apiKey = APIKEYSTRIPE;
                            const stripe = new Stripe(apiKey, {
                                apiVersion: APIVERSIONSTRIPE
                            });
                            const domain = "http://localhost:3000/";
                            const client = (await User.schema.findOne({ email: data.email })).client;
                            await stripe.checkout.sessions.create({
                                payment_method_types: ['card'],
                                line_items: lineItems,
                                mode: 'payment',
                                success_url: `${domain}accepted-payment/${insertedId}`,
                                cancel_url: `${domain}cancelled-payment/`,
                                customer: client
                            })
                                .then(async payment => {
                                    await Sales.schema
                                        .updateOne({ _id: insertedId }, {
                                            paymentIntent: payment.payment_intent.toString()
                                        })
                                        productsTmp.map(async products => {
                                            const product = products.product;
                                            const stock = (await Shopping.schema.findOne({ product: product })).stock;
                                            const newStock = stock - products.many;
                                            Shopping.schema
                                                .updateOne({ product: product }, {
                                                    stock: newStock
                                                })
                                                .then(() => {
                                                    resolve({
                                                        paymentUrl: payment.url
                                                    });
                                                })
                                        })
                                })
                        })
                        .catch((y) => {
                            reject({ status: 500, message: 'No se pudo procesar la compra' })
                        })

                    // Confirmar pago es requerido mediante un demonio
                    // Hacer modulo de devolucion
                })
                .catch((y) => {
                    reject({ status: 500, message: 'No se pudo procesar la compra' })
                })
        })
    }
    public GetSale(email: string, image?: string): Promise<GetSaleDTO[] | GetSaleDTO> {
        return new Promise((resolve, reject) => {
            if (email !== undefined) {
                let data: GetSaleDTO[] = [];
                Sales.schema
                    .find({ buyerEmail: email })
                    .then(value => {
                        if (value.length > 0) {
                            value.map(x => {
                                if (image === undefined || image === 'true') {
                                    data.push({
                                        id: x.id,
                                        sale: x.sale,
                                        createDate: x.createDate
                                    })
                                } else {
                                    let newSale = [];
                                    x.sale.map(saleProducts => {
                                        newSale.push({
                                            product: saleProducts.product,
                                            price: saleProducts.price,
                                            many: saleProducts.many,
                                            category: saleProducts.category
                                        });
                                    });
                                    data.push({
                                        id: x.id,
                                        sale: newSale,
                                        createDate: x.createDate
                                    });
                                }
                            })
                        }
                        resolve(data)
                    })
                    .catch((y) => {
                        reject({ status: 500, message: 'Error de conexión' })
                    })
            } else {
                let data: GetSaleDTO[] = [];
                Sales.schema
                    .find()
                    .then(value => {
                        value.map(salesValue => {
                            let saleFormat: SaleInfo[] = [];
                            salesValue.sale.map(salesProduct => {
                                saleFormat.push({
                                    product: salesProduct.product,
                                    price: salesProduct.price,
                                    many: salesProduct.many,
                                    category: salesProduct.category
                                })
                            });
                            data.push({
                                id: salesValue.id,
                                sale: saleFormat,
                                createDate: salesValue.createDate
                            })
                        })
                        resolve(data);
                    })
                    .catch((y) => {
                        reject({ status: 500, message: 'Error de conexión' })
                    })
            }
        });
    }

}