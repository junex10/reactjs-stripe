import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import SideBar from '../shared/sidebar/SideBar';
import Navbar from '../shared/navbar/Navbar';

import Profile from './profile/Profile';

import Footer from '../shared/footer/Footer';

import './../../css/dashboard.css';

class Dashboard extends Component {
    render() {
        return (
            <BrowserRouter>
                <Route path='/dashboard/user/profile' render={() => {
                    return (
                        <div id='wrapper'>
                            <SideBar />
                            <div id="content-wrapper" className="d-flex flex-column">
                                <div id="content">
                                    <Navbar site="dashboard" />
                                    <Profile />
                                    <Footer />
                                </div>
                            </div>
                        </div>
                    );
                }} />
            </BrowserRouter>
        );
    }
}

export default Dashboard;