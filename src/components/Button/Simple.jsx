import React, { Component, PropTypes } from 'react';

import './style.css';

export default class CheckboxWithLabel extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    children: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);

    this.onPress = this.props.onPress.bind(this);
  }

  render() {
    return (
      <button
        className="button button--simple"
        onClick={this.onPress}
      >
        {this.props.children}
      </button>
    );
  }
}
