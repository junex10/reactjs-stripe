import React, { Component } from 'react';

import Account from './Account';
import Card from './Card';

import {
    BasicWindow,
    SectionTitleWindow
} from './../../shared/shared.module';

import { getUser, setUser } from './../../services/services.module';
import { userSession } from './../../../commons/config';

class Config extends Component {
    constructor(props){
        super(props);
        
        this.email = userSession.user;
        getUser(this.email)
        .then(val => setUser(val.data))
    }
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