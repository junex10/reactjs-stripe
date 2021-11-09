import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import BuyButtons from './BuyButtons';
import { getStore } from './../../services/services.module';

class Products extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: {
                category: props.actualCategory,
                products: []
            }
        }
    }
    componentDidMount() {
        getStore(this.state.filter.category)
            .then(value => {
                this.setState({
                    filter: {
                        category: this.state.filter.category,
                        products: [...value.data]
                    }
                });
            })
    }
    render() {
        return (
            <div className='container'>
                <div className='row'>
                    {
                        this.state.filter.products.map(value => {
                            return (
                                <div className='col-4 col-sm-4 col-md-3 col-lg-3 mb-4' key={value.product}>
                                    <div className='card'>
                                        <div className='card-title'>
                                            <img className='image' src={value.image}
                                                alt={value.product} />
                                        </div>
                                        <div className='card-body'>
                                            <div className='mb-3'>
                                                <span className="badge badge-primary">{value.product}</span>
                                            </div>
                                            Precio <b>{new Intl.NumberFormat().format(value.price)}$</b>
                                            <BuyButtons product={value.product} />
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}
export default withRouter(Products);