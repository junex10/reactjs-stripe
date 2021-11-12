import React, { Component } from 'react';
import DataTable from 'react-data-table-component';

//import { Loader } from './../../shared/shared.module';

class Popular extends Component{
    constructor(props){
        super(props)

        this.columns = [
            {
                name: '',
                selector: row => row.image
            },
            {
                name: 'Producto',
                selector: row => row.product
            },
            {
                name: 'Precio',
                selector: row => row.price
            }
        ];

        this.data = [
            {
                image: <img width={100} className='mt-2 img-fluid' src='http://lorempixel.com/350/230/' alt='whatever' />,
                product: 'UEEE00001',
                price: '20.3$'
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

export default Popular;