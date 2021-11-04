import React, { Component } from 'react';
import { withRouter } from 'react-router';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Typography } from '@mui/material';

import ProfileReport from './ProfileReport';
import { BasicWindow, SectionTitleWindow } from './../../shared/shared.module';
import {
    NumberPhone,
    PersonalNames
} from '../forms.module';
import { authSection, auth } from './../../auth/AuthUser.auth';
import { userSession } from './../../../commons/config';
import { getUser, setUser } from './../../services/services.module';

class Profile extends Component {
    constructor(props) {
        super(props);
        const actions = auth.permits.keys.find(val => val.name === 'all' || val.name === 'profile');
        this.email = userSession.user;
        getUser(this.email)
        .then(val => setUser(val.data))

        this.state = {
            editNumber: false,
            personalName: false,
            actions: {
                numberPhone: (actions.control.find(val => val === 'phone' || val === 'all') ? true : false),
                names: (actions.control.find(val => val === 'names' || val === 'all') ? true : false)
            }
        }
        this.name = '';
        this.lastname = '';
        if (auth.person !== undefined) {
            this.name = auth.person.name;
            this.lastname = auth.person.lastname;
        }
        this.phone = auth.person !== undefined ? `${auth.person.areaCode} ${auth.person.phone}` : undefined;
        this.names = auth.person !== undefined ? `${auth.person.name} ${auth.person.lastname}` : undefined;

        this.messageStatePhone = this.phone === undefined ? 'Registrada!' : 'Actualizada!'
        this.messageStateNames = this.names === undefined ? 'Registrada!' : 'Actualizada!'
        if (!authSection('profile')) this.props.history.push('/login')
    }

    onShow = event => this.setState({ editNumber: event });
    onPersonalNames = event => this.setState({ personalName: event });

    render() {
        return (
            <>
                <SweetAlert
                    show={this.state.editNumber}
                    title={<Typography component={'div'} className="headingModal mt-2 mb-4" variant={'h5'}>Teléfono</Typography>}
                    showCloseButton
                    closeBtnStyle={{ boxShadow: 'none' }}
                    showConfirm={false}
                    onConfirm={() => this.setState({ editNumber: false })}
                    onCancel={() => this.setState({ editNumber: false })}
                >
                    <div className="bodyModal">
                        <NumberPhone email={this.email} way={this.messageStatePhone} show={this.onShow} />
                    </div>
                </SweetAlert>

                <SweetAlert
                    show={this.state.personalName}
                    title={<Typography component={'div'} className="headingModal mt-2 mb-4" variant={'h5'}>Nombre(s) y Apellido(s)</Typography>}
                    showCloseButton
                    closeBtnStyle={{ boxShadow: 'none' }}
                    showConfirm={false}
                    onConfirm={() => this.setState({ personalName: false })}
                    onCancel={() => this.setState({ personalName: false })}
                >
                    <div className="bodyModal">
                        <PersonalNames email={this.email} way={this.messageStateNames} name={this.name} lastname={this.lastname} show={this.onPersonalNames} />
                    </div>
                </SweetAlert>

                <div className="container-fluid">

                    <SectionTitleWindow title='Perfil' />

                    <ProfileReport email={this.email} />

                    <div className="row">
                        <div className="col-12">
                            <BasicWindow title='Personal'>
                                <div className='row'>
                                    {
                                        this.state.actions.numberPhone ?
                                            <div className='col-12 mb-4'>
                                                <div className='row'>
                                                    <div className='col-12 col-sm-12 col-lg-3 col-md-3'>
                                                        Teléfono
                                                    </div>
                                                    <div className='col-12 col-sm-12 col-lg-7 col-md-7'>
                                                        {
                                                            this.phone === undefined ?
                                                            'No configurado(a)' : this.phone
                                                        }
                                                    </div>
                                                    <div style={{ cursor: 'pointer' }} onClick={() => this.setState({ editNumber: true })} className='col-12 col-sm-12 col-lg-2 col-md-2'>
                                                        { this.phone === undefined ? 'Agregar' : 'Editar' } número
                                                    </div>
                                                </div>
                                            </div>
                                            : ''
                                    }
                                    {
                                        this.state.actions.names ?
                                            <div className='col-12 mb-4'>
                                                <div className='row'>
                                                    <div className='col-12 col-sm-12 col-lg-3 col-md-3'>
                                                        Nombre(s) y Apellido(s)
                                                    </div>
                                                    <div className='col-12 col-sm-12 col-lg-7 col-md-7'>
                                                        {
                                                            this.names === undefined ?
                                                            'No configurado(a)' : this.names
                                                        }
                                                    </div>
                                                    <div style={{ cursor: 'pointer' }} onClick={() => this.setState({ personalName: true })} className='col-12 col-sm-12 col-lg-2 col-md-2'>
                                                        { this.names === undefined ? 'Agregar' : 'Editar' } nombre y apellido
                                                    </div>
                                                </div>
                                            </div>
                                        : ''
                                    }

                                </div>
                            </BasicWindow>
                        </div>
                    </div>
                </div>
            </>

        );
    }
}
export default withRouter(Profile);