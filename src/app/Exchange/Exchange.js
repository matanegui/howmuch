import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import './Exchange.css';
import {updateExchangeField} from './Exchange.actions';

export class Exchange extends React.PureComponent{
  //Constructor dispatching setExchange thunk
  render(){
    return (
      <div className="exchange">
        <header className="exchange-section-header"> Cotización actual </header>
        <div className="exchange-rate-section">
          <div className="exchange-rate-options exchange-section__column">

            <div className="exchange-rate-options__option">
              <label htmlFor="currency" className="exchange-label">Moneda</label>
              <select type="text" id="currency" className="exchange-input" value={this.props.currency} onChange={(event) => this.props.onFieldChange(event, 'currency')}>
                {
                  this.props.currencyOptions.map((currencyOption) => {
                    return <option key={currencyOption} value={currencyOption} > {currencyOption} </option>
                  })
                }
              </select>
            </div>

            <div className="exchange-rate-options__option">
              <label htmlFor="pivot"  className="exchange-label">Moneda Pivot</label>
              <select type="text" id="pivot" className="exchange-input" value={this.props.pivot}  onChange={(event) => this.props.onFieldChange(event, 'pivot')}>
                {
                  this.props.currencyOptions.map((currencyOption) => {
                    return <option key={currencyOption} value={currencyOption} > {currencyOption} </option>
                  })
                }
              </select>
            </div>

            <div className="exchange-rate-options__option">
              <label htmlFor="amount"  className="exchange-label">Cantidad</label>
              <input type="number" id="amount" className="exchange-input" min="0" value={this.props.amount} onChange={(event) => this.props.onFieldChange(event, 'amount')} />
            </div>

          </div>
          <div className="exchange-rate exchange-section__column">
            <div className="exchange-rate__sign">
              <p className="exchange-rate__pivot-value"> {this.props.amount} {this.props.pivot} = </p>
              <p className={classNames("exchange-rate__currency-value", {"exchange-rate__currency-value--refreshing" : this.props.value.get('isFetching')})}>  {this.props.value.get('amount')} {this.props.currency}</p>
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
    amount: exchange.get('amount'),
    value: exchange.get('value'),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFieldChange: (event, field) => {
      dispatch(updateExchangeField(field, event.target.value));
    }
  }
}

export const ExchangeContainer = connect(mapStateToProps, mapDispatchToProps)(Exchange);
