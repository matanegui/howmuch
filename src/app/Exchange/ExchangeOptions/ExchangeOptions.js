import React from 'react';
import './ExchangeOptions.css';

export class ExchangeOptions extends React.PureComponent{
    render(){
      return <div className="exchange-rate-options">
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
    }
}
