import React, { Component } from 'react';
import SweetAlert from "react-bootstrap-sweetalert";

export default class FormSweetAlert extends Component {
    constructor(props) {
        super(props);
        this.sweetAlert = props.sweet;

        this.title = props.title;
        this.form = props.form;
        this.button = props.button;
        this.cancelButton = props.cancelButton;

        this.state = {
            isOpen: true
        };
    }
    render() {
        return (
            <SweetAlert
                show={this.state.isOpen}
                info
                title={() => <h4 className="headingModal mt-2 mb-4">{this.title}</h4>}
                showCancel
                showConfirm={false}
                onConfirm={() => this.setState({isOpen: false})}
                onCancel={() => this.setState({isOpen: false})}
                confirmBtnText={this.button}
                cancelBtnText={this.cancelButton}
                cancelBtnCssClass='btn btn-danger text-white'
                cancelBtnStyle={{borderRadius: '3em', paddingTop: '.75em', paddingBottom: '.75em'}}
                confirmBtnCssClass='btn btn-primary text-white'
                confirmBtnStyle={{border: 'none', borderRadius: '3em', paddingTop: '.75em', paddingBottom: '.75em'}}
            >
                <div className="bodyModal">
                    {this.form}
                </div>
            </SweetAlert>
        );
    }
}