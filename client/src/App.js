import React from 'react';
import history from './history';
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';
import { Router, Route, Switch } from 'react-router-dom';

// Pages
import NoMatchPage from "./pages/noMatchPage";
import Home from "./pages/Home/Home";
import Account from "./pages/Account/Account";

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute path="/account" component={Account} />
        <Route path="/" component={NoMatchPage} />
      </Switch>
    </Router>
  );
}

export default App;
