import React, { Component } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

class NumberPhone extends Component {
    constructor(props) {
        super(props);

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
        console.log(form)
    }
    render() {
        return (
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
        );
    }
}

export default NumberPhone;