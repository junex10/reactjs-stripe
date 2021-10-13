import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Typography } from '@mui/material';

import {
    EmailEdit,
    PasswordEdit
} from './../forms.module'

class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {
            emailEdit: false,
            passwordEdit: false
        }
    }
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
                        <EmailEdit />
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
                        <PasswordEdit />
                    </div>
                </SweetAlert>
                <div className='row'>
                    <div className='col-12 mb-4'>
                        <div className='row'>
                            <div className='col-12 col-sm-12 col-lg-3 col-md-3'>
                                Correo electrónico para inicio de sesión
                            </div>
                            <div className='col-12 col-sm-12 col-lg-7 col-md-7'>
                                joaealejunior@gmail.com
                            </div>
                            <div style={{ cursor: 'pointer' }} onClick={() => this.setState({ emailEdit: true })} className='col-12 col-sm-12 col-lg-2 col-md-2'>
                                Editar
                            </div>
                        </div>
                    </div>
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
                </div>
            </>
        )
    }
}

export default Account;