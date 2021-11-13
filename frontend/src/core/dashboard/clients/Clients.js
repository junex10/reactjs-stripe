import React, { Component } from 'react';

import {
    BasicWindow,
    SectionTitleWindow
} from './../../shared/shared.module';
import ClientsList from './ClientsList';

class Clients extends Component {
    render() {
        return(
            <>
                <div className="container-fluid">
                    <SectionTitleWindow title='Historial' />
                    <div className='row'>
                        <div className='col-12'>
                            <BasicWindow title='Compras'>
                                <ClientsList />
                            </BasicWindow>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default Clients;