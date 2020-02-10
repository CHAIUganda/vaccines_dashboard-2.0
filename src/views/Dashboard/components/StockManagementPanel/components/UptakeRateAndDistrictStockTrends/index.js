import React from "react";

// Material components
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// Custom components
import UptakeRateChart from "./UptakeRateChart/index";
import DistrictStockTrendsChart from "./DistrictStockTrendsChart/index";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  chartDiv: {
    flexGrow: 1,
    backgroundColor: "#F9F9FC",
    fontFamily: "Open Sans",
    height: 630
  }
}));

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
    <div className={classes.chartDiv}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid
              item
              lg={12}
              md={12}
              xl={12}
              xs={12}
              style={{ height: 650, padding: "0.9rem" }}
            >
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
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
