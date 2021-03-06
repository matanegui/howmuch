import React, { Component } from 'react';
import './App.css';
import AppHeader from './AppHeader/AppHeader';
import {ExchangeContainer} from './Exchange/Exchange';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppHeader />
        <ExchangeContainer />
      </div>
    );
  }
}

export default App;
