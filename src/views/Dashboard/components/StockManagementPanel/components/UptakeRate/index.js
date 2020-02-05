import React, { useState } from "react";

// Material components
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// Custom components
import UptakeRateChart from "./UptakeRateChart/index";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  tabsDiv: {
    padding: "1rem 1rem",
    flexGrow: 1,
    backgroundColor: "#F9F9FC",
    fontFamily: "Open Sans",
    height: 630
  }
}));

export default function UptakeRate(props) {
  const classes = useStyles();
  const {
    stockByDistrictVaccineUptakeData,
    startMonth,
    endMonth,
    isLoading,
    vaccine,
    district
  } = props;

  return (
    <div className={classes.tabsDiv}>
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
              <UptakeRateChart
                data={
                  stockByDistrictVaccineUptakeData &&
                  stockByDistrictVaccineUptakeData
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
