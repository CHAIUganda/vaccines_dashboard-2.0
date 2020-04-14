import React from "react";

// Material components
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";

// import LocalConvenienceStoreIcon from "@material-ui/icons/LocalConvenienceStore";

import { ColdChainIcon } from "../../icons/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2, 2),
    height: "auto",
  },
  text: {
    color: "#28354A",
    opacity: "100%",
    fontWeight: 400,
    float: "left",
  },
  metric: {
    color: "#28354A",
    fontSize: 40,
    float: "left",
    marginBottom: "-20px",
    letterSpacing: "inherit",
  },
  icon: {
    color: "#6F85FC",
    marginTop: 35,
    marginRight: 10,
    overflow: "visible",
    opacity: 0.5,
    fontSize: 44,
  },
  metricSubtitle: {
    fontSize: "initial",
    marginTop: "-40px",
    marginLeft: "3px",
    color: "blue",
  },

  metricTypeNeg: {
    color: "red",
    fontWeight: 700,
  },

  metricTypePos: {
    color: "green",
    fontWeight: 700,
  },
}));

const CustomCardPaper = (props) => {
  const { children, isLoading, chartData, showPercentage, ...rest } = props;

  const classes = useStyles();

  return (
    <React.Fragment>
      <Paper {...rest} className={classes.root}>
        {isLoading ? (
          <div style={{ height: 168, marginLeft: 20 }}>
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
              <> {props.title} </>
            </Typography>
            <Typography component="div">
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Typography
                    variant="overline"
                    display="block"
                    className={
                      props.metric2 === undefined ? classes.metric : ""
                    }
                  >
                    <Grid container spacing={1}>
                      {props.metric2 === undefined ? (
                        <>
                          <Grid
                            item
                            xs={12}
                            className={
                              props.metricType === "capacity_neg"
                                ? classes.metricTypeNeg
                                : props.metricType === "capacity_pos"
                                ? classes.metricTypePos
                                : ""
                            }
                          >
                            {props.metric}
                            {showPercentage ? <>%</> : <> </>}
                          </Grid>
                        </>
                      ) : (
                        <>
                          <Grid item xs={6} className={classes.metric}>
                            <Grid
                              container
                              direction="column"
                              justify="space-evenly"
                              alignItems="flex-start"
                            >
                              <Grid item>
                                {props.metric}
                                {showPercentage ? <>%</> : <> </>}
                              </Grid>
                              <Grid item className={classes.metricSubtitle}>
                                DVS
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={6} className={classes.metric}>
                            <Grid
                              container
                              direction="column"
                              justify="space-evenly"
                              alignItems="flex-start"
                            >
                              <Grid item>
                                {props.metric2}
                                {showPercentage ? <>%</> : <> </>}
                              </Grid>
                              <Grid item className={classes.metricSubtitle}>
                                HF
                              </Grid>
                            </Grid>
                          </Grid>
                        </>
                      )}
                    </Grid>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <ColdChainIcon className={classes.icon} />
                </Grid>
              </Grid>
            </Typography>
          </>
        )}
      </Paper>
    </React.Fragment>
  );
};

export default CustomCardPaper;
