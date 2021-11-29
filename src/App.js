import "./App.css";
import "cirrus-ui";

import React, {Component} from "react";

import {Route, Switch} from "react-router-dom";
import Register from "./Components/Register";
import Home from "./Components/Home";
import Reserve from "./Components/Reserve";
import UserInformation from "./Components/UserInformation";
import Login from "./Components/Login";
import {AuthProvider} from "./Components/Auth";
import Site from "./Components/Site";

class App extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/registration" component={Register} />
          <Route exact path="/reservation" component={Reserve} />
          <Route exact path="/info" component={UserInformation} />
          <Route exact path="/site" component={Site} />
        </Switch>
      </AuthProvider>
    )
  }
}

export default App;
