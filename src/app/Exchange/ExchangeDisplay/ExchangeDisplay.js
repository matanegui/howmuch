import React from 'react';
import classNames from 'classnames';
import './ExchangeDisplay.css';

export class ExchangeDisplay extends React.PureComponent{
    render(){
      return <div className="exchange-rate__sign">
        <p className="exchange-rate__pivot-value"> {this.props.amount} {this.props.pivot} = </p>
        <p className={classNames("exchange-rate__currency-value", {"exchange-rate__currency-value--refreshing" : this.props.value.get('isFetching')})}>  {this.props.value.get('amount')} {this.props.currency}</p>
      </div>
    }
}
