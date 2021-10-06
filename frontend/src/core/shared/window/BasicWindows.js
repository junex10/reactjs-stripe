import React, { Component } from 'react';

class BasicWindow extends Component {
    constructor(props) {
        super(props);
        this.title = props.title;
        this.body = props.body;
    }
    render() {
        return (
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">{this.title}</h6>
                </div>
                <div className="card-body">
                    {this.body}
                </div>
            </div>
        );
    }
}
export default BasicWindow;