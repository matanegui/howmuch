/*
Action creators
*/

export function setCurrency(currency){
  return {
    type: 'SET_CURRENCY',
    currency : currency
  }
}

export function setPivot(currency){
  return {
    type: 'SET_PIVOT',
    currency : currency
  }
}

export function setAmount(amount){
  return {
    type: 'SET_AMOUNT',
    amount : amount
  }
}

export function getExchangeValue(amount, value){
  return {
    type: 'GET_EXCHANGE_VALUE'
  }
}
