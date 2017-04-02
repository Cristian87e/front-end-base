import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

export default () => (
  <nav className="nav">
    <Link to="/">Home</Link>
    <Link to="/view-one">View One</Link>
    <Link to="/view-two">View Two</Link>
  </nav>
);
