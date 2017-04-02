/**
 * Root Component
 */
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

// Import Routes
import './styles.css';
import Links from '../components/Links';
import Dashboard from './Dashboard';
import ViewOne from './ViewOne';

const AppRouter = () => (
  <Router>
    <div className="app">
      <Links />
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/view-one" component={ViewOne} />
        <Redirect to="/" />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
