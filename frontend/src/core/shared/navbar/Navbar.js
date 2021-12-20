import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import userSVG from './../../../img/dashboard/undraw_profile.svg';

import DashboardNavbar from './DashboardNavbar';
import { userSession } from './../../../commons/config';
import { logout } from './../../auth/AuthUser.auth';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.background = props.background;
        this.navbar = props.site;

        this.email = userSession !== null ? userSession.user : '';
    }
    logout = () => logout('/tienda/Sin filtros')

    SiteNavbar = () => {
        return (<header id="header" className="fixed-top d-flex align-items-center header-transparent" style={this.background}>
            <div className="container d-flex align-items-center justify-content-between">

                <div className="logo">
                    <h1 style={{ color: 'white' }}><span>Tienda</span></h1>
                    <img src="assets/img/logo.png" alt="" className="img-fluid" />
                </div>

                <nav id="navbar" className="navbar">
                    <ul>
                        {
                            userSession !== null ?
                                <li className="nav-link scrollto limitText">
                                    <img className="mr-4 img-profile rounded-circle"
                                        src={userSVG} width='30' alt='userImage' />
                                    <span className='text-white'>{this.email}</span>
                                </li>
                                : ''
                        }
                        {
                            userSession !== null ?
                                <>
                                    {/* 
                                        <li className='nav-link scrollto'>
                                        <div className="dropdown">
                                            <button className="btn btn-success dropdown-toggle" type="button" id="dropdownCart" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i className="fas fa-shopping-cart" style={{ fontSize: '20px', cursor: 'pointer' }}></i> Carrito
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="dropdownCart">
                                                <Link to='/tienda/carrito' className="dropdown-item">Ferrari - 20</Link>
                                            </div>
                                        </div>
                                    </li>
                                    */}
                                </>
                            : ''
                        }

                        <li className="nav-link scrollto"><Link to='/home'>Home</Link></li>
                        <li className="nav-link scrollto"><Link to='/tienda/Sin filtros'>Tienda</Link></li>
                        {
                            userSession === null ?
                                <>
                                    <li className="nav-link scrollto"><Link to='/login'>Log in</Link></li>
                                    <li className="nav-link scrollto"><Link to='/login/signup'><button className='btn btn-success'>Sign Up</button></Link></li>
                                </>
                                : <>
                                    <li className='nav-link scrollto'>
                                        <Link to='/dashboard/user/profile'>Perfil</Link>
                                    </li>
                                    <li className="nav-link scrollto" onClick={this.logout}><Link to='/tienda/Sin filtros'>Cerrar sesión</Link></li>
                                </>
                        }
                    </ul>
                    <i className="bi bi-list mobile-nav-toggle"></i>
                </nav>
            </div>
        </header>
        );
    }
    DashboardNavbar = () => {
        return (
            <DashboardNavbar />
        );
    }
    render() {
        if (this.navbar === 'index') return <this.SiteNavbar />
        else if (this.navbar === 'dashboard') return <this.DashboardNavbar />
    }
}

export default Navbar;