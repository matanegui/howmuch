import {Map} from 'immutable';
import exchange from './app/Exchange/Exchange.reducer';
import { combineReducers } from 'redux';

const appReducer = combineReducers({
  exchange
});

export default appReducer;
