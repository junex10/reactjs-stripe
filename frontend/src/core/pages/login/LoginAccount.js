import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LoginAccount extends Component {
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
                passwordNotFound: null
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
        }
        if (
            (errors.email.emailNotFound == null) &&
            (errors.password.passwordNotFound == null)
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
    render(){
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
                                                    Iniciar sesión
                                                </h1>
                                            </div>
                                            <form className="user" action='/dashboard/user/profile' onSubmit={this.handleSubmit}>
                                                <div className="form-group">
                                                    <input type="email" onMouseLeave={this.handleChange} className="form-control form-control-user"
                                                        id="email" aria-describedby="emailHelp"
                                                        placeholder="Correo electrónico" />
                                                    {
                                                        errors.email &&
                                                        <div className='ml-2 mt-4 error'>
                                                            <p style={{ color: 'red', fontSize: '14px' }}>{errors.email.emailNotFound}</p>
                                                        </div>
                                                    }
                                                </div>
                                                <br />
                                                <div className="form-group">
                                                    <input type="password" onMouseLeave={this.handleChange} className="form-control form-control-user"
                                                        id="password" placeholder="Contraseña" />
                                                        {
                                                        errors.password &&
                                                        <div className='ml-2 mt-4 error'>
                                                            <p style={{ color: 'red', fontSize: '14px' }}>{errors.password.passwordNotFound}</p>
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
                                                    Iniciar sesión
                                                </button>
                                                <hr />
                                                    {/*<a href="index.html" className="btn btn-google btn-user btn-block">
                                                        <i className="fab fa-google fa-fw"></i> Login with Google
                                                    </a>
                                                    <a href="index.html" className="btn btn-facebook btn-user btn-block">
                                                        <i className="fab fa-facebook-f fa-fw"></i> Login with Facebook
        </a>*/}
                                            </form>
                                                {/*<div className="text-center">
                                                    <a className="small" href="forgot-password.html">Olvidaste la contraseña?</a>
                                                </div>*/}
                                                <div className="text-center">
                                                    <Link to='/login/signup'><p className="small" style={{color: 'var(--azul)'}}>Crear una cuenta!</p></Link>
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
export default LoginAccount;