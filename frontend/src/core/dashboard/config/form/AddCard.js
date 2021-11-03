import React, { Component } from 'react';
import * as yup from 'yup';
import { Form, Formik } from 'formik';

class AddCard extends Component {
    constructor(props) {
        super(props);

        this.initialValues = {
            keycard: this.creditNumber,
            expirationDate: '',
            cvc: this.cvc
        };
    }
    render() {
        return(
            <>

            </>
        );
    }
}
export default AddCard;