const CURRENCIES = [
    "AUD",
    "BGN",
    "BRL",
    "CAD",
    "CHF",
    "CNY",
    "CZK",
    "DKK",
    "EUR",
    "GBP",
    "HKD",
    "HRK",
    "HUF",
    "IDR",
    "ILS",
    "INR",
    "JPY",
    "KRW",
    "MXN",
    "MYR",
    "NOK",
    "NZD",
    "PHP",
    "PLN",
    "RON",
    "RUB",
    "SEK",
    "SGD",
    "THB",
    "TRY",
    "USD",
    "ZAR"
];

const INITIAL_STATE =  {
  currencyOptions : CURRENCIES,
  currency : 'USD',
  pivot : 'EUR',
  amount : 1,
  value : {
    isFetching : false,
    valid : true,
    amount : 1
  }
};

export default INITIAL_STATE;
