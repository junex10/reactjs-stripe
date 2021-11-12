import React, { Component } from 'react';
import { Typography } from '@mui/material';
import { withRouter } from 'react-router';
import SweetAlert from 'react-bootstrap-sweetalert';

import './../../../App.css';
import './../../../css/payment.css';

class CancelledPayment extends Component{
    onRedirect = () => setTimeout(() => this.props.history.push('/tienda/Sin filtros'), 5000)
    render(){
        return(
            <>
                <div id='allBackground'></div>
                <SweetAlert
                    show={true}
                    title={<Typography component={'div'} className="headingModal mt-2 mb-4 text-info" variant={'h5'}>Pago cancelado</Typography>}
                    showCloseButton
                    closeBtnStyle={{ boxShadow: 'none' }}
                    showConfirm={false}
                    timeout={5000}
                    onConfirm={this.onRedirect}
                    info
                >
                    <div className="bodyModal">
                        No se concretó la compra, estará disponible la compra en carrito de compras
                    </div>
                </SweetAlert>
            </>
        )
    }
}
export default withRouter(CancelledPayment);