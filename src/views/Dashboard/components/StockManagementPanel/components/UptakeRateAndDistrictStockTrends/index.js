import React from "react";

// Material components
import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

// Custom components
import UptakeRateChart from "./UptakeRateChart/index";
import DistrictStockTrendsChart from "./DistrictStockTrendsChart/index";

// Import common styles
import { useStyles } from "../../../styles";

export default function UptakeRateAndDistrictStockTrends(props) {
  const classes = useStyles();
  const {
    data,
    startMonth,
    endMonth,
    isLoading,
    vaccine,
    district,
    tab
  } = props;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.paper} elevation={0}>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <div className={classes.chartDiv}>
              {tab === "uptake-rate" ? (
                <>
                  <UptakeRateChart
                    data={data && data}
                    startMonth={startMonth && startMonth}
                    endMonth={endMonth && endMonth}
                    isLoading={isLoading && isLoading}
                    vaccine={vaccine && vaccine}
                    district={district && district}
                  />
                </>
              ) : (
                <>
                  <DistrictStockTrendsChart
                    data={data && data}
                    startMonth={startMonth && startMonth}
                    endMonth={endMonth && endMonth}
                    isLoading={isLoading && isLoading}
                    vaccine={vaccine && vaccine}
                    district={district && district}
                  />
                </>
              )}
            </div>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
