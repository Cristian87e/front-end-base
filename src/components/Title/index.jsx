import React, { PropTypes } from 'react';

import Fogata from 'assets/images/fogata.png';
import './styles.css';

const Title = props => (
  <h3 className="title">
    <img className="image-fireplace" src={Fogata} alt="A fireplace" />
    <span>{props.children}</span>
  </h3>
);

Title.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Title;
