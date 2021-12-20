import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    BasicWindow
} from './../../shared/shared.module';
import userSVG from './../../../img/dashboard/undraw_profile.svg';
import Card from '../config/Card';
import Shopping from '../logs/Shopping';

class ClientDetail extends Component {
    constructor(props) {
        super(props);
        this.id = props.match.params.id;

        this.state = {
            email: '',
            name: '',
            lastname: '',
            phone: ''
        }
    }
    onUserData = user => {
        this.setState({
            email: user.email,
            name: user.person.name,
            lastname: user.person.lastname,
            phone: user.person.phone
        });
    }
    render() {
        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-primary">Cuenta</h6>
                            </div>
                            <div className="card-body">
                                <div className='row'>
                                    <div className='col-12 mb-4'>
                                        <img width='100' className='mt-4 mb-4 d-block m-auto' alt='user' style={{ borderRadius: '50%' }} src={userSVG} />
                                        <p className='text-center mb-4 mt-4'>
                                            Email: <b>{this.state.email}</b>
                                        </p>
                                    </div>
                                    <div className='col-12 mb-4'>
                                        <div className='row'>
                                            <div className='col-12'>
                                                Nombre(s) y Apellido(s): <b>{`${this.state.name} ${this.state.lastname}`}</b>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12 mb-4'>
                                        <div className='row'>
                                            <div className='col-12'>
                                                Teléfono: <b>{this.state.phone}</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-12'>
                        <BasicWindow title='Tarjetas asociadas'>
                            <Card id={this.id} userData={this.onUserData} />
                        </BasicWindow>
                    </div>
                    <div className='col-12'>
                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-primary">Compras</h6>
                            </div>
                            <div className="card-body">
                                <Shopping id={this.id} />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default withRouter(ClientDetail);