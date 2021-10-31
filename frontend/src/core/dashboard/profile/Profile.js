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

class Profile extends Component {
    constructor(props) {
        super(props);
        const actions = auth.permits.keys[0];

        this.state = {
            editNumber: false,
            personalName: false,
            actions: {
                numberPhone: (actions.control.find(val => val === 'phone') ? true : false),
                names: (actions.control.find(val => val === 'names') ? true : false)
            }
        }
        this.phone = `${auth.person.areaCode} ${auth.person.phone}`;
        this.names = `${auth.person.name} ${auth.person.lastname}`;
        if (!authSection('profile')) this.props.history.push('/login')
    }

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
                        <NumberPhone />
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
                        <PersonalNames />
                    </div>
                </SweetAlert>

                <div className="container-fluid">

                    <SectionTitleWindow title='Perfil' />

                    <ProfileReport />

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
                                                        Agregar número
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
                                                        Agregar nombre y apellido
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