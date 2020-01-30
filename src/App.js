import React, { Component } from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

// Routes
import Routes from "./Routes";

// Browser history
const browserHistory = createBrowserHistory();

export default class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Routes />
      </Router>
    );
  }
}
