import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import { getAllStore } from './../../services/services.module';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Typography } from '@mui/material';
import AddNewProduct from './form/AddNewProduct';

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            newProduct: false
        }
        this.columns = [
            {
                name: 'Producto',
                selector: row => row.product
            },
            {
                name: 'Precio',
                selector: row => row.price
            },
            {
                name: 'En stock',
                selector: row => row.stock
            },
            {
                name: 'Categoria',
                selector: row => row.category
            },
            {
                name: 'Registrado',
                selector: row => row.createDate
            },
            {
                name: 'Imagen',
                selector: row => row.image
            }
        ];
        getAllStore()
            .then(value => {
                value.data.map(x => {
                    x.createDate = moment(x.createDate).format('DD/MM/YYYY hh:mm A')
                    x.image = <img src={x.image} alt={x.product} width={50} />
                    return x;
                });
                this.setState({ products: value.data })
            })
    }
    details = self => {
        const id = self.target.id;
        this.props.history.push(`/dashboard/store/${id}`);
    }
    render() {
        return (
            <>
               <SweetAlert
                    show={this.state.newProduct}
                    title={<Typography component={'div'} className="headingModal mt-2 mb-4" variant={'h5'}>Agregar nuevo producto</Typography>}
                    showCloseButton
                    closeBtnStyle={{ boxShadow: 'none' }}
                    showConfirm={false}
                    onConfirm={() => this.setState({ newProduct: false })}
                    onCancel={() => this.setState({ newProduct: false })}
                >
                    <div className="bodyModal">
                        <AddNewProduct />
                    </div>
                </SweetAlert>
                <div className='row'>
                    <div className='col-10'>
                        <button className='btn btn-success btn-add' onClick={() => this.setState({ newProduct: true })}><span style={{ fontWeight: 'bold' }}>NUEVO PRODUCTO</span> <i className="fas fa-plus"></i></button>
                    </div>
                </div>
                <DataTable
                    columns={this.columns}
                    data={this.state.products}
                />
            </>
        )
    }
}
export default withRouter(ProductList);