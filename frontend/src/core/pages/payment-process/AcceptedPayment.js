import React, { Component } from 'react';
import { Typography } from '@mui/material';
import { withRouter } from 'react-router';
import SweetAlert from 'react-bootstrap-sweetalert';

import './../../../App.css';
import './../../../css/payment.css';

class AcceptedPayment extends Component{
    constructor(props){
        super(props);
    }
    onConfirm = () => /*this.props.history.push('/tienda/Sin filtros');*/console.log('aho')
    render(){
        return(
            <>
                <div id='allBackground'></div>
                <SweetAlert
                    show={true}
                    title={<Typography component={'div'} className="headingModal mt-2 mb-4 text-success" variant={'h5'}>Pago efectuado!</Typography>}
                    showCloseButton
                    closeBtnStyle={{ boxShadow: 'none' }}
                    showConfirm={false}
                    timeout={5000}
                    onConfirm={this.onConfirm}
                    success
                >
                    <div className="bodyModal">
                        Se ha efectuado sastifactoriamente su pago
                    </div>
                </SweetAlert>
            </>
        )
    }
}
export default withRouter(AcceptedPayment);