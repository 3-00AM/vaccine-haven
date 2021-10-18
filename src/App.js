import "./App.css";
import "cirrus-ui";

import React, {Component} from "react";

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Register from "./Component/Register";
import Home from "./Component/Home";

class App extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />,
          <Route path="/register" component={Register} />
        </Switch>
      </Router>
    )
  }
}

export default App;
