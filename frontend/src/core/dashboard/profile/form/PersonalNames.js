import React, { Component } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

import SweetAlert from 'react-bootstrap-sweetalert';
import { Typography } from '@mui/material';

import { addNames } from './../../../services/services.module';

class PersonalNames extends Component {
    constructor(props) {
        super(props);

        this.state = {
            namesError: false,
            nameSuccess: false
        }

        this.name = props.name;
        this.lastname = props.lastname;
        this.email = props.email;

        this.initialValues = {
            name: '',
            lastname: ''
        }

        this.validationSchema = Yup.object({
            name: Yup.string().required('El campo nombre es obligatorio'),
            lastname: Yup.string().required('El campo apellido es obligatorio')
        });
    }
    handleSubmit = form => {
        console.log(form)
        addNames(this.email, form.name, form.lastname)
        .then(() => {
            this.setState({ nameSuccess: true });
        })
        .catch(() => this.setState({ namesError: true }))
    }
    onConfirm = () => {
        this.setState({ nameSuccess : false });
        const { show } = this.props;
        show(false);
    }
    render() {
        return (
            <>
                <SweetAlert
                    show={this.state.namesError}
                    title={<Typography component={'div'} className="headingModal mt-2 mb-4" variant={'h5'}>Error de conexión</Typography>}
                    showCloseButton
                    closeBtnStyle={{ boxShadow: 'none' }}
                    showConfirm={true}
                    confirmBtnText='Entendido'
                    confirmBtnCssClass='btn btn-danger btn-block'
                    confirmBtnStyle={{ border: 'none' }}
                    onConfirm={() => this.setState({ namesError: false })}
                    error
                >
                    <div className="bodyModal">
                        <h6>Ocurrió un error inesperado con la conexión</h6>
                    </div>
                </SweetAlert>
                <SweetAlert
                    show={this.state.nameSuccess}
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
                        <h6>Nombre(s) y/o Apellido(s) registrado</h6>
                    </div>
                </SweetAlert>
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