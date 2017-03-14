import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import reducer from './reducer';
import INITIAL_EXCHANGE_STATE from './initalState.const';

//Initial state
const initialState = {
  exchange: Immutable.fromJS(INITIAL_EXCHANGE_STATE)
};

export const store = createStore(reducer, initialState, applyMiddleware(thunk));
