import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import DashboardNavbar from './DashboardNavbar';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.background = props.background;
        this.navbar = props.site;
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
                        <li className="nav-link scrollto"><Link to='/home'>Home</Link></li>
                        <li className="nav-link scrollto"><Link to='/tienda'>Tienda</Link></li>
                        <li className="nav-link scrollto"><Link to='/login'>Log in</Link></li>
                        <li className="nav-link scrollto"><Link to='/login/signup'><button className='btn btn-success'>Sign Up</button></Link></li>
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