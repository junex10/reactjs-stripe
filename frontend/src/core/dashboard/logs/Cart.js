import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
//import { Loader } from './../../shared/shared.module';

class Cart extends Component{
    constructor(props){
        super(props)

        this.columns = [
            {
                name: 'Compra',
                selector: row => row.buy
            },
            {
                name: 'Precio total',
                selector: row => row.price
            },
            {
                name: 'Fecha efectuada',
                selector: row => row.date
            }
        ];

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
                data={this.data}
               /> 
            </>
        );
    }
}

export default Cart;