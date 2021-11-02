import React, { Component } from 'react';
import { spent, getCart } from './../../services/services.module';

class ProfileReport extends Component {
    constructor(props) {
        super(props);

        this.email = props.email;
        this.state = {
            montly: 0,
            annual: 0,
            total: 0,
            totalCart: 0
        }
    }
    componentDidMount() {
        spent(this.email, 'month')
            .then(val => 
                val.data.map(value => this.setState({ montly: this.state.montly + value.spent }))
            )
        spent(this.email, 'year')
            .then(val => 
                val.data.map(value => this.setState({ annual: this.state.annual + value.spent })) 
            )
        spent(this.email, 'nothing')
            .then(val => 
                val.data.map(value => this.setState({ total: this.state.total + value.spent })) 
            )
        getCart(this.email, 'not-image')
            .then(value => 
                this.setState({ totalCart: this.state.totalCart + value.data.length })
            )
    }
    render() {
        return (
            <div className="row">
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        Total gastado (mensual)</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        ${
                                            new Intl.NumberFormat().format(this.state.montly)
                                        }
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-money-bill-wave fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-success shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                        Total gastado (Annual)</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        ${
                                            new Intl.NumberFormat().format(this.state.annual)
                                        }
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-money-bill-wave fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-info shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">compras
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        ${
                                            new Intl.NumberFormat().format(this.state.total)
                                        }
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-warning shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                        EN CARRITO</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        {
                                            new Intl.NumberFormat().format(this.state.totalCart)
                                        }
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-shopping-cart fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileReport;