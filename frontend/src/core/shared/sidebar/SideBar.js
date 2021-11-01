import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SideBar extends Component {
    render() {
        return (
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

                <a className="sidebar-brand d-flex align-items-center justify-content-center">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <img width={100} src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png' alt='logo' />
                    </div>
                    <div className="sidebar-brand-text mx-3">Tienda stripe</div>
                </a>

                <hr className="sidebar-divider my-0" />

                {/*<li className="nav-item active">
                    <a className="nav-link" href="index.html">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span></a>
        </li>*/}

                <hr className="sidebar-divider" />

                <div className="sidebar-heading">
                    PERSONAL
                </div>

                <li className="nav-item mt-4 mb-4 side">
                    <Link to='/dashboard/user/profile'>
                        <i className="fas fa-user"></i>
                        <span className='ml-2'>Perfil</span>
                    </Link>
                </li>

                <li className="nav-item mb-4 side">
                    <Link to='/dashboard/user/logs'>
                        <i className="fas fa-clipboard-list"></i>
                        <span className='ml-2'>Historial</span>
                    </Link>
                </li>
                <hr className="sidebar-divider" />

                <div className="sidebar-heading">
                    Administrador
                </div>

                <li className="nav-item mt-4 side">
                    <Link to='/dashboard/admin'>
                        <i className="fas fa-user-circle"></i>
                        <span className='ml-2'>Administración de cuenta</span>
                    </Link>
                </li>
            </ul>
        );
    }
}

export default SideBar;