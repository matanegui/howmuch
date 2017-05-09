import {Map, fromJS} from 'immutable';

export default function reducer(state=Map({}), action){
  switch (action.type) {
    case 'SET_EXCHANGE':
      return state.merge(Map(action.state));
    case 'SET_EXCHANGE_FIELD':
      return state.set(action.field, action.value);
    case 'GET_EXCHANGE_VALUE':
      return state.mergeDeep(fromJS({value : action.value}));
    case 'SET_EXCHANGE_VALUE':
      return state.set('value', Map(action.value));
    case 'SET_HISTORY_OPTION':
      return state.setIn(['historyOptions', action.field], action.value);
    case 'SET_HISTORY_GRAPH_DATA':
      return state.set('historyGraph', action.historyGraphData);
    default :
      return state;
  }
}
