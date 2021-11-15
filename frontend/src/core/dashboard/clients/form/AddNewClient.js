import { Component } from 'react';

import * as yup from 'yup';
import { Form, Formik } from 'formik';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Typography } from '@mui/material';

import { registerUser } from './../../../services/services.module';

class AddNewClient extends Component {
    constructor(props) {
        super(props);

        this.state = {
            connectionError: false,
            connectionSuccess: false
        }

        this.initialValues = {
            email: '',
            password: '',
            repeat_password: '',
            name: '',
            lastname: '',
            nationalCode: '+58',
            numberPhone: '',
            profile: 'Usuario'
        }
        this.validationSchema = yup.object({
            email: yup.string()
                .required('Campo obligatorio')
                .email('Correo electrónico no válido'),
            password: yup.string()
                .required('Campo obligatorio')
                .min(4, 'Se requiere mínimo 8 caracteres')
                .matches(/^\S+$/, 'No se admite espacios en blanco')
                .matches(/\.*[A-Z]/, 'Debe contener al menos una mayúscula')
                .matches(/\.*[0-9]/, 'Debe contener al menos un número')
                .max(10, 'Máximo 10 caracteres'),
            repeat_password: yup.string()
                .required('Campo obligatorio')
                .oneOf([yup.ref('password'), null], "Contraseña debe ser igual"),
            name: yup.string().required('El campo nombre es obligatorio'),
            lastname: yup.string().required('El campo apellido es obligatorio'),
            nationalCode: yup.string()
                .required('Se requiere de un código de área')
                .max(5)
                .strict(true),
            numberPhone: yup.string()
                .required('Se requiere de un numero')
                .strict(true)
                .min(8, 'Requerido 8 caracteres'),
            profile: yup.string()
                .required('Campo obligatorio')
        })
    }
    handleSubmit = (form) => {
        const person = {
            name: form.name,
            lastname: form.lastname,
            phone: form.numberPhone,
            areaCode: form.nationalCode
        }
        registerUser(
            form.email,
            form.password,
            form.repeat_password,
            person,
            form.profile
        )
        .then(() => {
            this.setState({ connectionSuccess: true });
        })
        .catch(() => this.setState({ connectionError: true }))
    }
    onConfirm = () => {
        this.setState({connectionSuccess : false });
        document.location.href = document.location;
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
                    show={this.state.connectionSuccess}
                    title={<Typography component={'div'} className="headingModal mt-2 mb-4" variant={'h5'}>Registrado!</Typography>}
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
                        <h6>Cliente registrado!</h6>
                    </div>
                </SweetAlert>
                <Formik initialValues={this.initialValues} validationSchema={this.validationSchema} onSubmit={this.handleSubmit}>
                    {
                        formik => {
                            const { errors, touched, handleChange } = formik;
                            return (
                                <Form>
                                    <div className='row'>
                                        <div className='col-12 mb-2'>
                                            <h6 className='text-left'>Datos de inicio de sesión</h6>
                                        </div>
                                        <div className='col-12'>
                                            <div className='form-group'>
                                                <input id='email' type='email' onChange={handleChange} className='form-control form-control-user' placeholder='Correo electrónico' />
                                            </div>
                                        </div>
                                        <div className='col-12 col-lg-6 col-md-6 col-sm-12'>
                                            <div className='form-group'>
                                                <label className='text-left' htmlFor='password'>Contraseña</label>
                                                <input id='password' type='password' onChange={handleChange} className='form-control form-control-user' />
                                            </div>
                                        </div>
                                        <div className='col-12 col-lg-6 col-md-6 col-sm-12'>
                                            <div className='form-group'>
                                                <label className='text-left' htmlFor='repeat_password'>Repetir contraseña</label>
                                                <input id='repeat_password' type='password' onChange={handleChange} className='form-control form-control-user' />
                                            </div>
                                        </div>
                                        <div className='col-12 mb-2'>
                                            <h6 className='text-left'>Datos de persona</h6>
                                        </div>
                                        <div className='col-12 col-lg-6 col-md-6 col-sm-12'>
                                            <div className='form-group'>
                                                <input id='name' type='text' onChange={handleChange} className='form-control form-control-user' placeholder='Nombre(s)' />
                                            </div>
                                        </div>
                                        <div className='col-12 col-lg-6 col-md-6 col-sm-12'>
                                            <div className='form-group'>
                                                <input id='lastname' type='text' onChange={handleChange} className='form-control form-control-user' placeholder='Apellido(s)' />
                                            </div>
                                        </div>
                                        <div className='col-2'>
                                            <div className='form-group'>
                                                <select id='nationalCode' onChange={handleChange} className='form-control form-control-user'>
                                                    <option value='ve'>+58</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='col-10'>
                                            <div className='form-group'>
                                                <input id='numberPhone' type='text' onChange={handleChange} className='form-control form-control-user' placeholder='Número de teléfono' />
                                            </div>
                                        </div>
                                        <div className='col-12 mb-2'>
                                            <h6 className='text-left'>Datos de perfil</h6>
                                        </div>
                                        <div className='col-12'>
                                            <div className='form-group'>
                                                <select id='profile' onChange={handleChange} className='form-control form-control-user'>
                                                    <option value='usuario'>Usuario</option>
                                                    <option value='gerente'>Gerente</option>
                                                </select>
                                            </div>
                                        </div>
                                        {
                                            !formik.isValid ?
                                                <div className='col-12 mb-2'>
                                                    <h6 className='text-left'>Validaciones</h6>
                                                </div>
                                                : ''
                                        }
                                        {

                                            (errors.email && touched.email) ||
                                                (errors.password && touched.password) ||
                                                (errors.repeat_password && touched.repeat_password) ||
                                                (errors.name && touched.name) ||
                                                (errors.lastname && touched.lastname) ||
                                                (errors.nationalCode && touched.nationalCode) ||
                                                (errors.numberPhone && touched.numberPhone) ||
                                                (errors.profile && touched.profile)
                                                ?
                                                <div className='col-12 alert alert-danger text-left'>
                                                    <ul>
                                                        {
                                                            (errors.email && touched.email) ?
                                                                <li style={{ listStyle: 'none' }}>
                                                                    <b>Correo electrónico:</b> {errors.email}
                                                                </li> : ''
                                                        }
                                                        {
                                                            errors.password && touched.password ?
                                                                <li style={{ listStyle: 'none' }}>
                                                                    <b>Contraseña:</b> {errors.password}
                                                                </li> : ''
                                                        }
                                                        {
                                                            errors.repeat_password && touched.repeat_password ?
                                                                <li style={{ listStyle: 'none' }}>
                                                                    <b>Contraseña repetida:</b> {errors.repeat_password}
                                                                </li> : ''
                                                        }
                                                        {
                                                            errors.name && touched.name ?
                                                                <li style={{ listStyle: 'none' }}>
                                                                    <b>Nombre:</b> {errors.name}
                                                                </li> : ''
                                                        }
                                                        {
                                                            errors.lastname && touched.lastname ?
                                                                <li style={{ listStyle: 'none' }}>
                                                                    <b>Apellido:</b> {errors.lastname}
                                                                </li> : ''
                                                        }
                                                        {
                                                            errors.nationalCode && touched.nationalCode ?
                                                                <li style={{ listStyle: 'none' }}>
                                                                    <b>Cóodigo de area:</b> {errors.nationalCode}
                                                                </li> : ''
                                                        }
                                                        {
                                                            errors.numberPhone && touched.numberPhone ?
                                                                <li style={{ listStyle: 'none' }}>
                                                                    <b>Teléfono:</b> {errors.numberPhone}
                                                                </li> : ''
                                                        }
                                                        {
                                                            errors.profile && touched.profile ?
                                                                <li style={{ listStyle: 'none' }}>
                                                                    <b>Contraseña repetida:</b> {errors.profile}
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
export default AddNewClient;