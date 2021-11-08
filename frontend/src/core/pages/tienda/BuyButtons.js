import React, { Component } from 'react';

import { userSession } from './../../../commons/config';

class BuyButtons extends Component {
    constructor(props) {
        super(props);

        this.product = props.product;
    }

    directBuy = () => {
        console.log(this.product);
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

export default BuyButtons;