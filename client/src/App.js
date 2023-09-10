import React from 'react';
import history from './history';
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Pages
import NoMatchPage from "./pages/NoMatchPage";
import Home from "./pages/Home/Home";
import Projects from "./pages/Projects/Projects";
import Account from "./pages/Account/Account";
import Create from './pages/Create/Create';
import ProjectPage from './pages/ProjectPage/ProjectPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/projects" component={Projects} />
        <Route exact path="/create" component={Create} />
        <Route exact path="/project/:projectId" component={ProjectPage} />
        <PrivateRoute path="/account" component={Account} />
        <Route path="/" component={NoMatchPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
