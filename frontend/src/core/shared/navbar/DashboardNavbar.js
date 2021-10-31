import React, { Component } from 'react';

import userSVG from './../../../img/dashboard/undraw_profile.svg';

import { auth } from './../../auth/AuthUser.auth';

class DashboardNavbar extends Component {
    constructor(props){
        super(props);
        this.email = auth.email;
    }
    render() {
        return (
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                    <i className="fa fa-bars"></i>
                </button>
                <ul className="navbar-nav ml-auto">

                    <li className="nav-item dropdown no-arrow d-sm-none">
                        <p className="nav-link dropdown-toggle" id="searchDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-search fa-fw"></i>
                        </p>
                        <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                            aria-labelledby="searchDropdown">
                            <form className="form-inline mr-auto w-100 navbar-search">
                                <div className="input-group">
                                    <input type="text" className="form-control bg-light border-0 small"
                                        placeholder="Search for..." aria-label="Search"
                                        aria-describedby="basic-addon2" />
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" type="button">
                                            <i className="fas fa-search fa-sm"></i>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </li>
                    <li className="nav-item">
                        <img className="mr-4 img-profile rounded-circle"
                            src={userSVG} width='30' alt='userImage' />
                        <span className='text-black'>{this.email}</span>
                    </li>
                </ul>

            </nav>
        );
    }
}

export default DashboardNavbar;