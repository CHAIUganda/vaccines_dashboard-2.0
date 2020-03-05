import React from "react";

// Material components
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";

import LocalConvenienceStoreIcon from "@material-ui/icons/LocalConvenienceStore";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2, 2)
    // height: "50%"
  },
  text: {
    color: "#28354A",
    opacity: "100%",
    fontSize: "xx-large",
    float: "left"
  },
  metric: {
    color: "#28354A",
    fontSize: 40,
    fontWeight: "bolder",
    float: "left",
    marginTop: "-30px",
    marginBottom: "-20px"
  },
  icon: {
    color: "#6F85FC",
    fontSize: 60,
    float: "right",
    marginTop: 20,
    marginRight: 10
  }
}));

const CustomCardPaper = props => {
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
                <Grid item xs={7}>
                  <Typography
                    variant="overline"
                    display="block"
                    className={classes.metric}
                  >
                    {props.metric}
                    {showPercentage ? <>%</> : <> </>}
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <LocalConvenienceStoreIcon className={classes.icon} />
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
