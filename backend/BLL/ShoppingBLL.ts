import Shopping from './../context/schemas/ShoppingSchema';
import { IShoppingBLL } from "../interfaces/BLL/IShoppingBLL";

import {
    GetStock,
    RegisterStock,
    UpdateStock,
    DeleteStock
} from '../dtos/dtos.module';

export class ShoppingBLL implements IShoppingBLL {

    constructor() { }

    public GetStock(product?: string): Promise<GetStock[] | GetStock> {
        return new Promise(async (resolve, reject) => {
            if (product == undefined) {
                let stock: GetStock[] = [];
                await Shopping.schema
                    .find()
                    .then(products => {
                        products.forEach((val: any) => {
                            stock.push({
                                product: val.product,
                                stock: val.stock,
                                category: val.category,
                                image: (val.image !== undefined) ? val.image : null
                            })
                        });
                        resolve(stock);
                    })
                    .catch(y => reject({ status: 500, message: 'No se pudo registrar el usuario' }))
            } else {
                let stock: GetStock;
                await Shopping.schema
                    .findOne({ product: product })
                    .then(product => {
                        stock = {
                            product: product.product,
                            stock: product.stock,
                            category: product.category,
                            image: (product.image !== undefined) ? product.image : null
                        };
                        resolve(stock);
                    })
                    .catch(y => reject({ status: 500, message: 'No se encontró el producto' }))
            }
        });
    }
    public RegisterStock(data: RegisterStock): Promise<RegisterStock> {
        return new Promise((resolve, reject) => {
            Shopping.schema
                .find({ product: data.product })
                .then(val => {
                    if (val.length > 0) reject({ status: 400, message: 'El producto ya existe' })
                    else {
                        Shopping.schema
                            .collection
                            .insertOne(data)
                            .then(() => {
                                const registeredStock: RegisterStock = {
                                    product: data.product,
                                    price: data.price,
                                    stock: data.stock,
                                    category: data.category
                                };
                                resolve(registeredStock)
                            })
                            .catch(y => reject({ status: 500, message: 'No se pudo registrar el producto' }))
                    }
                })
                .catch(y => reject({ status: 500, message: 'No se pudo verificar el producto' }));
        });
    }
    public UpdateStock(data: UpdateStock): Promise<Object> {
        return new Promise((resolve, reject) => {
            Shopping.schema
                .updateOne({ _id: data.id }, {
                    product: data.product,
                    price: data.price,
                    stock: data.stock,
                    category: data.category,
                    image: (data.image === undefined) ? "" : data.image
                })
                .then(() => {
                    resolve({
                        message: 'Producto actualizado!'
                    })
                })
                .catch(y => reject({ status: 500, message: 'No se pudo actualizar el producto' }))
        });
    }
    public DeleteStock(data: DeleteStock): Promise<Object> {
        return new Promise((resolve, reject) => {

        });
    }
}