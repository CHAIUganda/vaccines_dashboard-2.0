import React from "react";

// Material components
import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

// Custom components
import UptakeRateChart from "./UptakeRateChart/index";
import DistrictStockTrendsChart from "./DistrictStockTrendsChart/index";

// Import common styles
import { useStyles } from "../../../styles";

export default function UptakeRateAndDistrictStockTrends({ tab }) {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.paper} elevation={0}>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            {tab === "uptake-rate" ? (
              <>
                <UptakeRateChart />
              </>
            ) : (
              <>
                <DistrictStockTrendsChart />
              </>
            )}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
