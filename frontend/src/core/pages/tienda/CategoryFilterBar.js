import React, { Component } from 'react';

class CategoryFilterBar extends Component {
    render() {
        return (
            <div className='bodyFilter item-filter row'>
                <div className='col-2'>
                    <i className="fas fa-puzzle-piece"></i>
                </div>
                <div className='mt-1 col-7'>
                    <h6>Category</h6>
                </div>
                <div style={{ cursor: 'pointer' }} onClick={this.test} className='mt-1 col-3'>
                    <i className="fas fa-arrow-right"></i>
                </div>
                <div className='col-12'>
                    <form className='childrenFilters'>
                        <div className="form-check check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault1"
                                defaultChecked
                            />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">Sin filtros</label>
                        </div>
                        <div className="form-check check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault2"
                            />
                            <label className="form-check-label" htmlFor="flexRadioDefault2">Carros</label>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default CategoryFilterBar;