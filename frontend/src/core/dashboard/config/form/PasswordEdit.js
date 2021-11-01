import React, { Component } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

import SweetAlert from 'react-bootstrap-sweetalert';
import { Typography } from '@mui/material';

import { modifyPassword } from '../../../services/services.module';

class PasswordEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            connectionError: false,
            passwordSuccess: false
        }
        this.email = props.email;
        this.initialValues = {
            password: ''
        };
        this.validationSchema = Yup.object({
            password: Yup.string()
                .required('Campo obligatorio')
                .min(4, 'Se requiere mínimo 8 caracteres')
                .matches(/^\S+$/, 'No se admite espacios en blanco')
                .matches(/\.*[A-Z]/, 'Debe contener al menos una mayúscula')
                .matches(/\.*[0-9]/, 'Debe contener al menos un número')
                .max(10, 'Máximo 10 caracteres')
        })
    }
    handleSubmit = form => {
        modifyPassword(this.email, form.password)
        .then(() => {
            this.setState({ passwordSuccess: true });
        })
        .catch(() => this.setState({ connectionError: true }))
    }
    onConfirm = () => {
        this.setState({passwordSuccess : false });
        const { show } = this.props;
        show(false);
    }
    render() {
        return (
            <>
                <SweetAlert
                    show={this.state.connectionError}
                    title={<Typography component={'div'} className="headingModal mt-2 mb-4" variant={'h5'}>Error de conexión</Typography>}
                    showCloseButton
                    closeBtnStyle={{ boxShadow: 'none' }}
                    showConfirm={true}
                    confirmBtnText='Entendido'
                    confirmBtnCssClass='btn btn-danger btn-block'
                    confirmBtnStyle={{ border: 'none' }}
                    onConfirm={() => this.setState({ connectionError: false })}
                    error
                >
                    <div className="bodyModal">
                        <h6>Ocurrió un error inesperado con la conexión</h6>
                    </div>
                </SweetAlert>
                <SweetAlert
                    show={this.state.passwordSuccess}
                    title={<Typography component={'div'} className="headingModal mt-2 mb-4" variant={'h5'}>Actualizado!</Typography>}
                    showCloseButton
                    closeBtnStyle={{ boxShadow: 'none' }}
                    showConfirm={true}
                    confirmBtnText='Entendido'
                    confirmBtnCssClass='btn btn-success btn-block'
                    confirmBtnStyle={{ border: 'none' }}
                    onConfirm={this.onConfirm}
                    success
                >
                    <div className="bodyModal">
                        <h6>Contraseña cambiada!</h6>
                    </div>
                </SweetAlert>
                <Formik initialValues={this.initialValues} validationSchema={this.validationSchema} onSubmit={this.handleSubmit}>
                    {
                        formik => {
                            const { errors, touched, handleChange } = formik;
                            return (
                                <Form>
                                    <div className='row'>
                                        <div className='col-12'>
                                            <div className='form-group'>
                                                <input id='password' onChange={handleChange} type='password' className='form-control form-control-user' placeholder='...' />
                                            </div>
                                        </div>
                                        {
                                            errors.password && touched.password && errors.password ?
                                                <div className='col-12 alert alert-danger text-left'>{errors.password}</div> : ''
                                        }
                                    </div>
                                    <button type='submit' disabled={!formik.isValid} className='btn btn-success btn-block'>Enviar</button>
                                </Form>
                            );
                        }
                    }
                </Formik>
            </>
        );
    }
}
export default PasswordEdit;