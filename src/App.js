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

class App extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/registration" component={Register} />
          <Route exact path="/info" component={UserInformation} />
          {/* <Route exact path="/info/:citizen_id" component={UserInformation}/> */}
          <Route exact path="/reservation" component={Reserve} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </AuthProvider>
    )
  }
}

export default App;
