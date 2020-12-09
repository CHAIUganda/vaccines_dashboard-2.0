import React from "react";

// Material components
import { CssBaseline } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import Header from "./Header";

import ProximaNovaRegularWoff from "../../common/fonts/Proxima-Nova-Bold.woff";

//Component styles
const styles = () => ({
  root: {
    display: "flex",
  },
});

export default function BaseLayout(props) {
  const classes = styles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header
        onChange={props.onChange}
        value={props.value}
        content={props.children}
      />
    </div>
  );
}
