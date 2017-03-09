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

export function setExchangeField(field, value){
  return {
    type: 'SET_EXCHANGE_FIELD',
    field,
    value
  }
}

export function requestExchangeValue(amount){
  return {
    type: 'GET_EXCHANGE_VALUE',
    value : {
      isFetching : true,
      valid : false,
      amount : amount
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
    //Return API call promise
    return fetch(`http://api.fixer.io/latest?base=${pivot}`)
      .then(response => response.json())
      .then(json => {
        console.log(amount);
        console.log(+amount*json.rates[currency]);
        const value = +amount * json.rates[currency];
        //Invalid value
        if (isNaN(value)){
          dispatch(recieveExchangeValue(false, null));
        }
        //Valid value
        else{
          dispatch(recieveExchangeValue(true, value));
        }
      })
  };
}
