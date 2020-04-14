import React from "react";

// Material components
import { CssBaseline } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

// import Sidebar from "./Sidebar";
import Header from "./Header";

// import ProximaNovaBoldWoff from "../../common/fonts/Proxima-Nova-Bold.woff";
import ProximaNovaRegularWoff from "../../common/fonts/Proxima-Nova-Bold.woff";

//Component styles
const styles = () => ({
  root: {
    display: "flex",
  },
});

// Global Font

const proximaNovaBold = {
  fontFamily: "Proxima Nova",
  fontStyle: "normal",
  fontDisplay: "swap",
  fontWeight: 100,
  src: `
    local('Proxima-Nova'),
    local('Proxima-Nova'),
    url(${ProximaNovaRegularWoff}) format('woff')
  `,
  // unicodeRange:
  //   "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
};

export default function BaseLayout(props) {
  const classes = styles();

  const theme = createMuiTheme({
    typography: {
      fontFamily: "Proxima Nova, Arial",
    },
    overrides: {
      MuiCssBaseline: {
        "@global": {
          "@font-face": [proximaNovaBold],
        },
      },
    },
  });

  return (
    // <ThemeProvider theme={theme}>
    <div className={classes.root}>
      <CssBaseline />
      <Header
        onChange={props.onChange}
        value={props.value}
        content={props.children}
      />
    </div>
    // </ThemeProvider>
  );
}
