import React from 'react';

import Hero from './Hero';

import './index.css';
class Index extends React.Component{
    render() {
        return (
            <div>
                <Hero site={this.props.site}/>
            </div>
        );
    }
}

export default Index;