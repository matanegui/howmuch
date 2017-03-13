import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

export class ExchangeHistory extends React.PureComponent{
  constructor(props){
    super(props);
    this.chartData = [
      {
          name: -10,
          value: 0
      }, {
          name: 0,
          value: 23
      }, {
          name: 10,
          value: 3
      }, {
          name: 0,
          value: 99
      }, {
          name: 0,
          value: 4
      }
    ];
  }
  render(){
    return <LineChart width={600} height={200} data={this.chartData}>
      <XAxis dataKey="name"/>
      <YAxis/>
      <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
      <Line type="monotone" dataKey="name" stroke="#8884d8" />
    </LineChart>
  }
}
