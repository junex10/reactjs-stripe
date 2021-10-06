import React, { Component } from 'react';

import BuyButtons from './BuyButtons';

class Products extends Component {
    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-3'>
                        <div className='card'>
                            <div className='card-title'>
                                <img className='image' src='https://www.estrategiaynegocios.net/csp/mediapool/sites/dt.common.streams.StreamServer.cls?STREAMOID=tEiqzpyZB9KQ34ElgK5VT8$daE2N3K4ZzOUsqbU5sYvO$hCK717SNqjH3GhHEJaH6FB40xiOfUoExWL3M40tfzssyZqpeG_J0TFo7ZhRaDiHC9oxmioMlYVJD0A$3RbIiibgT65kY_CSDiCiUzvHvODrHApbd6ry6YGl5GGOZrs-&CONTENTTYPE=image/jpeg'
                                    alt='carro' />
                            </div>
                            <div className='card-body'>
                                <div className='mb-3'>
                                    <span class="badge badge-primary">Carros</span>
                                </div>
                                Precio del carro <b>40000$</b>
                                <BuyButtons />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Products;