import React from 'react';
import history from './history';
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';
import { Router, Route, Switch } from 'react-router-dom';
import "./index.css";

// Pages
import NoMatchPage from "./pages/noMatchPage";
import Login from "./pages/UserAuth/Login";
import Register from "./pages/UserAuth/Register";
import Home from "./pages/Home/home";
import Account from "./pages/Account/account";


function App() {
  return (
    <Router history={history}>
      <Switch>
        <UnPrivateRoute path="/login" component={Login} />
        <UnPrivateRoute path="/register" component={Register} />
        <Route exact path="/" component={Home} />
        <PrivateRoute path="/account" component={Account} />
        <Route path="/" component={NoMatchPage} />
      </Switch>
    </Router>
  );
}

export default App;
