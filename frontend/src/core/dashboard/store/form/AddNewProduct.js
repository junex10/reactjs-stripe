import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Typography } from '@mui/material';
import * as yup from 'yup';
import { Form, Formik } from 'formik';
import { getCategory, registerStock } from './../../../services/services.module';

class AddNewProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            connectionError: false,
            connectionSuccess: false,
            categorys: []
        }

        this.initialValues = {
            product: '',
            price: 0,
            stock: 0,
            category: 'Computadoras',
            image: ''
        };

        this.validationSchema = yup.object({
            product: yup.string()
                .required('Campo obligatorio'),
            price: yup.number()
                .required('Campo obligatorio'),
            stock: yup.number()
                .required('Campo obligatorio'),
            category: yup.string()
                .required('Campo obligatorio'),
            image: yup.string()
                .required('Campo obligatorio')
        });

        getCategory()
            .then(category => this.setState({ categorys: [...category.data] }))
    }
    handleSubmit = form => {
        console.log(form);
        registerStock(form.product, form.price, form.stock, form.category, form.image)
            .then(() => this.setState({ connectionSuccess: true }))
            .catch(() => this.setState({ connectionError: true }))
    }
    onConfirm = () => {
        this.setState({ connectionSuccess: false });
        document.location.href = document.location;
    }
    getBase64 = file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
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
                        <h6>Producto registrado!</h6>
                    </div>
                </SweetAlert>
                <Formik initialValues={this.initialValues} validationSchema={this.validationSchema} onSubmit={this.handleSubmit}>
                    {
                        formik => {
                            const { errors, handleChange } = formik;
                            return (
                                <Form>
                                    <div className='row'>
                                        <div className='col-12 mb-2'>
                                            <h6 className='text-left'>Datos del nuevo producto</h6>
                                        </div>
                                        <div className='col-12'>
                                            <div className='form-group'>
                                                <input id='product' type='text' onChange={handleChange} className='form-control form-control-user' placeholder='Producto...' />
                                                {
                                                    errors.product ?
                                                        <h6 className='text-left text-danger mt-3'>{errors.product}</h6> : ''
                                                }
                                            </div>
                                        </div>
                                        <div className='col-12 col-sm-12 col-md-6 col-lg-6'>
                                            <div className='form-group'>
                                                <input id='price' type='number' onChange={handleChange} className='form-control form-control-user' placeholder='Precio...' />
                                                {
                                                    errors.price ?
                                                        <h6 className='text-left text-danger mt-3'>{errors.price}</h6> : ''
                                                }
                                            </div>
                                        </div>
                                        <div className='col-12 col-sm-12 col-md-6 col-lg-6'>
                                            <div className='form-group'>
                                                <input id='stock' type='number' onChange={handleChange} className='form-control form-control-user' placeholder='Cantidad...' />
                                                {
                                                    errors.stock ?
                                                        <h6 className='text-left text-danger mt-3'>{errors.stock}</h6> : ''
                                                }
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className='form-group'>
                                                <select id='category' onChange={handleChange} className='form-control form-control-user'>
                                                    {
                                                        this.state.categorys.map((cat, i) => {
                                                            return (
                                                                <option key={i} value={cat.name}>{cat.name}</option>
                                                            );
                                                        })
                                                    }
                                                </select>
                                                {
                                                    errors.category ?
                                                        <h6 className='text-left text-danger mt-3'>{errors.category}</h6> : ''
                                                }
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className='form-group'>
                                                <input id="image" name="file" type="file" onChange={(event) => {
                                                    this.getBase64(event.currentTarget.files[0])
                                                    .then(x => {
                                                        formik.setFieldValue('image', x, true)
                                                    })
                                                }} />
                                                {
                                                    errors.image ?
                                                        <h6 className='text-left text-danger mt-3'>{errors.image}</h6> : ''
                                                }
                                            </div>
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

export default AddNewProduct;