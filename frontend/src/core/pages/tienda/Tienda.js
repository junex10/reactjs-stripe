import React, { Component } from 'react';

import FilterBar from './FilterBar';
import Products from './Products';

import './../../../css/store.css';

class Tienda extends Component {
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
                        <Products />
                    </section>
                </div>
            </main>
        );
    }
};

export default Tienda;