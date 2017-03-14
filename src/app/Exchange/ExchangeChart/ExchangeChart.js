import React from 'react';
import { ResponsiveContainer,LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import './ExchangeChart.css';

export class ExchangeChart extends React.PureComponent{
  render(){
    return  <div className="graph">
      <label htmlFor="historyChart" className="history-label">Cotización histórica (valor de 1 {this.props.pivot} en {this.props.currency})</label>
      <ResponsiveContainer width="90%" height={200} id="historyChart">
        <LineChart data={this.props.historyGraphData.toJS()}>
          <XAxis dataKey="date" />
          <YAxis domain={['dataMin', 'dataMax']} padding={{ top: 30, bottom: 30 }}/>
          <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  }
}
