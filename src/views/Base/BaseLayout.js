import React from "react";

// Material components
import { CssBaseline } from "@material-ui/core";

// import Sidebar from "./Sidebar";
import Header from "./Header";

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
      <Header
        onChange={props.onChange}
        value={props.value}
        content={props.children}
      />
    </div>
  );
}
