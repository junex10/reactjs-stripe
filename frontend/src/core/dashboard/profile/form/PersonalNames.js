import React, { Component } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

class PersonalNames extends Component {
    constructor(props) {
        super(props);

        this.initialValues = {
            name: '',
            lastname: ''
        }

        this.validationSchema = Yup.object({
            name: Yup.string().required('El campo nombre es obligatorio').matches(/^(?:(?!\.).)*$\r?\n?/, 'Nombre no valido').strict(true),
            lastname: Yup.string().required('El campo apellido es obligatorio').matches(/^(?:(?!\.).)*$\r?\n?/, 'Apellido no valido').strict(true)
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
                            const { errors, touched, handleChange } = formik;
                            return (
                                <Form>
                                    <div className='row'>
                                        <div className='col-12 col-sm-12 col-md-6 col-lg-6'>
                                            <div className='form-group'>
                                                <input id='name' onChange={handleChange} type='text' className='form-control' placeholder='Nombre(s)' />
                                            </div>
                                        </div>
                                        <div className='col-12 col-sm-12 col-md-6 col-lg-6'>
                                            <div className='form-group'>
                                                <input id='lastname' onChange={handleChange} type='text' className='form-control' placeholder='Apellido(s)' />
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            {
                                                (errors.name && touched.name) || (errors.lastname && touched.lastname) ?
                                                <div className='col-12 alert alert-danger text-left'>
                                                    <div className='row'>
                                                        <div className='col-12'>
                                                            {errors.name && touched.name && errors.name}
                                                        </div>
                                                        <div className='col-12'>
                                                            {errors.lastname && touched.lastname && errors.lastname}
                                                        </div>
                                                    </div>
                                                </div> : ''
                                            }
                                        </div>
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
export default PersonalNames;