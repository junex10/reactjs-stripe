import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Typography } from '@mui/material';

import * as yup from 'yup';
import { Form, Formik } from 'formik';

import { authUser } from './../../services/services.module';

import SweetAlert from 'react-bootstrap-sweetalert';

class LoginAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authError: false,
            authSuccess: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.initialValues = {
            email: '',
            password: ''
        }
        this.validationSchema = yup.object({
            email: yup.string()
                .required('Campo obligatorio')
                .email('Correo electrónico no válido'),
            password: yup.string()
                .required('Campo obligatorio')
        });
    }

    handleSubmit(form) {
        authUser(form.email, form.password)
            .then(value => {
                this.setState({ authSuccess: true });
                window.sessionStorage.setItem('userSession', JSON.stringify(value.data));
            })
            .catch(err => this.setState({ authError: true }))
    }
    onConfirmAuth = () => {
        this.setState({ authSuccess: false });
        setTimeout(() => document.location.href = '/dashboard/user/profile', 1000)
    }
    render() {
        return (
            <>
                <SweetAlert
                    show={this.state.authError}
                    title={<Typography component={'div'} className="headingModal mt-2 mb-4" variant={'h5'}>Error de autenticación</Typography>}
                    showCloseButton
                    closeBtnStyle={{ boxShadow: 'none' }}
                    showConfirm={true}
                    confirmBtnText='Entendido'
                    confirmBtnCssClass='btn btn-danger btn-block'
                    confirmBtnStyle={{ border: 'none' }}
                    onConfirm={() => this.setState({ authError: false })}
                    error
                >
                    <div className="bodyModal">
                        <h6>El usuario por el cual trata de ingresar no existe</h6>
                    </div>
                </SweetAlert>
                <SweetAlert
                    show={this.state.authSuccess}
                    title={<Typography component={'div'} className="headingModal mt-2 mb-4" variant={'h5'}>Autenticado!</Typography>}
                    showCloseButton
                    closeBtnStyle={{ boxShadow: 'none' }}
                    showConfirm={true}
                    confirmBtnText='Entendido'
                    confirmBtnCssClass='btn btn-success btn-block'
                    confirmBtnStyle={{ border: 'none' }}
                    onConfirm={this.onConfirmAuth}
                    success
                >
                    <div className="bodyModal">
                        <h6>Sesión iniciada</h6>
                    </div>
                </SweetAlert>
                <div className="container backgroundLogin">
                    <div className="row justify-content-center">
                        <div className="col-xl-10 col-lg-12 col-md-9">
                            <div className="card o-hidden border-0 shadow-lg my-5">
                                <div className="card-body p-0">
                                    <div className="row">
                                        <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                        <div className="col-lg-6">
                                            <div className="p-5">
                                                <div className="text-center">
                                                    <h1 className="h4 text-gray-900 mb-4">
                                                        Iniciar sesión
                                                    </h1>
                                                </div>
                                                <Formik initialValues={this.initialValues} validationSchema={this.validationSchema} onSubmit={this.handleSubmit}>
                                                    {
                                                        formik => {
                                                            const { errors, touched, handleChange } = formik;
                                                            return (
                                                                <Form>
                                                                    <div className="form-group">
                                                                        <input type="email" onChange={handleChange} className="form-control form-control-user"
                                                                            id="email" aria-describedby="emailHelp"
                                                                            placeholder="Correo electrónico" />
                                                                        {
                                                                            errors.email && touched.email &&
                                                                            <div className='ml-2 mt-4 error'>
                                                                                <p style={{ color: 'red', fontSize: '14px' }}>{errors.email}</p>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                    <br />
                                                                    <div className="form-group">
                                                                        <input type="password" onChange={handleChange} className="form-control form-control-user"
                                                                            id="password" placeholder="Contraseña" />
                                                                        {
                                                                            errors.password && touched.password &&
                                                                            <div className='ml-2 mt-4 error'>
                                                                                <p style={{ color: 'red', fontSize: '14px' }}>{errors.password}</p>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                    <button className="btn btn-success btn-user btn-block" disabled={!formik.isValid}>
                                                                        Iniciar sesión
                                                                    </button>
                                                                </Form>
                                                            );
                                                        }
                                                    }
                                                </Formik>
                                                {/*<div className="text-center">
                                                    <a className="small" href="forgot-password.html">Olvidaste la contraseña?</a>
                                                </div>*/}
                                                <div className="text-center">
                                                    <Link to='/login/signup'><p className="small" style={{ color: 'var(--azul)' }}>Crear una cuenta!</p></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </>
        );
    }
}
export default withRouter(LoginAccount);