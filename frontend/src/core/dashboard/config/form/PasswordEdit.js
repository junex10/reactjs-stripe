import React, { Component } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

class PasswordEdit extends Component {
    constructor(props){
        super(props);

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
        console.log(form)
    }
    render(){
        return(
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
        );
    }
}
export default PasswordEdit;