import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import userSVG from './../../../img/dashboard/undraw_profile.svg';

import DashboardNavbar from './DashboardNavbar';
import { userSession } from './../../../commons/config';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.background = props.background;
        this.navbar = props.site;

        this.email = userSession !== null ? userSession.user : '';
    }
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
                        <li className="nav-link scrollto"><Link to='/home'>Home</Link></li>
                        <li className="nav-link scrollto"><Link to='/tienda'>Tienda</Link></li>
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