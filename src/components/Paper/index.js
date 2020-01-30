import React from "react";

// Material components
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

// Material icons
import {
  ArrowDownward as ArrowDownwardIcon,
  ArrowUpward as ArrowUpwardIcon
} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  },
  percentage: {
    flex: 1
  },
  percentageIndicator: {
    paddingTop: 10
  }
}));

const CustomPaper = props => {
  const { children, ...rest } = props;

  const classes = useStyles();

  return (
    <Paper {...rest} className={classes.root}>
      <Typography component="h2" variant="h6" color="seconday" gutterBottom>
        {props.title}
      </Typography>
      <Typography component="p" variant="h4">
        {props.value}
      </Typography>
      <Typography color="textSecondary" className={classes.percentage}>
        {props.difference > 0 ? (
          <ArrowDownwardIcon
            color="secondary"
            className={classes.percentageIndicator}
          />
        ) : props.difference < 0 ? (
          <ArrowUpwardIcon className={classes.percentageIndicator} />
        ) : (
          <i />
        )}
        {props.difference && props.difference}%
      </Typography>
    </Paper>
  );
};

export default CustomPaper;
