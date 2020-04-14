import React, { useState, useMemo } from "react";

// Material components
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2, 2),
    height: "100%",
  },
  text: {
    color: "#28354A",
    opacity: "100%",
    fontWeight: "500",
    fontSize: "medium",
  },
}));

const CustomeChartPaper = (props) => {
  const {
    children,
    isLoading,
    centerTitle,
    chartData,
    elevate,
    ...rest
  } = props;

  // Used to store state of the series chart data.
  // If empty, means no data and we render appropriate message
  const [dataState, setDataState] = useState();
  useMemo(() => {
    if (chartData && chartData)
      setDataState(
        chartData.series === undefined ||
          chartData.series.length === 0 ||
          chartData.series[0].length === 0
      );
  }, [chartData]);

  const classes = useStyles();

  return (
    <React.Fragment>
      <Paper {...rest} className={classes.root} elevation={elevate}>
        {isLoading ? (
          // <div style={{ marginTop: 200, marginLeft: 20 }}>
          <>
            <LinearProgress style={{ margin: "auto" }} />
            <Typography variant="overline" display="block" gutterBottom>
              Loading data ....
            </Typography>
          </>
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
            <Typography component="div">
              {dataState ? (
                <p
                  style={{
                    float: "inherit",
                    textAlign: "center",
                    fontSize: 20,
                    color: "red",
                  }}
                >
                  No Data Available
                </p>
              ) : (
                <>{props.chart}</>
              )}
            </Typography>
          </>
        )}
      </Paper>
    </React.Fragment>
  );
};

export default CustomeChartPaper;
