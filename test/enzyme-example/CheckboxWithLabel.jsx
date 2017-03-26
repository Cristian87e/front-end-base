// CheckboxWithLabel.js

import React, { PropTypes } from 'react';

import './style.css';

export default class CheckboxWithLabel extends React.Component {
  static propTypes = {
    labelOn: PropTypes.string.isRequired,
    labelOff: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
    };

    // bind manually because React class components don't auto-bind
    // http://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#autobinding
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    this.setState({ isChecked: !this.state.isChecked });
  }

  render() {
    return (
      <div>
        <input
          id="in"
          name="in"
          type="checkbox"
          checked={this.state.isChecked}
          onChange={this.onChange}
        />
        <label className="test" htmlFor="in">
          {this.state.isChecked ? this.props.labelOn : this.props.labelOff}
        </label>
      </div>
    );
  }
}
