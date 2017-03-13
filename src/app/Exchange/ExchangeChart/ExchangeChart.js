import React from 'react';
import { ResponsiveContainer,LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import './ExchangeChart.css';

export class ExchangeChart extends React.PureComponent{
  render(){
    return  <div className="graph">
      <ResponsiveContainer width="90%" height={200}>
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
