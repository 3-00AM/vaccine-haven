import "./App.css";
import "cirrus-ui";

import React, {Component} from "react";

import {Route, Switch} from "react-router-dom";
import Register from "./Components/Register";
import Home from "./Components/Home";
import Reserve from "./Components/Reserve";
import Citizen from "./Components/Citizen";
import Cancel from "./Components/Cancel";
import UserInformation from "./Components/UserInformation";

class App extends Component {

  componentDidMount() {
  }

  render() {
    return (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/registration" component={Register} />
          <Route path="/reservation" component={Reserve} />
          <Route exact path="/citizen" component={Citizen} />
          <Route path="/citizen/:citizen_id" component={UserInformation} />
          <Route path="/citizen/cancel" component={Cancel} />
        </Switch>
    )
  }
}

export default App;
