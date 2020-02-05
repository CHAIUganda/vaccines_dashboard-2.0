import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// Views
import { Dashboard } from "./views/Dashboard/index";

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route component={Dashboard} exact path="/" />
      </Switch>
    );
  }
}
