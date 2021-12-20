import React, { Component } from 'react';
import {
    BasicWindow,
    SectionTitleWindow
} from './../../shared/shared.module';
import { withRouter } from 'react-router-dom';
import ProductsList from './ProductsList';

class Store extends Component {
    render() {
        return (
            <>
                <div className="container-fluid">
                    {
                        this.props.match.params.product === undefined ?
                            <>
                                <SectionTitleWindow title='Productos' />
                                <div className='row'>
                                    <div className='col-12'>
                                        <BasicWindow title='Listado de productos'>
                                            <ProductsList />
                                        </BasicWindow>
                                    </div>
                                </div>
                            </>
                            :
                            <>

                            </>
                    }
                </div>
            </>
        )
    }
}
export default withRouter(Store);