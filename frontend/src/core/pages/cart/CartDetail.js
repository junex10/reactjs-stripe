import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class CartDetail extends Component{
    constructor(props){
        super(props);
        this.id = props.match.params.id;
    }
    render(){
        return(
            <>
                <h1>Hola desde detail</h1>
            </>
        );
    }
}
export default withRouter(CartDetail);