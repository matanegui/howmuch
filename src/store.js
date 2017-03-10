import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import reducer from './reducer';
import INITIAL_STATE from './initalState.const';

//Initial state
const initialState = {
  exchange: Immutable.fromJS(INITIAL_STATE)
};

export const store = createStore(reducer, initialState, applyMiddleware(thunk));
