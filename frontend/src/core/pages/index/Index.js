import React from 'react';

import Hero from './Hero';
import About from './About';
import Features from './Features';

import './index.css';
class Index extends React.Component{
    render() {
        return (
            <div>
                <Hero site={this.props.site}/>
                <main id='main'>
                    <About />
                    <Features />
                </main>
            </div>
        );
    }
}

export default Index;