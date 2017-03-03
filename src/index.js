import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import './index.css';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import Immutable from 'immutable';
import thunk from 'redux-thunk';
import CURRENCIES from './currencies.const';

//Initialize store with reducer and empty Map default state
const store = createStore(reducer, applyMiddleware(thunk));

//Intialize app state by dispatching initial state
store.dispatch({
  type: 'SET_EXCHANGE',
  state: Immutable.fromJS({
    currencyOptions : CURRENCIES,
    currency : 'USD',
    pivot : 'EUR',
    amount : 1,
    value : {
      isFetching : false,
      valid : true,
      amount : 0
    }
  })
});

console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
