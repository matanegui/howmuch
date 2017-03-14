import React from 'react';
import './HistoryOptions.css';
import moment from 'moment';

export class HistoryOptions extends React.PureComponent{
  render(){
    return <div className="exchange-rate-options">
      <div className="exchange-rate-options__option">
        <label htmlFor="startDate" className="exchange-label">Fecha Inicio</label>
        <input type="date" id="startDate" className="exchange-input" value={this.props.startDate} onChange={(event) => this.props.onFieldChange(event, 'startDate')} />
      </div>

      <div className="exchange-rate-options__option">
        <label htmlFor="endDate"  className="exchange-label">Fecha Fin</label>
        <input type="date" id="endDate" className="exchange-input" value={this.props.endDate} onChange={(event) => this.props.onFieldChange(event, 'endDate')}  min={this.props.startDate}/>
      </div>

      <div className="exchange-rate-options__option">
        <button className="exchange-button" disabled={!moment(this.props.startDate).isValid() || !moment(this.props.endDate).isValid()} onClick={(event) => this.props.onGraphDatesChange(this.props.startDate, this.props.endDate)}> Actualizar gráfico </button>
      </div>

    </div>
  }
}
