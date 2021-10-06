import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: {
                text: '',
                activated: false
            },
            password: {
                text: '',
                activated: false
            },
            repeat_password: {
                text: '',
                activated: false
            },
            remember: false,
            errors: {
                haveErrors: true
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    validate = values => {
        const errors = {
            email: {
                emailNotFound: null
            },
            password: {
                passwordNotFound: null,
                passwordNotEqual: null
            },
            haveErrors: false
        };
        if (values.email.activated) {
            if (!values.email.text) errors.email.emailNotFound = 'Campo obligatorio';
            else errors.email.emailNotFound = null;
        }
        if (values.password.activated) {
            if (!values.password.text) errors.password.passwordNotFound = 'Campo obligatorio';
            else errors.password.passwordNotFound = null;

            if (values.repeat_password.text !== values.password.text) errors.password.passwordNotEqual = 'Las contraseñas deben ser iguales';
            else errors.password.passwordNotEqual = null;
        }
        if (values.repeat_password.activated) {
            if (!values.repeat_password.text) errors.password.passwordNotFound = 'Campo obligatorio';
            else errors.password.passwordNotFound = null;

            if (values.repeat_password.text !== values.password.text) errors.password.passwordNotEqual = 'Las contraseñas deben ser iguales';
            else errors.password.passwordNotEqual = null;
        }
        if (
            (errors.email.emailNotFound == null) &&
            (errors.password.passwordNotFound == null) &&
            (errors.password.passwordNotEqual == null)
        ) {
            errors.haveErrors = false
        } else {
            errors.haveErrors = true;
        }
        return errors;
    }
    handleChange(event) {
        const id = event.target.id;
        const actualData = event.target.value;
        
        switch (id) {
            case 'email':
                this.setState({ email: { text: actualData, activated: true} });
            break;
            case 'password':
                this.setState({ password: { text: actualData, activated: true} });
            break;
            case 'repeat_password':
                this.setState({ repeat_password: { text: actualData, activated: true} });
            break;
            default:
            break;
        }
        setTimeout(() => {
            const validatedForm = this.validate(this.state);
            this.setState({ errors: validatedForm });
        }, 1000);
    }
    
    handleSubmit(event) {
        if (this.state.errors.haveErrors) {
            // Fetch
            event.preventDefault();
        }
    }
    rememberStatus = () => {
        this.setState({ remember: (!this.state.remember) ? true : false })
    }
    
    render() {
        const { errors } = this.state;
        return (
            <div className="container backgroundLogin">
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">
                                                    Registrarse
                                                </h1>
                                            </div>
                                            <form className="user" action='/dashboard/user/profile' onSubmit={this.handleSubmit}>
                                                <div className="form-group">
                                                    <input type="email" onMouseLeave={this.handleChange} className="form-control form-control-user"
                                                        id="email" aria-describedby="emailHelp"
                                                        placeholder="Correo electrónico" required />
                                                    {
                                                        errors.email &&
                                                        <div className='ml-2 mt-4 error'>
                                                            <p style={{ color: 'red', fontSize: '14px' }}>{errors.email.emailNotFound}</p>
                                                        </div>
                                                    }
                                                </div>
                                                <div className="form-group">
                                                    <input type="password" className="form-control form-control-user"
                                                        id="password" onMouseLeave={this.handleChange} placeholder="Contraseña" required />
                                                </div>
                                                <div className="form-group">
                                                    <input type="password" className="form-control form-control-user"
                                                        id="repeat_password" onMouseLeave={this.handleChange} placeholder="Repetir Contraseña" required />
                                                    {
                                                        errors.password &&
                                                        <div className='ml-2 mt-4 error'>
                                                            <p style={{ color: 'red', fontSize: '14px' }}>{errors.password.passwordNotFound}</p>
                                                            <p style={{ color: 'red', fontSize: '14px' }}>{errors.password.passwordNotEqual}</p>
                                                        </div>
                                                    }
                                                </div>
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox small">
                                                        <input onClick={this.rememberStatus} type="checkbox" className="custom-control-input" id="customCheck" />
                                                        <label className="custom-control-label" htmlFor="customCheck">Recuerdame</label>
                                                    </div>
                                                </div>
                                                <button className="btn btn-success btn-user btn-block" disabled={errors.haveErrors}>
                                                    Crear cuenta
                                                </button>
                                                <hr />
                                            </form>
                                            <div className="text-center">
                                                <Link to='/login'><p className="small" style={{color: 'var(--azul)'}}>Tiene cuenta? Iniciar sesion</p></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        );
    }
}

export default Register;