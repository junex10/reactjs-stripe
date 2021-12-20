import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import { getSaleByEmail, getUserById } from './../../services/services.module';
import moment from 'moment';

class Shopping extends Component {
    constructor(props) {
        super(props)

        this.state = {
            sales: []
        }

        this.id = props.id !== undefined ? props.id : '';

        this.columns = [
            {
                name: 'Compra',
                selector: row => row.id
            },
            {
                name: 'Precio total',
                selector: row => row.price
            },
            {
                name: 'Fecha efectuada',
                selector: row => row.createDate
            }
        ];

        if (this.id !== undefined) {
            getUserById(this.id)
                .then(user => {
                    getSaleByEmail(user.data.email)
                        .then(value => {
                            const sales = value.data;
                            let getSales = [];
                            sales.map(salesValue => {
                                let cont = 0;
                                salesValue.sale.map(salesProducts => cont += salesProducts.price)
                                return getSales.push({
                                    id: salesValue.id,
                                    price: cont,
                                    createDate: moment(salesValue.createDate).format('DD/MM/YYYY hh:mm A')
                                })
                            })
                            this.setState({
                                sales: getSales
                            })
                        })
                })
        }
    }
    render() {
        return (
            <>
                <DataTable
                    columns={this.columns}
                    data={this.state.sales}
                />
            </>
        );
    }
}

export default Shopping;