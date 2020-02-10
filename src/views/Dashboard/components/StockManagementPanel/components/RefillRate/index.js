import React from "react";

// Material components
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// Custom components
import RefillRateLineChart from "./RefillRateLineChart/index";
import RefillRateTable from "./RefillRateTable/index";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  tabsDiv: {
    flexGrow: 1,
    backgroundColor: "#F9F9FC",
    fontFamily: "Open Sans",
    height: 630
  }
}));

export default function RefillRate(props) {
  const classes = useStyles();

  const {
    atHandStockByDistrictRefillData,
    stockByDistrictVaccineRefillData,
    isLoading,
    endMonth,
    startMonth,
    district,
    vaccine
  } = props;

  return (
    <div className={classes.tabsDiv}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Grid container spacing={3}>
            <Grid
              item
              lg={12}
              md={12}
              xl={12}
              xs={12}
              style={{ height: 650, padding: "0.9rem" }}
            >
              <RefillRateLineChart
                data={stockByDistrictVaccineRefillData}
                isLoading={isLoading}
                endMonth={endMonth}
                startMonth={startMonth}
                district={district}
                vaccine={vaccine}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={3}>
            <Grid
              item
              lg={12}
              md={12}
              xl={12}
              xs={12}
              style={{ height: 650, padding: "0.9rem" }}
            >
              <RefillRateTable
                data={atHandStockByDistrictRefillData}
                isLoading={isLoading && isLoading}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
