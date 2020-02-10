import React from "react";

// Material components
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

// Custom components
import DistrictStockTrendsChart from "./DistrictStockTrendsChart/index";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  chartDiv: {
    padding: "1rem 1rem",
    flexGrow: 1,
    backgroundColor: "#F9F9FC",
    fontFamily: "Open Sans",
    height: 630
  }
}));

export default function DistrictStockTrends(props) {
  const classes = useStyles();
  const {
    stockByDistrictVaccineStockTrendData,
    startMonth,
    endMonth,
    isLoading,
    vaccine,
    district
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
              style={{ height: 720, padding: "0.9rem" }}
            >
              <DistrictStockTrendsChart
                data={
                  stockByDistrictVaccineStockTrendData &&
                  stockByDistrictVaccineStockTrendData
                }
                startMonth={startMonth && startMonth}
                endMonth={endMonth && endMonth}
                isLoading={isLoading && isLoading}
                vaccine={vaccine && vaccine}
                district={district && district}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
