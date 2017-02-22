import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AppHeader from './AppHeader/AppHeader';
import Exchange from './Exchange/Exchange';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppHeader />
        <Exchange />
      </div>
    );
  }
}

export default App;
