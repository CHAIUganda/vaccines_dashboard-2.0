import React, { useState } from "react";

// Material components
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary
  },

  header: {
    textAlign: "left",
    letterSpacing: 0,
    opacity: 1
    // font: "Proxima Nova"
  }
}));

export function OverviewPanel() {
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography component="div">
            <Box fontSize={24} m={1} className={classes.header}>
              Immunization Performance Report
            </Box>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
