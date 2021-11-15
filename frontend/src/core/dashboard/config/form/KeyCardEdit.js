import React, { Component } from 'react';
import * as yup from 'yup';
import { Form, Formik } from 'formik';
import moment from 'moment';

import { Typography } from '@mui/material';
import SweetAlert from 'react-bootstrap-sweetalert';

import { modifyCreditCard } from './../../../services/services.module'

class KeyCardEdit extends Component {
    constructor(props) {
        super(props);
        this.creditNumber = this.props.creditNumber;
        this.cvc = this.props.cvc;
        this.expirationDate = this.props.expirationDate;
        this.email = props.email;
        this.state = {
            connectionError: false,
            creditCardSuccess: false
        }
        this.keycard = props.keycard;

        this.initialValues = {
            keycard: this.creditNumber,
            expirationDate: this.expirationDate,
            cvc: this.cvc
        };
        this.validationSchema = yup.object({
            keycard: yup.string()
                .required('Campo obligatorio')
                .max(20, 'Máximo 20 dígitos'),
            expirationDate: yup.date()
                .required('Campo obligatorio'),
            cvc: yup.string()
                .required('Campo obligatorio')
                .max(3, 'Máximo 3 dígitos')
                .min(3, 'Mínimo 3 dígitos')
        });
    }
    handleSubmit = form => {
        console.log(form);
        form.expirationDate = moment(form.expirationDate, 'DD-MM-YYYY').format('DD/MM/YYYY');
        modifyCreditCard(this.email, this.creditNumber, form.keycard, form.cvc, form.expirationDate)
        .then(() => {
            this.setState({ creditCardSuccess: true });
        })
        .catch(() => this.setState({ connectionError: true }))
    }
    onConfirm = () => {
        this.setState({creditCardSuccess : false });
        document.location.href = document.location;
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
                    show={this.state.creditCardSuccess}
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
                        <h6>Tarjeta de credito actualizada!</h6>
                    </div>
                </SweetAlert>
                <Formik initialValues={this.initialValues} validationSchema={this.validationSchema} onSubmit={this.handleSubmit}>
                    {
                        formik => {
                            const { errors, handleChange, touched, values } = formik;
                            return (
                                <Form>
                                    <div className='row'>
                                        <div className='col-12 col-lg-4 col-md-4 col-sm-12'>
                                            <div className='form-group'>
                                                <input id='cvc' maxLength={3} onChange={handleChange} value={values.cvc} type='text' className='form-control form-control-user' placeholder='cvc...' />
                                            </div>
                                        </div>
                                        <div className='col-12 col-lg-8 col-md-8 col-sm-12'>
                                            <div className='form-group'>
                                                <input id='keycard' maxLength={20} onChange={handleChange} value={values.keycard} type='text' className='form-control form-control-user' />
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className='form-group'>
                                                <input id='expirationDate' onChange={handleChange} value={values.expirationDate} type='date' className='form-control form-control-user' />
                                            </div>
                                        </div>
                                        {
                                                (errors.cvc && touched.cvc) ||
                                                (errors.keycard && touched.keycard) ||
                                                (errors.expirationDate && touched.expirationDate)
                                                ?
                                                <div className='col-12 alert alert-danger text-left'>
                                                    <ul>
                                                        {
                                                            errors.cvc && touched.cvc ? 
                                                            <li style={{listStyle: 'none'}}>
                                                                <b>CVC:</b> {errors.cvc}
                                                            </li> : ''
                                                        }
                                                        {
                                                            errors.keycard && touched.keycard ? 
                                                            <li style={{listStyle: 'none'}}>
                                                                <b>Tarjeta:</b> {errors.keycard}
                                                            </li> : ''
                                                        }
                                                        {
                                                            errors.expirationDate && touched.expirationDate ?
                                                            <li style={{listStyle: 'none'}}>
                                                                <b>Fecha:</b> {errors.expirationDate}
                                                            </li> : ''
                                                        }
                                                    </ul>
                                                </div> : ''
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
export default KeyCardEdit;