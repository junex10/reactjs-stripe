import React, { Component } from 'react';

class Loader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activated: props.show
        }
    }
    render() {
        return (
            <>
                {
                    this.state.activated ?
                        <div>
                            <button className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></button>
                            <div id="preloader">
                                <div className='loading'>
                                    <h4>Cargando...</h4>
                                </div>
                            </div>
                        </div>
                    : ''
                }
            </>
        );
    }
}

export default Loader;