import React, { Component } from 'react';

class NumberPhone extends Component {
    render() {
        return (
            <form className='user' onSubmit={this.handleSubmit}>
                <div className='form-group'>
                    <select className='form-control'>
                        <option value='ve'>+58</option>
                    </select>
                </div>
                <div className='form-group'>
                    <input type='text' className='form-control' placeholder='Número de teléfono' />
                </div>
                <input type='submit' value='Enviar' />
            </form>
        );
    }
}

export default NumberPhone;