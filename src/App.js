import "./App.css";
import "cirrus-ui";

import React, {Component} from "react";

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Register from "./Components/Register";
import Home from "./Components/Home";
import Reserve from "./Components/Reserve";
import Booking from "./Components/Booking";
import Cancel from "./Components/Cancel";

class App extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/reservation" component={Reserve} />
          <Route path="/my_booking" component={Booking} />
          <Route path="/cancel" component={Cancel} />
        </Switch>
      </Router>
    )
  }
}

export default App;
