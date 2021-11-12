import React, { Component } from 'react';

import CategoryFilterBar from './CategoryFilterBar';

import './../../../css/filterbar.css';

class FilterBar extends Component {
    hideFilter() {
        const filters = document.getElementById('filters');
        if (filters.dataset.control === '1') {
            filters.style.display = 'none';
            filters.dataset.control = '0';
        }
        else {
            filters.style.display = 'inherit';
            filters.dataset.control = '1';
        }
    }
    category = e => {
        const { category } = this.props;
        category(e);
    };
    render() {
        return (
            <section className='inner-page'>
                <div className='container'>
                    <div className='headerFilter item-filter row' style={{cursor: 'pointer'}} onClick={this.hideFilter}>
                        <div className='col-2'>
                            <i className="fas fa-sliders-h"></i>
                        </div>
                        <div className='mt-1 col-10'>
                            <h6>Filtros</h6>
                        </div>
                    </div>
                    <div id='filters' data-control='1'>
                        <CategoryFilterBar />
                    </div>
                </div>
            </section>
        );
    }
}

export default FilterBar;