import {Map} from 'immutable';

export default function reducer(state=Map({}), action){
  switch (action.type) {
    case 'SET_EXCHANGE':
      return state.merge(action.state);
    break;
    case 'SET_CURRENCY':
      return state.set('currency', action.currency);
    break;
    case 'SET_PIVOT':
      return state.set('pivot', action.currency);
    break;
    case 'SET_AMOUNT':
      return state.set('amount', action.amount);
    break;
    default :
      return state;
  }
}
