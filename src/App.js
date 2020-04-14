import React, { Component } from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { GlobalStateProvider } from "./context/GlobalState";
// Routes
import Routes from "./Routes";

// Browser history
const browserHistory = createBrowserHistory();

export default class App extends Component {
  render() {
    return (
      <GlobalStateProvider>
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </GlobalStateProvider>
    );
  }
}
