import React, { Component } from 'react';
import { Typography } from '@mui/material';
import { withRouter } from 'react-router';
import SweetAlert from 'react-bootstrap-sweetalert';
import { confirmPaid } from './../../services/services.module';

import './../../../App.css';
import './../../../css/payment.css';

class AcceptedPayment extends Component{
    constructor(props){
        super(props);
        this.id = props.match.params.id;
        this.state = {
            confirmSuccess: false,
            confirmError: false,
            confirmLoading: true
        }
    }
    onConfirm = () => {
        confirmPaid(this.id)
        .then(() => {
            this.setState({ confirmSuccess: true, confirmError: false, confirmLoading: false })
        })
        .catch(() => {
            this.setState({ confirmSuccess: false, confirmError: true, confirmLoading: false })
        })
    }
    onRedirect = () => setTimeout(() => this.props.history.push('/tienda/Sin filtros'), 5000)
    render(){
        return(
            <>
                <div id='allBackground'></div>
                <SweetAlert
                    show={this.state.confirmSuccess}
                    title={<Typography component={'div'} className="headingModal mt-2 mb-4 text-success" variant={'h5'}>Pago efectuado!</Typography>}
                    showCloseButton
                    closeBtnStyle={{ boxShadow: 'none' }}
                    showConfirm={false}
                    timeout={5000}
                    onConfirm={this.onRedirect}
                    success
                >
                    <div className="bodyModal">
                        Se ha efectuado sastifactoriamente su pago
                    </div>
                </SweetAlert>
                <SweetAlert
                    show={this.state.confirmError}
                    title={<Typography component={'div'} className="headingModal mt-2 mb-4 text-danger" variant={'h5'}>Error de conexión!</Typography>}
                    showCloseButton
                    closeBtnStyle={{ boxShadow: 'none' }}
                    showConfirm={false}
                    timeout={5000}
                    onConfirm={this.onRedirect}
                    error
                >
                    <div className="bodyModal">
                        No se pudo confirmar el pago, <p id='messageError'>intentaremos nuevamente...</p>
                    </div>
                </SweetAlert>
                <SweetAlert
                    show={this.state.confirmLoading}
                    title={<Typography component={'div'} className="headingModal mt-2 mb-4 text-primary" variant={'h5'}>Confirmando pago</Typography>}
                    showCloseButton
                    closeBtnStyle={{ boxShadow: 'none' }}
                    showConfirm={false}
                    timeout={5000}
                    onConfirm={this.onConfirm}
                    info
                >
                    <div className="bodyModal">
                        Se esta confirmando el pago, sea paciente
                    </div>
                </SweetAlert>
            </>
        )
    }
}
export default withRouter(AcceptedPayment);