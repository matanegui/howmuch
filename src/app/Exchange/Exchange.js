import React from 'react';
import {connect} from 'react-redux';
import {updateExchangeField, updateHistoryOption} from './Exchange.actions';
import {ExchangeOptions} from './ExchangeOptions/ExchangeOptions';
import {ExchangeDisplay} from './ExchangeDisplay/ExchangeDisplay';
import {HistoryOptions} from './HistoryOptions/HistoryOptions';
import {ExchangeChart} from './ExchangeChart/ExchangeChart';
import './Exchange.css';

export class Exchange extends React.PureComponent{
  render(){
    return (
      <div className="exchange">
        <section className="exchange-section">
          <header className="exchange-section__header"> Cotización actual </header>
          <div className="exchange-columns">
            <div className="exchange-columns__column exchange-columns__column--1quarter">
              <ExchangeOptions
                currency={this.props.currency}
                pivot={this.props.pivot}
                amount={this.props.amount}
                currencyOptions={this.props.currencyOptions}
                onFieldChange={this.props.onFieldChange}
              />
            </div>
            <div className="exchange-rate exchange-columns__column exchange-columns__column--3quarter">
              <ExchangeDisplay
                currency={this.props.currency}
                pivot={this.props.pivot}
                amount={this.props.amount}
                value={this.props.value}
              />
            </div>
          </div>
        </section>
        <section className="exchange-section">
          <header className="exchange-section__header"> Cotización histórica</header>
            <div className="exchange-columns">
              <div className="exchange-columns__column exchange-columns__column--1quarter">
                <HistoryOptions
                  startDate={this.props.historyOptions.get('startDate')}
                  endDate={this.props.historyOptions.get('endDate')}
                  onFieldChange={this.props.onHistoryOptionChange}
                />
              </div>
              <div className="exchange-columns__column exchange-columns__column--3quarter">
                <ExchangeChart
                  currency={this.props.currency}
                  pivot={this.props.pivot}
                  historyGraph={this.props.historyGraph}
                />
              </div>
            </div>
        </section>
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
    historyOptions: exchange.get('historyOptions'),
    historyGraph: exchange.get('historyGraph')
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFieldChange: (event, field) => {
      dispatch(updateExchangeField(field, event.target.value));
    },
    onHistoryOptionChange: (event, field) => {
      dispatch(updateHistoryOption(field, event.target.value));
    }
  }
}

export const ExchangeContainer = connect(mapStateToProps, mapDispatchToProps)(Exchange);
