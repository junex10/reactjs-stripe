import React, { Component } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

class EmailEdit extends Component {
    constructor(props) {
        super(props);

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