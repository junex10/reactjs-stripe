import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import moment from 'moment';
import { Typography } from '@mui/material';

import { KeyCardEdit } from '../forms.module';
import { auth } from './../../auth/AuthUser.auth';
import { userSession } from './../../../commons/config';
import SweetAlert from 'react-bootstrap-sweetalert';
import AddCard from './form/AddCard';
import { getUserById } from './../../services/services.module';

class Card extends Component {
    constructor(props) {
        super(props);
        this.id = props.id;
        let actions = '';
        this.data = [];
        if (this.id === undefined) {
            actions = auth.permits.keys.find(val => val.name === 'all' || val.name === 'account');
            this.email = userSession.user;
            auth.cards.forEach(val => {
                const dateParsed = val.expirationDate.replaceAll('/', '-');
                this.data.push({
                    keycard: <p id={val.creditCardNumber} style={{ color: 'blue', cursor: 'pointer' }} onClick={() => {
                        if (this.state.actions.creditCard) this.setState({ editKeyCard: true, card: { actualKeyCard: val.creditCardNumber, actualCvc: val.cvc, expirationDate: moment(dateParsed, 'DD-MM-YYYY').format('MM/YY') } })
                    }}>{this.hideKeyCard(val.creditCardNumber)}</p>,
                    dateExpired: moment(dateParsed, 'DD-MM-YYYY').format('MM/YY'),
                    cvc: val.cvc
                })
            })
        } else {
            getUserById(this.id)
                .then(value => {
                    const data = value.data;
                    const email = data.email;
                    actions = data.permits.keys.find(val => val.name === 'all' || val.name === 'account');
                    const { userData } = props;
                    userData(data);
                    data.cards.forEach(val => {
                        const dateParsed = val.expirationDate.replaceAll('/', '-');
                        this.data.push({
                            keycard: <p id={val.creditCardNumber} style={{ color: 'blue', cursor: 'pointer' }} onClick={() => {
                                if (this.state.actions.creditCard) this.setState({ editKeyCard: true, card: { actualKeyCard: val.creditCardNumber, actualCvc: val.cvc, expirationDate: moment(dateParsed, 'DD-MM-YYYY').format('MM/YY') } })
                            }}>{this.hideKeyCard(val.creditCardNumber)}</p>,
                            dateExpired: moment(dateParsed, 'DD-MM-YYYY').format('MM/YY'),
                            cvc: val.cvc
                        });
                    });
                    this.setState({
                        allCreditCards: {
                            creditCards: this.data,
                            email: email
                        }
                    })
                })
        }
        this.state = {
            editKeyCard: false,
            card: {
                actualKeyCard: '',
                actualCvc: '',
                expirationDate: ''
            },
            actions: {
                creditCard: this.id === undefined ? (actions.control.find(val => val === 'creditCard' || val === 'all') ? true : false) : true
            },
            addCard: false,
            allCreditCards: {
                creditCards: false,
                email: ''
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
            }/*,
            {
                name: 'Fecha registro',
                selector: row => row.date
            }*/
        ]
    }
    hideKeyCard = keyCard => {
        const lenCard = keyCard.length;
        const card = keyCard.split('');
        let newKeyCard = [];
        card.map((val, index) => (lenCard - 4 > index) ? newKeyCard.push(val.replace(val, '*')) : newKeyCard.push(val));
        return newKeyCard.join('');
    }

    onShowAddCard = e => this.setState({ addCard: e });
    onShowCardEdit = e => this.setState({ editKeyCard: e });

    render() {
        return (
            <>
                <div className='row'>
                    <div className='col-2'>
                        <button className='btn btn-success btn-add' onClick={() => this.setState({ addCard: true })}><i className="fas fa-plus"></i></button>
                    </div>
                </div>
                <SweetAlert
                    show={this.state.addCard}
                    title={<Typography component={'div'} className="headingModal mt-2 mb-4" variant={'h6'}>Agregar Tarjeta de credito</Typography>}
                    showCloseButton
                    closeBtnStyle={{ boxShadow: 'none' }}
                    showConfirm={false}
                    onConfirm={() => this.setState({ addCard: false })}
                    onCancel={() => this.setState({ addCard: false })}
                >
                    <div className="bodyModal">
                        <AddCard email={this.id === undefined ? this.email : this.state.allCreditCards.email} show={this.onShowAddCard} />
                    </div>
                </SweetAlert>
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
                        <KeyCardEdit show={this.onShowCardEdit} creditNumber={this.state.card.actualKeyCard} cvc={this.state.card.actualCvc} expirationDate={this.state.card.expirationDate} email={this.id === undefined ? this.email : this.state.allCreditCards.email} />
                    </div>
                </SweetAlert>
                {
                    this.id === undefined ?
                        <DataTable
                            columns={this.columns}
                            data={this.data}
                        />
                        :
                        <DataTable
                            columns={this.columns}
                            data={this.state.allCreditCards.creditCards}
                        />
                }

            </>
        );
    }
}
export default Card;