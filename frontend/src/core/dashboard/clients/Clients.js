import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    BasicWindow,
    SectionTitleWindow
} from './../../shared/shared.module';
import ClientsList from './ClientsList';
import ClientDetail from './ClientDetail';

class Clients extends Component {
    render() {
        return (
            <>
                <div className="container-fluid">
                    {
                        this.props.match.params.id === undefined ?
                            <>
                                <SectionTitleWindow title='Clientes' />
                                <div className='row'>
                                    <div className='col-12'>
                                        <BasicWindow title='Listado de clientes'>
                                            <ClientsList />
                                        </BasicWindow>
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <SectionTitleWindow title='Detalles del cliente' />
                                <ClientDetail />
                            </>
                    }
                </div>
            </>
        )
    }
}
export default withRouter(Clients);