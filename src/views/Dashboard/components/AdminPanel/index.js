import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import qs from "qs";

// Bring in the global context
import { GlobalContext, port } from "../../../../context/GlobalState";

// Material UI compoents

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import { useStyles } from "../styles";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`data-upload-tabpanel-${index}`}
      aria-labelledby={`data-upload-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `data-upload-tab-${index}`,
    "aria-controls": `data-upload-tabpanel-${index}`,
  };
}

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}))(Tooltip);

const TabStyle = withStyles((theme) => ({
  root: {
    textTransform: "none",
    fontWeight: theme.typography.fontWeightBold,
    fontSize: 12,
    color: "#28354A",
    "&:hover": {
      backgroundColor: "#4E596A",
      color: "white",
      opacity: 1,
    },
    "&$selected": {
      backgroundColor: "#4E596A",
      color: "white",
      fontWeight: theme.typography.fontWeightMedium,
      fontSize: 12,
    },
  },
  selected: {},
}))((props) => <Tab {...props} />);

const useStylesAdminPanel = makeStyles((theme) => ({
  root: {
    display: "flex",
    borderRadius: 5,
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 500,
    flexDirection: "column",
  },

  color: {
    color: "#28354A",
  },

  margin: {
    margin: theme.spacing(1),
  },

  loginContainer: {
    height: 300,
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "column",
    alignItems: "center",
  },

  dataUploadContainer: {
    height: 600,
    display: "flex",
    width: 900,
  },

  // logoutSpan: {
  //   direction: "rtl",
  //   width: 100,
  //   border: "solid 1px black",
  // },
}));

export function AdminPanel() {
  const { loginUser, logoutUser, isAuthenticated, token } = useContext(
    GlobalContext
  );
  const classes = useStylesAdminPanel();
  const globalClasses = useStyles();

  const [value, setValue] = useState(0);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    loginUser(email, password);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    logoutUser(token);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <div style={{ marginTop: 150 }}>
        <h2 style={{ margin: 0, color: "#28354A" }}>
          UNEPI Dashboard Administration
        </h2>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          padding: 40,
          justifyContent: "space-evenly",
        }}
      >
        {isAuthenticated ? (
          <>
            <Paper>
              <div
                style={{
                  padding: 30,
                  // alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                  height: 500,
                }}
              >
                <div
                  style={{
                    marginTop: 10,
                    marginBottom: 30,
                    marginLeft: "auto",
                  }}
                >
                  <form
                    // className={classes.loginContainer}
                    noValidate
                    autoComplete="off"
                    id="logout-form"
                    onSubmit={handleLogout}
                  >
                    <Button variant="outlined" type="submit" form="logout-form">
                      Logout
                    </Button>
                  </form>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "inherit",
                  }}
                >
                  <AppBar
                    position="static"
                    className={classes.appBar}
                    style={{
                      width: "fit-content",
                    }}
                    elevation={0}
                  >
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="Data Upload Tabs"
                      className={globalClasses.tabs}
                      TabIndicatorProps={{
                        style: { backgroundColor: "#4E596A" },
                      }}
                    >
                      <TabStyle
                        {...a11yProps(0)}
                        label={
                          <HtmlTooltip
                            title={
                              <React.Fragment>
                                <Typography color="inherit">
                                  <b>{"Help text goes here"}</b>
                                </Typography>
                              </React.Fragment>
                            }
                            enterDelay={500}
                            leaveDelay={200}
                          >
                            <span>Data Upload Instructions</span>
                          </HtmlTooltip>
                        }
                      />
                      <TabStyle
                        {...a11yProps(1)}
                        label={
                          <HtmlTooltip
                            title={
                              <React.Fragment>
                                <Typography color="inherit">
                                  <b> {"Help text goes here"}</b>
                                </Typography>
                              </React.Fragment>
                            }
                            enterDelay={500}
                            leaveDelay={200}
                          >
                            <span>Coverage Data Upload</span>
                          </HtmlTooltip>
                        }
                      />
                      <TabStyle
                        {...a11yProps(2)}
                        label={
                          <HtmlTooltip
                            title={
                              <React.Fragment>
                                <Typography color="inherit">
                                  <b> {"Help text goes here"}</b>
                                </Typography>
                              </React.Fragment>
                            }
                            enterDelay={500}
                            leaveDelay={200}
                          >
                            <span>Stock Management Data Upload</span>
                          </HtmlTooltip>
                        }
                      />
                      <TabStyle
                        {...a11yProps(2)}
                        label={
                          <HtmlTooltip
                            title={
                              <React.Fragment>
                                <Typography color="inherit">
                                  <b> {"Help text goes here"}</b>
                                </Typography>
                              </React.Fragment>
                            }
                            enterDelay={500}
                            leaveDelay={200}
                          >
                            <span>Cold Chain Data Upload</span>
                          </HtmlTooltip>
                        }
                      />
                      <TabStyle
                        {...a11yProps(2)}
                        label={
                          <HtmlTooltip
                            title={
                              <React.Fragment>
                                <Typography color="inherit">
                                  <b> {"Help text goes here"}</b>
                                </Typography>
                              </React.Fragment>
                            }
                            enterDelay={500}
                            leaveDelay={200}
                          >
                            <span>Performance Management Data Upload</span>
                          </HtmlTooltip>
                        }
                      />
                    </Tabs>
                  </AppBar>
                  <div style={{ marginTop: 20 }}>
                    <TabPanel value={value} index={0}>
                      <span>Data upload Instructions</span>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      <form
                        className={classes.loginContainer}
                        noValidate
                        autoComplete="off"
                        id="login-form"
                        onSubmit={handleLogin}
                      >
                        <TextField
                          id="login_username"
                          label="Email"
                          type="text"
                          variant="outlined"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                          id="login_password"
                          label="Password"
                          type="password"
                          variant="outlined"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                          variant="outlined"
                          type="submit"
                          form="login-form"
                        >
                          Login
                        </Button>
                      </form>
                    </TabPanel>
                  </div>
                </div>
              </div>
              {/* <form
                className={classes.loginContainer}
                noValidate
                autoComplete="off"
                id="logout-form"
                onSubmit={handleLogout}
              >
                <Button variant="outlined" type="submit" form="logout-form">
                  Logout
                </Button>
              </form> */}
            </Paper>
          </>
        ) : (
          <Paper>
            <form
              className={classes.loginContainer}
              noValidate
              autoComplete="off"
              id="login-form"
              onSubmit={handleLogin}
            >
              <TextField
                id="login_username"
                label="Email"
                type="text"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                id="login_password"
                label="Password"
                type="password"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant="outlined" type="submit" form="login-form">
                Login
              </Button>
            </form>
          </Paper>
        )}
      </div>
    </div>
  );
}
