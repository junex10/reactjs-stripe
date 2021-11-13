import React, { Component } from 'react';
import DataTable from 'react-data-table-component';

class ClientsList extends Component {
    constructor(props){
        super(props)
        this.columns = [
            {
                name: 'Id',
                selector: row => row.id
            },
            {
                name: 'Tipo de cliente',
                selector: row => row.clientType
            },
            {
                name: 'Correo electrónico',
                selector: row => row.email
            },
            {
                name: 'Creación',
                selector: row => row.created
            }
        ];
        this.data = props.data;
    }
    render() {
        return(
            <>
               <DataTable 
                columns={this.columns}
                data={this.data}
               /> 
            </>
        )
    }
}
export default ClientsList;