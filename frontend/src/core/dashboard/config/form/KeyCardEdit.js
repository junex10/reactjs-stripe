import React, { Component } from 'react';
import * as yup from 'yup';
import { Form, Formik } from 'formik';

class KeyCardEdit extends Component {
    constructor(props) {
        super(props);
        this.creditNumber = this.props.creditNumber;
        this.cvc = this.props.cvc;
        this.state = {
            cvcNumber: '',
            keyCardNumber: ''
        }
        this.keycard = props.keycard;

        this.initialValues = {
            keycard: this.creditNumber,
            expirationDate: '',
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
        console.log(form)
    }
    render() {
        return (
            <>
                <Formik initialValues={this.initialValues} validationSchema={this.validationSchema} onSubmit={this.handleSubmit}>
                    {
                        formik => {
                            const { errors, handleChange, touched } = formik;
                            return (
                                <Form>
                                    <div className='row'>
                                        <div className='col-12 col-lg-4 col-md-4 col-sm-12'>
                                            <div className='form-group'>
                                                <input id='cvc' maxLength={3} onChange={handleChange} value={this.cvc} type='text' className='form-control form-control-user' placeholder='cvc...' />
                                            </div>
                                        </div>
                                        <div className='col-12 col-lg-8 col-md-8 col-sm-12'>
                                            <div className='form-group'>
                                                <input id='keycard' maxLength={20} onChange={handleChange} value={this.creditNumber} type='text' className='form-control form-control-user' />
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className='form-group'>
                                                <input id='expirationDate' onChange={handleChange} type='date' className='form-control form-control-user' />
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