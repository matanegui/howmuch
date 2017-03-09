import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import reducer from './reducer';
import CURRENCIES from './currencies.const';

//Initial state
const initialState = {
  exchange: Immutable.fromJS({
    currencyOptions : CURRENCIES,
    currency : 'USD',
    pivot : 'EUR',
    amount : 1,
    value : {
      isFetching : false,
      valid : true,
      amount : 1
    }
  })
};

export const store = createStore(reducer, initialState, applyMiddleware(thunk));
