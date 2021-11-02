import Sales from './../context/schemas/SalesSchema';
import { ISalesBLL } from "../interfaces/BLL/ISalesBLL";

import {
    GetSpentDTO
} from './../dtos/dtos.module';

export class SalesBLL implements ISalesBLL {
    constructor() { }

    public GetSpent(spent: string, email: string): Promise<GetSpentDTO[] | Object> {
        return new Promise((resolve, reject) => {
            Sales.schema
                .find({ 'buyerEmail': email })
                .then(val => {
                    if (val.length > 0) {
                        let defaultData: GetSpentDTO[];
                        switch(spent) {
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
                                resolve(val);
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
}