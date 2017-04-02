import React, { PropTypes } from 'react';

import './styles.css';

const Title = props => (
  <h3 className="title">{props.children}</h3>
);

Title.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Title;
