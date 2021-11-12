import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Cart extends Component{
    render(){
        return(
            <>
                <h1>Hola desde carrito</h1>
            </>
        );
    }
}
export default withRouter(Cart);