import {Map} from 'immutable';

export default function reducer(state=Map({}), action){
  switch (action.type) {
    case 'SET_EXCHANGE':
      return state.merge(Map(action.state));
      break;
    case 'SET_EXCHANGE_FIELD':
      return state.set(action.field, action.value);
      break;
    case 'GET_EXCHANGE_VALUE':
      return state.set('value', Map(action.value));
      break;
    case 'RECIEVE_EXCHANGE_VALUE':
      return state.set('value', Map(action.value));
      break;
    default :
      return state;
  }
}
