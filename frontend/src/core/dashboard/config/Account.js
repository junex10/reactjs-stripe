import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Typography } from '@mui/material';
import { withRouter } from 'react-router';

import {
    EmailEdit,
    PasswordEdit
} from './../forms.module';

import { authSection, auth } from './../../auth/AuthUser.auth';
import { userSession } from './../../../commons/config';

class Account extends Component {
    constructor(props) {
        super(props);
        const actions = auth.permits.keys.find(val => val.name === 'all' || val.name === 'account');
        this.email = userSession.user;

        this.state = {
            emailEdit: false,
            passwordEdit: false,
            actions: {
                email: (actions.control.find(val => val === 'accountEmail' || val === 'all') ? true : false),
                password: (actions.control.find(val => val === 'accountPassword' || val === 'all') ? true : false)
            }
        }
        this.email = auth.email;
        if (!authSection('account')) this.props.history.push('/dashboard/user/profile')
    }
    onShowEmail = event => this.setState({ emailEdit: event });
    onShowPassword = event => this.setState({ passwordEdit: event });
    render() {
        return (
            <>
                <SweetAlert
                    show={this.state.emailEdit}
                    title={<Typography component={'div'} className="headingModal mt-2 mb-4" variant={'h5'}>Correo electrónico</Typography>}
                    showCloseButton
                    closeBtnStyle={{ boxShadow: 'none' }}
                    showConfirm={false}
                    onConfirm={() => this.setState({ emailEdit: false })}
                    onCancel={() => this.setState({ emailEdit: false })}
                >
                    <div className="bodyModal">
                        <EmailEdit email={this.email} show={this.onShowEmail} />
                    </div>
                </SweetAlert>

                <SweetAlert
                    show={this.state.passwordEdit}
                    title={<Typography component={'div'} className="headingModal mt-2 mb-4" variant={'h5'}>Contraseña</Typography>}
                    showCloseButton
                    closeBtnStyle={{ boxShadow: 'none' }}
                    showConfirm={false}
                    onConfirm={() => this.setState({ passwordEdit: false })}
                    onCancel={() => this.setState({ passwordEdit: false })}
                >
                    <div className="bodyModal">
                        <PasswordEdit email={this.email} show={this.onShowPassword} />
                    </div>
                </SweetAlert>
                <div className='row'>
                    {
                        this.state.actions.email ?
                            <div className='col-12 mb-4'>
                                <div className='row'>
                                    <div className='col-12 col-sm-12 col-lg-3 col-md-3'>
                                        Correo electrónico para inicio de sesión
                                    </div>
                                    <div className='col-12 col-sm-12 col-lg-7 col-md-7'>
                                        {this.email}
                                    </div>
                                    <div style={{ cursor: 'pointer' }} onClick={() => this.setState({ emailEdit: true })} className='col-12 col-sm-12 col-lg-2 col-md-2'>
                                        Editar
                                    </div>
                                </div>
                            </div>
                            : ''
                    }
                    {
                        this.state.actions.password ?
                            <div className='col-12 mb-4'>
                                <div className='row'>
                                    <div className='col-12 col-sm-12 col-lg-3 col-md-3'>
                                        Contraseña de inicio de sesión
                                    </div>
                                    <div className='col-12 col-sm-12 col-lg-7 col-md-7'>
                                        *********
                                    </div>
                                    <div style={{ cursor: 'pointer' }} onClick={() => this.setState({ passwordEdit: true })} className='col-12 col-sm-12 col-lg-2 col-md-2'>
                                        Editar
                                    </div>
                                </div>
                            </div>
                        : ''
                    }
                </div>
            </>
        )
    }
}

export default withRouter(Account);