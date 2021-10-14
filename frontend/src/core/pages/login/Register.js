import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as yup from 'yup';
import { Form, Formik } from 'formik';

class Register extends Component {
    constructor(props) {
        super(props);

        this.initialValues = {
            email: '',
            password: '',
            repeat_password: '',
            remember: false
        }
        this.validationSchema = yup.object({
            email: yup.string()
                .required('Campo obligatorio')
                .email('Correo electrónico no válido'),
            password: yup.string()
                .required('Campo obligatorio')
                .min(4, 'Se requiere mínimo 8 caracteres')
                .matches(/^\S+$/, 'No se admite espacios en blanco')
                .matches(/\.*[A-Z]/, 'Debe contener al menos una mayúscula')
                .matches(/\.*[0-9]/, 'Debe contener al menos un número')
                .max(10, 'Máximo 10 caracteres'),
            repeat_password: yup.string()
                .required('Campo obligatorio')
                .oneOf([yup.ref('password'), null], "Contraseña debe ser igual"),
            remember: yup.bool()
        });
    }

    handleSubmit(form) {
        console.log(form);
        window.location.href = '/dashboard/user/profile';
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
                                                    Registrarse
                                                </h1>
                                            </div>
                                            <Formik initialValues={this.initialValues} validationSchema={this.validationSchema} onSubmit={this.handleSubmit}>
                                                {
                                                    formik => {
                                                        const { errors, handleChange, touched } = formik;
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
                                                                <div className="form-group">
                                                                    <input type="password" className="form-control form-control-user"
                                                                        id="password" onChange={handleChange} placeholder="Contraseña" />
                                                                    {
                                                                        (errors.password && touched.password) &&
                                                                        <div className='ml-2 mt-4 error'>
                                                                            <p style={{ color: 'red', fontSize: '14px' }}>{errors.password}</p>
                                                                        </div>
                                                                    }
                                                                </div>
                                                                <div className="form-group">
                                                                    <input type="password" className="form-control form-control-user"
                                                                        id="repeat_password" onChange={handleChange} placeholder="Repetir Contraseña" />
                                                                    {
                                                                        (errors.repeat_password && touched.repeat_password) &&
                                                                        <div className='ml-2 mt-4 error'>
                                                                            <p style={{ color: 'red', fontSize: '14px' }}>{errors.repeat_password}</p>
                                                                        </div>
                                                                    }
                                                                </div>
                                                                <div className="form-group">
                                                                    <div className="custom-control custom-checkbox small">
                                                                        <input onChange={handleChange} type="checkbox" className="custom-control-input" id="remember" />
                                                                        <label className="custom-control-label" htmlFor="remember">Recuerdame</label>
                                                                    </div>
                                                                </div>
                                                                <button className="btn btn-success btn-user btn-block" disabled={!formik.isValid}>
                                                                    Crear cuenta
                                                                </button>
                                                            </Form>
                                                        );
                                                    }
                                                }
                                            </Formik>

                                            <div className="text-center">
                                                <Link to='/login'><p className="small" style={{ color: 'var(--azul)' }}>Tiene cuenta? Iniciar sesion</p></Link>
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

export default Register;