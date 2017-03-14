import accounting from 'accounting';
import Moment from 'moment';
import {fromJS} from 'immutable';
import {extendMoment} from 'moment-range';

// Extend 'moment' to support ranges using moment-range
const moment = extendMoment(Moment);
/*
Action creators
*/

export function updateExchangeField(field, value){
  return (dispatch, getState) => {
    dispatch(setExchangeField(field,value));
    const updatedExchange = getState().exchange;
    //Update exchange data
    dispatch(updateExchange(updatedExchange.get('currency'),updatedExchange.get('pivot'),updatedExchange.get('amount')));
    //Update graph
    dispatch(updateHistoryChart(updatedExchange.getIn(['historyOptions','startDate']),updatedExchange.getIn(['historyOptions','endDate'])));
  };
}

export function updateHistoryOption(field, value){
  return (dispatch, getState) => {
    dispatch(setHistoryOption(field, value));
    const updatedExchange = getState().exchange;
    //Update graph
    dispatch(updateHistoryChart(updatedExchange.getIn(['historyOptions','startDate']),updatedExchange.getIn(['historyOptions','endDate'])));
  };
}

export function updateHistoryChart(startDate, endDate){
  return (dispatch, getState) => {
    //Build date range array from startDate and endDate
    const range = moment.range(moment(startDate, 'YYYY-MM-DD'), moment(endDate, 'YYYY-MM-DD'));
    const rangeDays = Array.from(range.by('day'));
    //Get currency and pivot data for the API Query
    const currency = getState().exchange.get('currency');
    const pivot = getState().exchange.get('pivot');
    //Query the exchange API for each day
    const exchangePromises = rangeDays.map(day => {
      return fetch(`http://api.fixer.io/${day.format('YYYY-MM-DD')}?symbols=${pivot},${currency}`);
    });
    Promise.all(exchangePromises)
    .then(exchangeResponsesRaw => Promise.all(exchangeResponsesRaw.map(response => response.json())))
    .then(exchangeResponses => {
      //Build exchangeHistory graph input from responses
      const historyGraphData = exchangeResponses.map(exchangeResponse => {
        return {
          date : exchangeResponse.date,
          value : exchangeResponse.rates[currency]
        }
      });
      dispatch(setHistoryGraphData(fromJS(historyGraphData)));
    })
  };
}

export function setExchangeField(field, value){
  return {
    type: 'SET_EXCHANGE_FIELD',
    field,
    value
  }
}

export function setHistoryOption(field, value){
  return {
    type: 'SET_HISTORY_OPTION',
    field,
    value
  }
}

export function setHistoryGraphData(historyGraphData){
  return {
    type: 'SET_HISTORY_GRAPH_DATA',
    historyGraphData
  }
}

export function requestExchangeValue(){
  return {
    type: 'GET_EXCHANGE_VALUE',
    value : {
      isFetching : true,
      valid : false
    }
  }
}

function recieveExchangeValue(valid, amount) {
  return {
    type: 'RECIEVE_EXCHANGE_VALUE',
    value : {
      isFetching : false,
      valid : valid,
      amount : amount
    }
  }
}

//Thunk exchange API request
export function updateExchange(currency, pivot, amount){
  return (dispatch) => {
    //While resolving request
    dispatch(requestExchangeValue(amount));
    //If currency and pivot are equal, no conversion needed
    if (currency===pivot){
      dispatch(recieveExchangeValue(true, amount));
    }
    else{
      return fetch(`http://api.fixer.io/latest?base=${pivot}`)
        .then(response => response.json())
        .then(json => {
          const valueNumber = +amount * json.rates[currency];
          if (isNaN(valueNumber)){
            dispatch(recieveExchangeValue(false, null));
          }
          //Valid value
          else{
            const value = accounting.formatMoney(valueNumber, '', 2);
            dispatch(recieveExchangeValue(true, value));
          }
        })
    }
  };
}
