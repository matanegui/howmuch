import React from 'react';
import './Exchange.css';

class Exchange extends React.PureComponent{
  render(){
    return (
      <div className="exchange">
        <div className="exchange-rate-section">
          <div className="exchange-rate-options exchange-section__column">

            <div className="exchange-rate-options__option">
              <label htmlFor="currency" className="exchange-label">Moneda</label>
              <select type="text" id="currency" className="exchange-input">
                <option> EUR </option>
              </select>
            </div>

            <div className="exchange-rate-options__option">
              <label htmlFor="pivot"  className="exchange-label">Moneda Pivot</label>
              <select type="text" id="pivot" className="exchange-input">
                <option> US$ </option>
              </select>
            </div>

            <div className="exchange-rate-options__option">
              <label htmlFor="amount"  className="exchange-label">Cantidad</label>
              <input type="number" id="amount" className="exchange-input" min="0" defaultValue="1"/>
            </div>

          </div>
          <div className="exchange-rate exchange-section__column">
            <div className="exchange-rate__sign">
              <p className="exchange-rate__pivot-value"> 1 euro = </p>
              <p className="exchange-rate__currency-value"> 1.05 US dollars</p>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default Exchange;
