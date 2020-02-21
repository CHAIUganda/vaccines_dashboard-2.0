import React from "react";

// Material components
import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

// Custom components
import RefillRateLineChart from "./RefillRateLineChart/index";
import RefillRateTable from "./RefillRateTable/index";

// Import common styles
import { useStyles } from "../../../styles";

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
    <Grid container spacing={3}>
      <Grid item xs={12} style={{ paddingTop: 10 }}>
        <Paper className={classes.paper} elevation={0}>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <Grid container spacing={3} className={classes.DST_section}>
              <Grid item lg={6} md={6} xl={6} xs={12}>
                <RefillRateLineChart
                  data={stockByDistrictVaccineRefillData}
                  isLoading={isLoading}
                  endMonth={endMonth}
                  startMonth={startMonth}
                  district={district}
                  vaccine={vaccine}
                />
              </Grid>
              <Grid item lg={6} md={6} xl={6} xs={12}>
                <RefillRateTable
                  data={atHandStockByDistrictRefillData}
                  endMonth={endMonth}
                  vaccine={vaccine}
                  isLoading={isLoading}
                />
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
