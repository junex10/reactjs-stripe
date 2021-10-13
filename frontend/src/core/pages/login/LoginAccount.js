import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as yup from 'yup';
import { Form, Formik } from 'formik';

class LoginAccount extends Component {
    constructor(props) {
        super(props);
        this.initialValues = {
            email: '',
            password: '',
            remember: false
        }
        this.validationSchema = yup.object({
            email: yup.string()
                .required('Campo obligatorio')
                .email('Correo electrónico no válido'),
            password: yup.string()
                .required('Campo obligatorio'),
            remember: yup.bool()
        });

    }

    handleSubmit(form) {
        console.log(form)
    }
    render() {
        return (
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
                                                                <div className="form-group">
                                                                    <div className="custom-control custom-checkbox small">
                                                                        <input onClick={handleChange} type="checkbox" className="custom-control-input" id="remember" />
                                                                        <label className="custom-control-label" htmlFor="remember">Recuerdame</label>
                                                                    </div>
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
        );
    }
}
export default LoginAccount;