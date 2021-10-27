import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import moment from 'moment';
import { Typography } from '@mui/material';

import { KeyCardEdit } from '../forms.module';
import { auth } from './../../auth/AuthUser.auth';

import SweetAlert from 'react-bootstrap-sweetalert';

class Card extends Component {
    constructor(props) {
        super(props);
        const actions = auth.permits.keys[1];
        this.state = {
            editKeyCard: false,
            actions: {
                creditCard: (actions.control.find(val => val === 'creditCard') ? true : false)
            }
        }

        this.columns = [
            {
                name: 'Número de tarjeta',
                selector: row => row.keycard
            },
            {
                name: 'Fecha de expiración',
                selector: row => row.dateExpired
            },
            {
                name: 'CVC',
                selector: row => row.cvc
            },
            {
                name: 'Fecha registro',
                selector: row => row.date
            }
        ]
        this.data = [
            {
                keycard: <p style={{color: 'blue', cursor: 'pointer'}} onClick={() => {
                    if (this.state.actions.creditCard) this.setState({ editKeyCard: true })
                }}>{this.hideKeyCard('4242 4242 4242 4242 4242')}</p>,
                dateExpired: moment().format('MM/YY'),
                cvc: '222',
                date: moment().format('DD/MM/YYYY hh:mm A')
            }
        ];
    }
    hideKeyCard = keyCard => {
        const lenCard = keyCard.length;
        const card = keyCard.split('');
        let newKeyCard = [];
        card.map((val, index) => (lenCard - 4 > index) ? newKeyCard.push(val.replace(val, '*')) : newKeyCard.push(val));
        return newKeyCard.join('');
    }

    render() {
        return (
            <>
                <SweetAlert
                    show={this.state.editKeyCard}
                    title={<Typography component={'div'} className="headingModal mt-2 mb-4" variant={'h6'}>Tarjeta de credito</Typography>}
                    showCloseButton
                    closeBtnStyle={{ boxShadow: 'none' }}
                    showConfirm={false}
                    onConfirm={() => this.setState({ editKeyCard: false })}
                    onCancel={() => this.setState({ editKeyCard: false })}
                >
                    <div className="bodyModal">
                        <KeyCardEdit />
                    </div>
                </SweetAlert>
                <DataTable
                    columns={this.columns}
                    data={this.data}
                />
            </>
        );
    }
}
export default Card;