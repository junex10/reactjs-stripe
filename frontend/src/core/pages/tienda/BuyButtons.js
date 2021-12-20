import React, { Component } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { APIKEYSTRIPE } from './../../../commons/config';
import { userSession } from './../../../commons/config';
import { withRouter } from 'react-router-dom';
import { newSale } from './../../services/services.module';
import { Typography } from '@mui/material';
import SweetAlert from 'react-bootstrap-sweetalert';
import { addItemToCart } from './../../services/services.module';

class BuyButtons extends Component {
    constructor(props) {
        super(props);
        this.stripePromise = loadStripe(APIKEYSTRIPE);
        this.product = props.product;

        this.state = {
            requiredSession: false
        }
    }
    onSession = () => setTimeout(() => document.location.href = '/login', 5000)
    directBuy = () => {
        if (userSession !== null) {
            newSale([{ "product": this.product, "many": 1 }], userSession.user)
                .then(val => {
                    const paymentUrl = val.data.paymentUrl;
                    document.location.href = paymentUrl;
                })
        } else this.setState({ requiredSession: true })
    }
    directCart = () => {
        addItemToCart(userSession.user, {
            product: 'Ferrari',
            price: 200000,
            many: 1
        })
    }
    render() {
        return (
            <>
                <SweetAlert
                    show={this.state.requiredSession}
                    title={<Typography component={'div'} className="headingModal mt-2 mb-4 text-danger" variant={'h5'}>Iniciar sesión</Typography>}
                    showCloseButton
                    closeBtnStyle={{ boxShadow: 'none' }}
                    showConfirm={false}
                    danger
                    onConfirm={this.onSession}
                >
                    <div className="bodyModal">
                        Se requiere de una cuenta para efectuar una compra
                    </div>
                </SweetAlert>
                <div className='row bodyItemCard mt-4'>
                    {
                        userSession !== null ?
                            <>
                                {/*
                                    <div className='col-12 col-sm-12 col-lg-6 col-md-6'>
                                        <button className='btn btn-success btn-block' id='addCart' onClick={this.directCart}><i className="fas fa-shopping-basket"></i></button>
                                    </div>
                                */}
                            </>
                            : ''
                    }
                    {
                        userSession !== null ?
                            <div className='col-12 col-sm-12 col-lg-12 col-md-12'>
                                <button className='btn btn-success btn-block' id='buy' onClick={this.directBuy}><i className="fas fa-money-check"></i></button>
                            </div>
                            :
                            <div className='col-12'>
                                <button className='btn btn-success btn-block' id='buy' onClick={this.directBuy}><i className="fas fa-money-check"></i></button>
                            </div>
                    }

                </div>
            </>
        );
    }
}

export default withRouter(BuyButtons);