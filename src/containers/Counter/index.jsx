import React, { Component } from 'react';

import './styles.css';

class Counter extends Component {
  state = {
    value: 0,
  }
  calculate = function (calc) {
    let result = 0;

    switch (calc) {
      case '+':
        result = this.state.value + 1;
        break;
      case '-':
        result = this.state.value - 1;
        break;
      default:
        result = 0;
    }
    this.setState({ value: result });
  };

  render() {
    return (
      <div className="counter">
        <h3>Counter</h3>
        <input className="display" value={this.state.value} />
        <div className="actions">
          <button onClick={() => this.calculate('+')}>Incrementar</button>
          <button onClick={() => this.calculate('-')}>Decrementar</button>
        </div>
      </div>
    );
  }
}

export default Counter;
