import React, { Component } from 'react';

import Shopping from './Shopping';
import Cart from './Cart';
import Popular from './Popular';

import {
    BasicWindow,
    SectionTitleWindow
} from './../../shared/shared.module';

class Log extends Component {
    render() {
        return (
            <>
                <div className="container-fluid">
                    <SectionTitleWindow title='Historial' />
                    <div className='row'>
                        <div className='col-12 col-sm-12 col-md-6 col-lg-6'>
                            <BasicWindow title='Compras'>
                                <Shopping />
                            </BasicWindow>
                        </div>
                        <div className='col-12 col-sm-12 col-md-6 col-lg-6'>
                            <BasicWindow title='Carrito'>
                                <Cart />
                            </BasicWindow>
                        </div>
                        <div className='col-12'>
                            <BasicWindow title='Popular'>
                                <Popular />
                            </BasicWindow>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Log;