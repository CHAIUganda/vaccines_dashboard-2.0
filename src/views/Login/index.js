import React from "react";

// Material components
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { Box } from "@material-ui/core";

import FlagStripImage from "../../common/image/flag-ug.png";

const addr = require("../../env_config").default;

const useStyles = makeStyles(theme => ({
  //   root: {
  //     display: "flex"
  //   },
  title: {
    fontSize: 30
  },
  divRoot: {
    flexGrow: 1
  },
  root: {
    flexGrow: 1
  },
  paper: {
    height: 145
  },
  flagStrip: {
    width: "auto",
    minHeight: "15px",
    backgroundImage: `url(${FlagStripImage})`
  },
  mainBar: {
    height: 100
  },
  courtOfArms: {
    width: 80,
    height: 80,
    marginTop: 10
  },
  map: {
    marginTop: 15,
    width: 80,
    height: 80
  },
  subTitle: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
    fontSize: 16
  },
  margin: {
    margin: theme.spacing(1)
  }
}));

export function Login() {
  const classes = useStyles();
  return (
    <div>
      <CssBaseline />
      <Container
        maxWidth="false"
        disableGutters
        fixed
        style={{
          paddingLeft: 400,
          paddingRight: 400,
          backgroundColor: "white"
        }}
      >
        <div className={classes.divRoot}>
          <Box className={classes.flagStrip}></Box>
        </div>

        <Grid container className={classes.root} spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item>
                <Paper
                  className={classes.paper}
                  style={{ width: 154 }}
                  elevation={0}
                >
                  <Avatar
                    alt="Court of arms"
                    src="/uganda-court-of-arms.jpg"
                    className={classes.courtOfArms}
                  />
                </Paper>
              </Grid>
              <Grid item style={{ paddingLeft: 100 }}>
                <Paper
                  className={classes.paper}
                  style={{ width: 600 }}
                  elevation={0}
                >
                  <Typography variant="h6" className={classes.title}>
                    MINISTRY OF HEALTH: UNEPI DASHBOARD
                  </Typography>
                  <Typography
                    variant="button"
                    display="block"
                    className={classes.subTitle}
                  >
                    REPUBLIC OF UGANDA
                  </Typography>
                </Paper>
              </Grid>
              <Grid item style={{ paddingLeft: 140 }}>
                <Paper
                  elevation={0}
                  className={classes.paper}
                  style={{ width: 100 }}
                >
                  <Avatar
                    alt="Map of Uganda"
                    src="/uganda-flag.png"
                    variant="square"
                    className={classes.map}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className={classes.root} spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item>
                <Paper>
                  <form>
                    <FormControl
                      className={clsx(classes.margin, classes.textField)}
                    >
                      <InputLabel htmlFor="username">Username</InputLabel>
                      <Input id="username" type={"text"} />
                    </FormControl>
                    <FormControl
                      className={clsx(classes.margin, classes.textField)}
                    >
                      <InputLabel htmlFor="password">Password</InputLabel>
                      <Input id="password" type={"password"} />
                    </FormControl>
                  </form>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
