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
                        {/*<li className="dropdown"><a href={() => false}><span>Drop Down</span> <i className="bi bi-chevron-down"></i></a>
                                <ul>
                                    <li><a href={() => false}>Drop Down 1</a></li>
                                    <li className="dropdown"><a href={() => false}><span>Deep Drop Down</span> <i className="bi bi-chevron-right"></i></a>
                                        <ul>
                                            <li><a href={() => false}>Deep Drop Down 1</a></li>
                                            <li><a href={() => false}>Deep Drop Down 2</a></li>
                                            <li><a href={() => false}>Deep Drop Down 3</a></li>
                                            <li><a href={() => false}>Deep Drop Down 4</a></li>
                                            <li><a href={() => false}>Deep Drop Down 5</a></li>
                                        </ul>
                                    </li>
                                    <li><a href={() => false}>Drop Down 2</a></li>
                                    <li><a href={() => false}>Drop Down 3</a></li>
                                    <li><a href={() => false}>Drop Down 4</a></li>
                                </ul>
        </li>*/}
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