import React, { Component } from 'react';
import './App.css';
import AppHeader from './AppHeader/AppHeader';
import {ExchangeContainer} from './Exchange/Exchange';

const chartData = [
  {
      name: -10,
      value: 0
  }, {
      name: 0,
      value: 23
  }, {
      name: 10,
      value: 3
  }, {
      name: 0,
      value: 99
  }, {
      name: 0,
      value: 4
  }
];

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
