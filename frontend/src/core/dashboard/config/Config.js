import React, { Component } from 'react';

import Account from './Account';
import Card from './Card';

import {
    BasicWindow,
    SectionTitleWindow
} from './../../shared/shared.module';

class Config extends Component {
    render() {
        return (
            <>
                <div className="container-fluid">
                    <SectionTitleWindow title='Administración de cuenta' />
                    <div className='row'>
                        <div className='col-12'>
                            <BasicWindow title='Cuenta'>
                                <Account />
                            </BasicWindow>
                        </div>
                        <div className='col-12'>
                            <BasicWindow title='Tarjetas asociadas'>
                                <Card />
                            </BasicWindow>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Config;