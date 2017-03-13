import accounting from 'accounting';
/*
Action creators
*/

export function updateExchangeField(field, value){
  return (dispatch, getState) => {
    dispatch(setExchangeField(field,value));
    const updatedExchange = getState().exchange;
    dispatch(updateExchange(updatedExchange.get('currency'),updatedExchange.get('pivot'),updatedExchange.get('amount')));
  };
}

export function updateHistoryOption(field, value){
  return (dispatch, getState) => {
    dispatch(setHistoryOption(field,value));
    //Todo: update history EP call
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
