import React from "react";

// Material components
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2, 2),
    height: "100%"
  },
  text: {
    color: "#28354A",
    opacity: "100%",
    fontWeight: theme.typography.fontWeightRegular
  }
}));

const CustomeChartPaper = props => {
  const { children, isLoading, centerTitle, ...rest } = props;

  const classes = useStyles();

  return (
    <React.Fragment>
      <Paper {...rest} className={classes.root}>
        {isLoading ? (
          <div style={{ marginTop: 200, marginLeft: 20 }}>
            <LinearProgress />
            <Typography variant="overline" display="block" gutterBottom>
              Loading data ....
            </Typography>
          </div>
        ) : (
          <>
            <Typography
              component="h3"
              variant="h6"
              gutterBottom
              className={classes.text}
            >
              {centerTitle ? (
                <center>{props.title} </center>
              ) : (
                <> {props.title} </>
              )}
            </Typography>
            <Typography variant="overline" display="block" gutterBottom>
              {props.description} {props.totals}
            </Typography>
            <Typography component="div" style={{ height: 100 }}>
              {props.chart}
            </Typography>
          </>
        )}
      </Paper>
    </React.Fragment>
  );
};

export default CustomeChartPaper;
