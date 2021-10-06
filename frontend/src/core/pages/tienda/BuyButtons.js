import React, { Component } from 'react';

class BuyButtons extends Component {
    render() {
        return (
            <div className='row bodyItemCard mt-4'>
                <div className='col-12 col-sm-12 col-lg-6 col-md-6'>
                    <button className='btn btn-success' id='addCart'><i class="fas fa-cart-plus"></i>Carrito</button>
                </div>
                <div className='col-12 col-sm-12 col-lg-6 col-md-6'>
                    <button className='btn btn-success' id='buy'><i class="fas fa-shopping-basket"></i> Comprar</button>
                </div>
            </div>
        );
    }
}

export default BuyButtons;