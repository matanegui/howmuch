import React from 'react';
import { ResponsiveContainer,LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import './ExchangeChart.css';

export class ExchangeChart extends React.PureComponent{
  render(){
    return  <div className="chart-container">
      <label htmlFor="historyChart" className="history-label">Cotización histórica (valor de 1 {this.props.pivot} en {this.props.currency})</label>
      {
        !this.props.historyGraph.get('isFetching') && this.props.historyGraph.get('data').toJS().length===0 ? (
          <div className="chart-container__message-container">
            <h3 className="chart-container__invalid-data-message">
              ¡Rango de fechas inválido! Verifique que la fecha inicial no sea posterior
              a la fecha final.
            </h3>
          </div>
        ) : (
          <ResponsiveContainer width="90%" height={200} id="historyChart">
            <LineChart data={this.props.historyGraph.get('data').toJS()}>
              <XAxis dataKey="date" />
              <YAxis domain={['dataMin', 'dataMax']} padding={{ top: 30, bottom: 30 }}/>
              <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        )
      }
    </div>
  }
}
