import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Pages from './core/pages/Pages';

import Loader from './core/shared/loader/Loader';

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path='/'
            render={() =>
              <div className='container'>
                <Loader />
                <Pages />
              </div>
            }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
