import React, { Component } from 'react';

import './../../../css/login.css';

import LoginAccount from './LoginAccount';
import Register from './Register';

class Login extends Component {
    constructor(props) {
        super(props);
        this.view = props.match.params.register;
        console.log(this.view);
    }
    render() {
        if (this.view === undefined) return <LoginAccount />
        else return <Register />
    }
}

export default Login;