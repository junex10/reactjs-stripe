import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import Index from './index/Index';
import Tienda from './tienda/Tienda';
import Login from './login/Login';
import AcceptedPayment from './payment-process/AcceptedPayment';
import CancelledPayment from './payment-process/CancelledPayment';

import Dashboard from '../dashboard/Dashboard';

import Navbar from '../shared/navbar/Navbar';
import Footer from '../shared/footer/Footer';

class Pages extends Component {
    componentDidMount() {
        /*const loader = document.getElementById('preloader');
        loader.style.display = 'none';*/
    }
    render() {
        return (
            <BrowserRouter>
                <Route path='/' exact render={() => <Redirect to="/home" />} />
                <Route path='/home' render={() => {
                    return (
                        <div>
                            <Navbar background={{ background: '#191CA9', maxWidth: '100%' }} site="index" />
                            <Index site="index" />
                            <Footer />
                        </div>
                    );
                }} />
                <Route path='/tienda/:filter?' render={() => {
                    return (
                        <div>
                            <Navbar background={{ background: '#191CA9', maxWidth: '100%' }} site="index" />
                            <Tienda />
                            <Footer />
                        </div>
                    );
                }} />
                <Route path='/login/:register' component={Login}/>
                <Route exact path='/login' component={Login} />
                <Route path='/accepted-payment/:id' component={AcceptedPayment} />
                <Route path='/cancelled-payment/:id?' component={CancelledPayment} />

                <Route path='/dashboard' component={Dashboard}/>
            </BrowserRouter>
        );
    }
};

export default Pages;