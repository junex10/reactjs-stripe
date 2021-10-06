import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SideBar extends Component {
    render() {
        return (
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
                </a>

                <hr className="sidebar-divider my-0" />

                <li className="nav-item active">
                    <a className="nav-link" href="index.html">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span></a>
                </li>

                <hr className="sidebar-divider" />

                <div className="sidebar-heading">
                    PERSONAL
                </div>

                <li className="nav-item mt-4 mb-4 side">
                    <Link to='/dashboard/user/profile'>
                        <i className="fas fa-fw fa-cog"></i>
                        <span>Perfil</span>
                    </Link>
                </li>

                <li className="nav-item mb-4 side">
                    <Link to='/dashboard/user/profile'>
                        <i className="fas fa-fw fa-cog"></i>
                        <span>Historial</span>
                    </Link>
                </li>

                <li className="nav-item mb-4 side">
                    <Link to='/dashboard/user/profile'>
                        <i className="fas fa-fw fa-wrench"></i>
                        <span>Configuración</span>
                    </Link>
                </li>

                <hr className="sidebar-divider" />

                <div className="sidebar-heading">
                    Administrador
                </div>

                <li className="nav-item mt-4 side">
                    <Link to='/dashboard/user/profile'>
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Administración de cuenta</span>
                    </Link>
                </li>
            </ul>
        );
    }
}

export default SideBar;