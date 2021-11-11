import React, { Component, useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { APIKEYSTRIPE } from './../../../commons/config';
import { userSession } from './../../../commons/config';
import { withRouter } from 'react-router-dom';
import { newSale } from './../../services/services.module';

class BuyButtons extends Component {
    constructor(props) {
        super(props);
        this.stripePromise = loadStripe(APIKEYSTRIPE);
        this.product = props.product;
    }

    directBuy = () => {
        console.log(this.product);
        newSale([
            {
                "product": "Computadora DELL"
            },
            {
                "product": "Ferrari"
            }
        ])
        .then(val => {
            const paymentUrl = val.data.paymentUrl;
            document.location.href = paymentUrl;
        })
    }
    render() {
        return (
            <div className='row bodyItemCard mt-4'>
                {
                    userSession !== null ?
                        <div className='col-12 col-sm-12 col-lg-6 col-md-6'>
                            <button className='btn btn-success btn-block' id='addCart'><i className="fas fa-shopping-basket"></i></button>
                        </div>
                        : ''
                }
                {
                    userSession !== null ?
                        <div className='col-12 col-sm-12 col-lg-6 col-md-6'>
                            <button className='btn btn-success btn-block' id='buy' onClick={this.directBuy}><i className="fas fa-money-check"></i></button>
                        </div>
                        :
                        <div className='col-12'>
                            <button className='btn btn-success btn-block' id='buy' onClick={this.directBuy}><i className="fas fa-money-check"></i></button>
                        </div>
                }

            </div>
        );
    }
}

export default withRouter(BuyButtons);