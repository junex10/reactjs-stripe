import Shopping from './../context/schemas/ShoppingSchema';
import Category from './../context/schemas/CategorySchema';
import { IShoppingBLL } from "../interfaces/BLL/IShoppingBLL";

import {
    GetStock,
    RegisterStock,
    UpdateStock,
    GetCategory,
    NewCategoryDTO
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
                        products.map((val: any) => {
                            stock.push({
                                product: val.product,
                                stock: val.stock,
                                category: val.category,
                                image: (val.image !== undefined) ? val.image : null,
                                price: val.price,
                                createDate: val.createDate
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
                            image: (product.image !== undefined) ? product.image : null,
                            price: product.price,
                            createDate: product.createDate
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
                                    category: data.category,
                                    image: data.image,
                                    createDate: new Date() // Revisar que no se esta registrando la fecha de stock
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
                .findOne({ _id: data.id })
                .then(d => {
                    if (d !== null) {
                        Shopping.schema
                        .updateOne({ _id: data.id }, {
                            product: (data.product === undefined) ? d.product : data.product,
                            price: (data.price === undefined) ? d.price : data.price,
                            stock: (data.stock === undefined) ? d.stock : data.stock,
                            category: (data.category === undefined) ? d.category : data.category,
                            image: (data.image === undefined) ? d.image : data.image
                        })
                        .then(() => {
                            resolve({
                                message: 'Producto actualizado!'
                            })
                        })
                        .catch(y => reject({ status: 500, message: 'No se pudo actualizar el producto' }))
                    } else reject({ status: 400, message: 'No se pudo encontrar el producto' })
                })
                .catch(y => reject({ status: 400, message: 'No se pudo encontrar el producto' }))
        });
    }
    public DeleteStock(productId: string): Promise<Object> {
        return new Promise((resolve, reject) => {
            if (productId === undefined) {
                Shopping.schema
                    .deleteMany()
                    .then(() => resolve({ message: 'Productos eliminados!'}))
                    .catch(y => reject({ status: 400, message: 'No se pudo eliminar los productos' }))
            } else {
                Shopping.schema
                    .findOne({ _id: productId })
                    .then(d => {
                        if (d !== null) {
                            Shopping.schema
                                .deleteOne({ _id: productId})
                                .then(() => resolve({ message: 'Producto eliminado'}))
                                .catch(y => reject({ status: 500, message: 'No se pudo eliminar el producto' }))

                        } else reject({ status: 400, message: 'No se pudo encontrar el producto' })
                    })
                    .catch(y => reject({ status: 400, message: 'No se pudo encontrar el producto' }))
            }
        });
    }
    public GetStockByCategory(category: string): Promise<GetStock[]> {
        return new Promise(async (resolve, reject) => {
            let data: GetStock[];
            let tmpData = [];
            if (category !== 'Sin filtros') {
                await Shopping.schema
                    .find({ category: category })
                    .then(value => {
                        if (value.length > 0) {
                            value.map(valProduct => {
                                tmpData.push({
                                    id: valProduct._id,
                                    product: valProduct.product,
                                    stock: valProduct.stock,
                                    category: valProduct.category,
                                    image: valProduct.image,
                                    price: valProduct.price
                                });
                            })
                            data = [...tmpData];
                            resolve(data);
                        } else reject({ status: 500, message: 'No se pudo encontrar el producto' })
                    })
                    .catch(y => {
                        reject({ status: 500, message: 'No se pudo encontrar el producto' })
                    })
            } else {
                await Shopping.schema
                    .find()
                    .then(value => {
                        if (value.length > 0) {
                            value.map(valProduct => {
                                tmpData.push({
                                    id: valProduct._id,
                                    product: valProduct.product,
                                    stock: valProduct.stock,
                                    category: valProduct.category,
                                    image: valProduct.image,
                                    price: valProduct.price
                                });
                            })
                            data = [...tmpData];
                            resolve(data);
                        } else reject({ status: 500, message: 'No se pudo encontrar el producto' })
                    })
                    .catch(y => {
                        reject({ status: 500, message: 'No se pudo encontrar el producto' })
                    })
            }
        });
    }
    public GetCategory(): Promise<GetCategory[]> {
        return new Promise((resolve, reject) => {
            let data: GetCategory[];
            Category.schema
                .find()
                .then(value => {
                    let tmpData = [];
                    value.map(val => tmpData.push({ name: val.name }));
                    data = [...tmpData];
                    resolve(data);
                })
                .catch(y => reject({ status: 500, message: 'No se pudo encontrar el producto' }))
        });
    }
    public NewCategory(data: NewCategoryDTO): Promise<NewCategoryDTO> {
        return new Promise((resolve, reject) => {
            Category.schema.collection
                .insertOne(data)
                .then(() => {
                    const newReturn: NewCategoryDTO = {
                        name: data.name
                    };
                    resolve(newReturn)
                })
                .catch(y => reject({ status: 500, message: 'No se pudo crear la categoria' }))
        })
    }
    
}