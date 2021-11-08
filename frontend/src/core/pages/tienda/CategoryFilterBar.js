import React, { Component } from 'react';
import { getCategory } from './../../services/services.module';
import { withRouter } from 'react-router-dom';

class CategoryFilterBar extends Component {
    constructor(props) {
        super(props);

        this.actualCategory = props.match.params.filter;
        this.state = {
            category: []
        }
    }
    componentDidMount() {
        getCategory()
            .then(value =>
                this.setState({ category: [...value.data] })
            )
    }
    setCategory = (event) => {
        const id = event.target.id.replace('category_', '');
        const classFilter = document.getElementsByClassName('optionFil');
        for (let x = 0; x < classFilter.length; x++) {
            classFilter[x].checked = false;
        }
        event.target.checked = true;
        document.location.href = `/tienda/${id}`
        const { category } = this.props;
        category(id)
    }
    render() {
        return (
            <div className='bodyFilter item-filter row'>
                <div className='col-2'>
                    <i className="fas fa-puzzle-piece"></i>
                </div>
                <div className='mt-1 col-7'>
                    <h6>Category</h6>
                </div>
                <div style={{ cursor: 'pointer' }} className='mt-1 col-3'>
                    <i className="fas fa-arrow-right"></i>
                </div>
                <div className='col-12'>
                    <form className='childrenFilters'>
                        {
                            this.state.category.map(value => {
                                return (
                                    <div className="form-check check" key={`categoryContainer_${value.name}`}>
                                        {
                                            value.name === this.actualCategory ?
                                                <input
                                                    className="form-check-input optionFil"
                                                    type="radio"
                                                    name={`category_${value.name}`}
                                                    id={`category_${value.name}`}
                                                    key={`category_${value.name}`}
                                                    onClick={this.setCategory}
                                                    defaultChecked
                                                />
                                                :
                                                <input
                                                    className="form-check-input optionFil"
                                                    type="radio"
                                                    name={`category_${value.name}`}
                                                    id={`category_${value.name}`}
                                                    key={`category_${value.name}`}
                                                    onClick={this.setCategory}
                                                />
                                        }
                                        <label className="form-check-label" htmlFor={`category_${value.name}`}>{value.name}</label>
                                    </div>
                                );
                            })
                        }
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(CategoryFilterBar);