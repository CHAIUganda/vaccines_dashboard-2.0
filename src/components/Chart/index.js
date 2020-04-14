import React, { useState, useMemo } from "react";

// Material components
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    // display: "flex",
    // flexDirection: "column",
    padding: theme.spacing(2, 2),
    height: "100%",
    // justifyContent: "center",
  },
  text: {
    color: "#28354A",
    opacity: "100%",
    fontWeight: "500",
    fontSize: "medium",
  },
}));

const CustomChartPaper = (props) => {
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
    <Paper {...rest} className={classes.root} elevation={elevate}>
      {isLoading ? (
        // <div style={{ marginTop: 200, marginLeft: 20 }}>
        <>
          <LinearProgress />
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
          <Typography
            component="div"
            style={{
              margin: "50px 0px 0px 0px",
            }}
          >
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
  );
};

export default CustomChartPaper;
