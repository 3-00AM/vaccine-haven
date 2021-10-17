import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import App from './App'
import history from "./history";
import Register from './Register'

export default class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/Register" component={Register} />
        </Switch>
      </Router>
    )
  }
}