import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import { getUsers } from './../../services/services.module';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Typography } from '@mui/material';
import AddNewClient from './form/AddNewClient';

class ClientsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: [],
            newClient: false
        }
        this.columns = [
            {
                name: 'Id',
                selector: row => row.client
            },
            {
                name: 'Tipo de cliente',
                selector: row => row.profile.role
            },
            {
                name: 'Correo electrónico',
                selector: row => row.email
            },
            {
                name: 'Creación',
                selector: row => row.created
            },
            {
                name: 'Ver',
                selector: row => row.details
            }
        ];
        getUsers()
            .then(value => {
                value.data.forEach(x => {
                    x.created = moment(x.created).format('DD/MM/YYYY hh:mm A');
                    x.details = <i onClick={this.details} id={x.id} className="fas fa-eye text-success" style={{ fontSize: '20px', cursor: 'pointer' }}></i>
                });
                this.setState({ clients: value.data })
            })
        this.data = props.clients;
    }
    details = self => {
        const id = self.target.id;
        this.props.history.push(`/dashboard/clients/${id}`);
    }
    render() {
        return (
            <>
                <SweetAlert
                    show={this.state.newClient}
                    title={<Typography component={'div'} className="headingModal mt-2 mb-4" variant={'h5'}>Agregar nuevo cliente</Typography>}
                    showCloseButton
                    closeBtnStyle={{ boxShadow: 'none' }}
                    showConfirm={false}
                    onConfirm={() => this.setState({ newClient: false })}
                    onCancel={() => this.setState({ newClient: false })}
                >
                    <div className="bodyModal">
                        <AddNewClient />
                    </div>
                </SweetAlert>
                <div className='row'>
                    <div className='col-10'>
                        <button className='btn btn-success btn-add' onClick={() => this.setState({ newClient: true })}><span style={{ fontWeight: 'bold' }}>NUEVO CLIENTE</span> <i className="fas fa-plus"></i></button>
                    </div>
                </div>
                <DataTable
                    columns={this.columns}
                    data={this.state.clients}
                />
            </>
        )
    }
}
export default withRouter(ClientsList);