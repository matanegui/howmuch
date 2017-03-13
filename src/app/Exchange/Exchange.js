import React from 'react';
import {connect} from 'react-redux';
import {updateExchangeField} from './Exchange.actions';
import {ExchangeOptions} from './ExchangeOptions/ExchangeOptions';
import {ExchangeDisplay} from './ExchangeDisplay/ExchangeDisplay';
import './Exchange.css';

export class Exchange extends React.PureComponent{
  //Constructor dispatching setExchange thunk
  render(){
    return (
      <div className="exchange">
        <header className="exchange-section-header"> Cotización actual </header>
        <div className="exchange-rate-section">
          <div className="exchange-section__column exchange-section__column--1quarter">
            <ExchangeOptions
              currency = {this.props.currency}
              pivot = {this.props.pivot}
              amount = {this.props.amount}
              currencyOptions = {this.props.currencyOptions}
              onFieldChange = {this.props.onFieldChange}
            />
          </div>
          <div className="exchange-rate exchange-section__column exchange-section__column--3quarter">
            <ExchangeDisplay
              currency = {this.props.currency}
              pivot = {this.props.pivot}
              amount = {this.props.amount}
              value = {this.props.value}
            />
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
