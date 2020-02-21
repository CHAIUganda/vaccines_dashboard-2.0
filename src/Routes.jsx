import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// Views
import { Dashboard } from "./views/Dashboard/index";
import { Login } from "./views/Login/index";

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route component={Dashboard} exact path="/" />
        <Route component={Login} exact path="/login" />
      </Switch>
    );
  }
}
