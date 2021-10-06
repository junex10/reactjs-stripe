import React, { Component } from 'react';
import { withRouter } from 'react-router';

import ProfileReport from './ProfileReport';
import BasicWindow from './../../shared/window/BasicWindows';

import FormSweetAlert from '../../../commons/FormSweetAlert';

import NumberPhone from './form/NumberPhone';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editNumber: false
        }
    }

    openModal = type => {
        if (type === 'telefono') {
            this.setState({ editNumber: true });
            console.log(this.state.editNumber)
        }
    }

    render() {
        return (
            <div className="container-fluid">

                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Perfil</h1>
                    {/*<a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                        className="fas fa-download fa-sm text-white-50"></i> Generate Report</a>*/}
                </div>

                <ProfileReport />
                <FormSweetAlert
                    title='Test'
                    form={<NumberPhone />}
                    button='Enviar'
                    cancelButton="Cancelar"
                />
                
                <div className="row">
                    <div className="col-12">
                        <BasicWindow title='Personal' body={
                            <div className='row'>
                                <div className='col-12 mb-4'>
                                    <div className='row'>
                                        <div class='col-12 col-sm-12 col-lg-3 col-md-3'>
                                            Teléfono
                                        </div>
                                        <div class='col-12 col-sm-12 col-lg-7 col-md-7'>
                                            No configurado(a)
                                        </div>
                                        <div style={{ cursor: 'pointer' }} onClick={() => this.setState({ editNumber: true })} class='col-12 col-sm-12 col-lg-2 col-md-2'>
                                            Agregar número
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12 mb-4'>
                                    <div className='row'>
                                        <div className='col-12 col-sm-12 col-lg-3 col-md-3'>
                                            Nombre(s)
                                        </div>
                                        <div className='col-12 col-sm-12 col-lg-7 col-md-7'>
                                            No configurado(a)
                                        </div>
                                        <div style={{ cursor: 'pointer' }} onClick={() => this.openModal('nombre')} className='col-12 col-sm-12 col-lg-2 col-md-2'>
                                            Agregar nombre
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12 mb-4'>
                                    <div className='row'>
                                        <div className='col-12 col-sm-12 col-lg-3 col-md-3'>
                                            Apellido(s)
                                        </div>
                                        <div className='col-12 col-sm-12 col-lg-7 col-md-7'>
                                            No configurado(a)
                                        </div>
                                        <div style={{ cursor: 'pointer' }} onClick={() => this.openModal('apellido')} className='col-12 col-sm-12 col-lg-2 col-md-2'>
                                            Agregar apellido
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
                                        <div style={{ cursor: 'pointer' }} onClick={() => this.openModal('correo')} className='col-12 col-sm-12 col-lg-2 col-md-2'>
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
                                        <div style={{ cursor: 'pointer' }} onClick={() => this.openModal('clave')} className='col-12 col-sm-12 col-lg-2 col-md-2'>
                                            Editar
                                        </div>
                                    </div>
                                </div>
                            </div>
                        } />
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(Profile);