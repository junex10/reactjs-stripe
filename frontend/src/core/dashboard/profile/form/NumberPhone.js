import React, { Component } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

import { addNumber } from './../../../services/services.module';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Typography } from '@mui/material';

class NumberPhone extends Component {
    constructor(props) {
        super(props);

        this.state = {
            numberError: false,
            numberSuccess: false
        }
        this.email = props.email;
        this.wayState = props.way;
        this.initialValues = {
            nationalCode: '+58',
            numberPhone: ''
        };
        this.validationSchema = Yup.object({
            nationalCode: Yup.string()
                .required('Se requiere de un código de área')
                .max(5)
                .strict(true),
            numberPhone: Yup.string()
                .required('Se requiere de un numero')
                .strict(true)
                .min(8, 'Requerido 8 caracteres')
        });
    }
    handleSubmit = form => {
        addNumber(this.email, form.nationalCode, form.numberPhone)
            .then(() => {
                this.setState({ numberSuccess: true });
            })
            .catch(() => this.setState({ numberError: true }))
    }
    onConfirm = () => {
        this.setState({numberSuccess : false });
        const { show } = this.props;
        show(false);
    }
    render() {
        return (
            <>
                <SweetAlert
                    show={this.state.numberError}
                    title={<Typography component={'div'} className="headingModal mt-2 mb-4" variant={'h5'}>Error de conexión</Typography>}
                    showCloseButton
                    closeBtnStyle={{ boxShadow: 'none' }}
                    showConfirm={true}
                    confirmBtnText='Entendido'
                    confirmBtnCssClass='btn btn-danger btn-block'
                    confirmBtnStyle={{ border: 'none' }}
                    onConfirm={() => this.setState({ numberError: false }) }
                    error
                >
                    <div className="bodyModal">
                        <h6>Ocurrió un error inesperado con la conexión</h6>
                    </div>
                </SweetAlert>
                <SweetAlert
                    show={this.state.numberSuccess}
                    title={<Typography component={'div'} className="headingModal mt-2 mb-4" variant={'h5'}>{this.wayState}</Typography>}
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
                        <h6>Numero registrado</h6>
                    </div>
                </SweetAlert>
                <Formik initialValues={this.initialValues} validationSchema={this.validationSchema} onSubmit={this.handleSubmit}>
                    {
                        formik => {
                            const { errors, touched, handleChange } = formik;
                            return (
                                <Form>
                                    <div className='row'>
                                        <div className='col-2'>
                                            <div className='form-group'>
                                                <select id='nationalCode' onChange={handleChange} className='form-control form-control-user'>
                                                    <option value='ve'>+58</option>
                                                </select>
                                                {
                                                    errors.nationalCode && touched.nationalCode && errors.nationalCode ?
                                                        <div className='col-12 alert alert-danger text-left'>{errors.numberPhone}</div> : ''
                                                }
                                            </div>
                                        </div>
                                        <div className='col-10'>
                                            <div className='form-group'>
                                                <input id='numberPhone' onChange={handleChange} type='text' className='form-control form-control-user' placeholder='Número de teléfono' />
                                            </div>
                                        </div>
                                        {
                                            errors.numberPhone && touched.numberPhone && errors.numberPhone ?
                                                <div className='col-12 alert alert-danger text-left'>{errors.numberPhone}</div> : ''
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

export default NumberPhone;