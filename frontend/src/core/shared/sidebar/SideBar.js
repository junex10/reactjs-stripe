import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { authSection, logout } from './../../auth/AuthUser.auth';

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: authSection('profile'),
            log: true,
            configAccount: authSection('account'),
            management: authSection('management')
        }
    }
    render() {
        return (
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

                <div className="sidebar-brand d-flex align-items-center justify-content-center">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <img width={100} src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png' alt='logo' />
                    </div>
                    <div className="sidebar-brand-text mx-3">Tienda stripe</div>
                </div>

                <hr className="sidebar-divider my-0" />
                <hr className="sidebar-divider" />

                <div className="sidebar-heading">
                    PERSONAL
                </div>
                {
                    this.state.configAccount ?
                        <li className="nav-item mt-4 mb-4 side">
                            <Link to='/dashboard/user/profile'>
                                <i className="fas fa-user"></i>
                                <span className='ml-2'>Perfil</span>
                            </Link>
                        </li>
                        : ''
                }
                {
                    this.state.log ?
                        <li className="nav-item mb-4 side">
                            <Link to='/dashboard/user/logs'>
                                <i className="fas fa-clipboard-list"></i>
                                <span className='ml-2'>Historial</span>
                            </Link>
                        </li>
                        : ''
                }
                <hr className="sidebar-divider" />

                <div className="sidebar-heading">
                    Administrador
                </div>
                {
                    this.state.configAccount ?
                        <li className="nav-item mt-4 side">
                            <Link to='/dashboard/admin'>
                                <i className="fas fa-user-circle"></i>
                                <span className='ml-2'>Administración de cuenta</span>
                            </Link>
                        </li>
                        : ''
                }
                {
                    this.state.management ?
                        <>
                            <li className="nav-item mt-4 side">
                                <Link to='/dashboard/clients'>
                                    <i className="fas fa-users"></i>
                                    <span className='ml-2'>Clientes</span>
                                </Link>
                            </li>
                            <li className="nav-item mt-4 side">
                                <Link to='/dashboard/store'>
                                    <i className="fas fa-store"></i>
                                    <span className='ml-2'>Tienda</span>
                                </Link>
                            </li>
                        </>
                        : ''
                }
                <hr className="sidebar-divider mt-4" />
                <div className="sidebar-heading">
                    Tienda
                </div>
                <li style={{ cursor: 'pointer' }} className='nav-item mt-4 side' onClick={() => document.location.href = '/tienda/Sin filtros'}>
                    <i className="fas fa-store"></i>
                    <span className='ml-2'>Ir a la tienda</span>
                </li>
                <li style={{ cursor: 'pointer' }} className='nav-item mt-4 side' onClick={logout}>
                    <i className="fas fa-sign-out-alt"></i>
                    <span className='ml-2'>Cerrar sesión</span>
                </li>
            </ul>
        );
    }
}

export default SideBar;