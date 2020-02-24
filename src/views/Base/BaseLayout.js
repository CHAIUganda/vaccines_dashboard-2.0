import React from "react";

// Material components
import { CssBaseline } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { Box } from "@material-ui/core";

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
      <Header onChange={props.onChange} value={props.value} />
      <Box component="span" m={1}>
        <Container
          maxWidth={false}
          disableGutters
          fixed
          style={{
            paddingLeft: 100,
            paddingRight: 100,
            backgroundColor: "#F5F5F5"
          }}
        >
          {props.children}
        </Container>
      </Box>
    </div>
  );
}
