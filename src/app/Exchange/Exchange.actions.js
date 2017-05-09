import accounting from 'accounting';
import Moment from 'moment';
import {fromJS} from 'immutable';
import {extendMoment} from 'moment-range';

// Extend 'moment' to support ranges using moment-range
const moment = extendMoment(Moment);

export function updateExchangeField(field, value){
  return (dispatch, getState) => {
    dispatch(setExchangeField(field,value));
    const updatedExchange = getState().exchange;
    //Update exchange data
    dispatch(updateExchange(updatedExchange.get('currency'),updatedExchange.get('pivot'),updatedExchange.get('amount')));
    //Update graph
    if (field!=='amount'){
      dispatch(updateHistoryChart(updatedExchange.getIn(['historyOptions','startDate']),updatedExchange.getIn(['historyOptions','endDate'])));
    }
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
    dispatch(fetchHistoryGraphData());
    //Build date range array from startDate and endDate
    const startDateMoment = moment(startDate, 'YYYY-MM-DD');
    const endDateMoment = moment(endDate, 'YYYY-MM-DD');
    if (startDateMoment.isBefore(endDateMoment)){
      const differenceInDays = moment.duration(endDateMoment.diff(startDateMoment)).asDays();
      const range = moment.range(startDateMoment, endDateMoment);
      let rangeDays = null;
      /*
      The dates in the ranges must be built considering that too many dates mean
      too many calls to the API; on too many request the API will respond to calls
      with a 429 errors. Thus, if the difference between the start and end
      dates is less than a month, the range is built using each day between the two
      dates. If it's less than a year, a day is used for each week between the dates;
      if it's less than 5 years, a day is using for each month between the dates;
      otherwise a day for each year is used.
      */
      if (differenceInDays <= 30){
        rangeDays = Array.from(range.by('day'));
      }
      else if (differenceInDays <= 365){
        rangeDays = Array.from(range.by('week'));
      }
      else if (differenceInDays <= 1825){
        rangeDays = Array.from(range.by('month'));
      }
      else {
        rangeDays = Array.from(range.by('year'));
      }
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
        const historyGraphObj = fromJS({
          isFetching : false,
          data : historyGraphData
        });
        dispatch(setHistoryGraphData(historyGraphObj));
      })
    }
    else{
      const historyGraphObj = fromJS({
        isFetching : false,
        data : []
      });
      dispatch(setHistoryGraphData(historyGraphObj));
    }

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

export function fetchHistoryGraphData(){
  const historyGraphData = fromJS({
    data : [],
    isFetching : true
  });
  return {
    type: 'SET_HISTORY_GRAPH_DATA',
    historyGraphData : historyGraphData
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

function setExchangeValue(valid, amount) {
  return {
    type: 'SET_EXCHANGE_VALUE',
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
      dispatch(setExchangeValue(true, amount));
    }
    else{
      return fetch(`http://api.fixer.io/latest?base=${pivot}`)
        .then(response => response.json())
        .then(json => {
          const valueNumber = +amount * json.rates[currency];
          if (isNaN(valueNumber)){
            dispatch(setExchangeValue(false, null));
          }
          //Valid value
          else{
            const value = accounting.formatMoney(valueNumber, '', 2);
            dispatch(setExchangeValue(true, value));
          }
        })
    }
  };
}
