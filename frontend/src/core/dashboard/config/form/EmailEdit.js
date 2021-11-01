import React, { Component } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

import SweetAlert from 'react-bootstrap-sweetalert';
import { Typography } from '@mui/material';

import { modifyEmail } from '../../../services/services.module';

class EmailEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            connectionError: false,
            emailSuccess: false
        }
        this.email = props.email;
        this.initialValues = {
            email: ''
        };
        this.validationSchema = Yup.object({
            email: Yup.string()
                .required('Campo obligatorio')
                .email('El email no tiene un formato válido')
        });
    }
    handleSubmit = form => {
        modifyEmail(this.email, form.email)
        .then(() => {
            this.setState({ emailSuccess: true });
        })
        .catch(() => this.setState({ connectionError: true }))
    }
    onConfirm = () => {
        this.setState({emailSuccess : false });
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
                    show={this.state.emailSuccess}
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
                        <h6>Email actualizado!</h6>
                    </div>
                </SweetAlert>
                <Formik initialValues={this.initialValues} validationSchema={this.validationSchema} onSubmit={this.handleSubmit}>
                    {
                        formik => {
                            const { errors, handleChange, touched } = formik;
                            return (
                                <Form>
                                    <div className='row'>
                                        <div className='col-12'>
                                            <div className='form-group'>
                                                <input id='email' onChange={handleChange} type='email' className='form-control form-control-user' placeholder='Correo...' />
                                            </div>
                                        </div>
                                        {
                                            errors.email && touched.email ?
                                                <div className='col-12 alert alert-danger text-left'>{errors.email}</div> : ''
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

export default EmailEdit;