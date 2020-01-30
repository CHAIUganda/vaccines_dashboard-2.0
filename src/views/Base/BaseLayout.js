import React from "react";

// Material components
import { CssBaseline } from "@material-ui/core";

import { Dashboard } from "../Dashboard/index";

//Component styles
const styles = () => ({
  root: {
    display: "flex"
  }
});

export default function BaseLayout(props) {
  const classes = styles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Dashboard />
    </div>
  );
}
