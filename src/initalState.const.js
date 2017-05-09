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

const INITIAL_EXCHANGE_STATE =  {
  currencyOptions : CURRENCIES,
  currency : 'USD',
  pivot : 'EUR',
  amount : 1,
  value : {
    isFetching : false,
    valid : true,
    amount : 1
  },
  historyOptions : {
    startDate : '2017-02-09',
    endDate : '2017-02-22'
  },
  historyGraph : {
    data : [
      {
          date: "2016-01-29",
          value: 1.29
      }, {
          date: "2016-01-30",
          value: 1.34
      }, {
          date: "2016-01-31",
          value: 1.27
      }, {
          date: "2016-02-01",
          value: 1.26
      }, {
          date: "2016-02-02",
          value: 1.18
      }
    ],
    isFetching : false
  }
};

export default INITIAL_EXCHANGE_STATE;
