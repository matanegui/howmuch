import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import './index.css';
import {Provider} from 'react-redux';
import {store} from './store';

console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
