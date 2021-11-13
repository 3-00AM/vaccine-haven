import "./App.css";
import "cirrus-ui";

import React, {Component} from "react";

import {Route, Switch} from "react-router-dom";
import Register from "./Components/Register";
import Home from "./Components/Home";
import Reserve from "./Components/Reserve";
import Info from "./Components/Info";
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
          <Route exact path="/info" component={Info} />
          <Route path="/info/:citizen_id" component={UserInformation} />
        </Switch>
    )
  }
}

export default App;
