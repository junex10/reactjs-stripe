import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import SideBar from '../shared/sidebar/SideBar';
import Navbar from '../shared/navbar/Navbar';

import Profile from './profile/Profile';
import Log from './logs/Log';
import Config from './config/Config';
import Clients from './clients/Clients';
import Store from './store/Store';

import { authLogin } from './../auth/AuthUser.auth'

import './../../css/dashboard.css';

class Dashboard extends Component {
    constructor(props){
        super(props);
        authLogin();
    }
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
                                </div>
                            </div>
                        </div>
                    );
                }} />
                <Route path='/dashboard/user/logs' render={() => {
                    return (
                        <div id='wrapper'>
                            <SideBar />
                            <div id="content-wrapper" className="d-flex flex-column">
                                <div id="content">
                                    <Navbar site="dashboard" />
                                    <Log />
                                </div>
                            </div>
                        </div>
                    );
                }} />
                <Route path='/dashboard/user/config' render={() => {
                    return (
                        <div id='wrapper'>
                            <SideBar />
                            <div id="content-wrapper" className="d-flex flex-column">
                                <div id="content">
                                    <Navbar site="dashboard" />
                                    <Profile />
                                </div>
                            </div>
                        </div>
                    );
                }} />
                <Route path='/dashboard/admin' render={() => {
                    return (
                        <div id='wrapper'>
                            <SideBar />
                            <div id="content-wrapper" className="d-flex flex-column">
                                <div id="content">
                                    <Navbar site="dashboard" />
                                    <Config />
                                </div>
                            </div>
                        </div>
                    );
                }} />
                <Route path='/dashboard/clients/:id?' render={() => {
                    return (
                        <div id='wrapper'>
                            <SideBar />
                            <div id="content-wrapper" className="d-flex flex-column">
                                <div id="content">
                                    <Navbar site="dashboard" />
                                    <Clients />
                                </div>
                            </div>
                        </div>
                    );
                }} />
                <Route path='/dashboard/store/:product?' render={() => {
                    return (
                        <div id='wrapper'>
                            <SideBar />
                            <div id="content-wrapper" className="d-flex flex-column">
                                <div id="content">
                                    <Navbar site="dashboard" />
                                    <Store />
                                </div>
                            </div>
                        </div>
                    );
                }} />
                <Route path='/dashboard/sales/:sale?' render={() => {
                    return (
                        <div id='wrapper'>
                            <SideBar />
                            <div id="content-wrapper" className="d-flex flex-column">
                                <div id="content">
                                    <Navbar site="dashboard" />
                                    <Store />
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