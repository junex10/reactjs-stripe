import React, { Component } from 'react';
import { withRouter } from 'react-router';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Typography } from '@mui/material';

import ProfileReport from './ProfileReport';
import BasicWindow from './../../shared/window/BasicWindows';

import {
    NumberPhone,
    PersonalNames,
    EmailEdit,
    PasswordEdit
} from './form/forms.module';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editNumber: false,
            personalName: false,
            emailEdit: false,
            passwordEdit: false
        }
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

                <div className="container-fluid">

                    <div className="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 className="h3 mb-0 text-gray-800">Perfil</h1>
                        {/*<a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                        className="fas fa-download fa-sm text-white-50"></i> Generate Report</a>*/}
                    </div>

                    <ProfileReport />

                    <div className="row">
                        <div className="col-12">
                            <BasicWindow title='Personal' body={
                                <div className='row'>
                                    <div className='col-12 mb-4'>
                                        <div className='row'>
                                            <div className='col-12 col-sm-12 col-lg-3 col-md-3'>
                                                Teléfono
                                            </div>
                                            <div className='col-12 col-sm-12 col-lg-7 col-md-7'>
                                                No configurado(a)
                                            </div>
                                            <div style={{ cursor: 'pointer' }} onClick={() => this.setState({ editNumber: true })} className='col-12 col-sm-12 col-lg-2 col-md-2'>
                                                Agregar número
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12 mb-4'>
                                        <div className='row'>
                                            <div className='col-12 col-sm-12 col-lg-3 col-md-3'>
                                                Nombre(s) y Apellido(s)
                                            </div>
                                            <div className='col-12 col-sm-12 col-lg-7 col-md-7'>
                                                No configurado(a)
                                            </div>
                                            <div style={{ cursor: 'pointer' }} onClick={() => this.setState({ personalName: true })} className='col-12 col-sm-12 col-lg-2 col-md-2'>
                                                Agregar nombre y apellido
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            } />
                        </div>
                        <div className='col-12'>
                            <BasicWindow title='Ingreso' body={
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
                                            <div style={{ cursor: 'pointer' }} onClick={() => this.setState({ passwordEdit: true})} className='col-12 col-sm-12 col-lg-2 col-md-2'>
                                                Editar
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            } />
                        </div>
                    </div>
                </div>
            </>

        );
    }
}
export default withRouter(Profile);