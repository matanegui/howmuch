import React from 'react';
import {connect} from 'react-redux';
import './Exchange.css';
import {setCurrency, setPivot, setAmount} from './Exchange.actions';

export class Exchange extends React.PureComponent{
  render(){
    return (
      <div className="exchange">
        <div className="exchange-rate-section">
          <div className="exchange-rate-options exchange-section__column">

            <div className="exchange-rate-options__option">
              <label htmlFor="currency" className="exchange-label">Moneda</label>
              <select type="text" id="currency" className="exchange-input" value={this.props.currency} onChange={this.props.onCurrencyChange}>
                {
                  this.props.currencyOptions.map((currencyOption) => {
                    return <option key={currencyOption} value={currencyOption} > {currencyOption} </option>
                  })
                }
              </select>
            </div>

            <div className="exchange-rate-options__option">
              <label htmlFor="pivot"  className="exchange-label">Moneda Pivot</label>
              <select type="text" id="pivot" className="exchange-input" value={this.props.pivot}  onChange={this.props.onPivotChange}>
                {
                  this.props.currencyOptions.map((currencyOption) => {
                    return <option key={currencyOption} value={currencyOption} > {currencyOption} </option>
                  })
                }
              </select>
            </div>

            <div className="exchange-rate-options__option">
              <label htmlFor="amount"  className="exchange-label">Cantidad</label>
              <input type="number" id="amount" className="exchange-input" min="0" value={this.props.amount} onChange={this.props.onAmountChange}/>
            </div>

          </div>
          <div className="exchange-rate exchange-section__column">
            <div className="exchange-rate__sign">
              <p className="exchange-rate__pivot-value"> 1 euro = </p>
              <p className="exchange-rate__currency-value">  {this.props.amount}</p>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  const exchange = state.exchange;
  return {
    currencyOptions: exchange.get('currencyOptions'),
    currency: exchange.get('currency'),
    pivot: exchange.get('pivot'),
    amount: exchange.get('amount')
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCurrencyChange: (event) => {
      dispatch(setCurrency(event.target.value));
    },
    onPivotChange: (event) => {
      dispatch(setPivot(event.target.value));
    },
    onAmountChange: (event) => {
      dispatch(setAmount(event.target.value));
    }
  }
}

export const ExchangeContainer = connect(mapStateToProps, mapDispatchToProps)(Exchange);
