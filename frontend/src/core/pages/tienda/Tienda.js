import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import FilterBar from './FilterBar';
import Products from './Products';

import './../../../css/store.css';

class Tienda extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actualCategory: props.match.params.filter
        }
    }
    onActualCategory = e => this.setState({ actualCategory: e });
    render() {
        return (
            <main id="main">
                <section className="breadcrumbs">
                    <div className="container" style={{ maxWidth: '90%', width: '90%' }}>
                        <div className="d-flex justify-content-between align-items-center">
                            <h2>Tienda</h2>
                        </div>
                    </div>
                </section>
                <div className='row'>
                    <div className='col-2'>
                        <FilterBar />
                    </div>
                    <section className='col-10 store'>
                        <Products actualCategory={this.state.actualCategory} />
                    </section>
                </div>
            </main>
        );
    }
};

export default withRouter(Tienda);