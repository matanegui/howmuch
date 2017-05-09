import React from 'react';
import './HistoryOptions.css';

export class HistoryOptions extends React.PureComponent{
  render(){
    return <div className="exchange-rate-options">
      <div className="exchange-rate-options__option">
        <label htmlFor="startDate" className="exchange-label">Fecha Inicio</label>
        {/*The 'min' atribute for startrDate is set to 01-01-1999 since that's the first day
        the fixer.io exchange API has information about.*/}
        <input type="date" id="startDate" className="exchange-input" value={this.props.startDate} onChange={(event) => this.props.onFieldChange(event, 'startDate')} min="1999-01-01" />
      </div>

      <div className="exchange-rate-options__option">
        <label htmlFor="endDate"  className="exchange-label">Fecha Fin</label>
        <input type="date" id="endDate" className="exchange-input" value={this.props.endDate} onChange={(event) => this.props.onFieldChange(event, 'endDate')}  min={this.props.startDate}/>
      </div>

    </div>
  }
}
