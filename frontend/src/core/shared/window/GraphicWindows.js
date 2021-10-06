import React, { Component } from 'react';

class GraphicWindow extends Component {
    constructor(props){
        super(props);
        this.title = props.title;
        this.graphic = props.graphic;
    }
    render() {
        return (
            <div className="card shadow mb-4">
                <div
                    className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">{this.title}</h6>
                </div>
                <div className="card-body">
                    <div className="chart-area">
                        {this.graphic}
                    </div>
                </div>
            </div>
        );
    }
}
export default GraphicWindow;