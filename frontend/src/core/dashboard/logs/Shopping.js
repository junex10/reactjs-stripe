import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import { getSales } from './../../services/services.module';
import moment from 'moment';
import { Link } from 'react-router-dom';

class Shopping extends Component{
    constructor(props){
        super(props)

        this.state = {
            sales: []
        }

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

        getSales()
        .then(value => {
            const sales = value.data;
            let getSales = [];
            sales.map(salesValue => {
                let cont = 0;
                salesValue.sale.map(salesProducts => cont += salesProducts.price)
                getSales.push({
                    id: <Link to=''>{salesValue.id}</Link>,
                    price: cont,
                    createDate: moment(salesValue.createDate).format('DD/MM/YYYY hh:mm A')
                })
            })
            this.setState({
                sales: getSales
            })
        })

        this.data = [
            {
                buy: 'UEEE00001',
                price: '20.3$',
                date: '11/10/2021'
            }
        ]
    }
    render(){
        return(
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