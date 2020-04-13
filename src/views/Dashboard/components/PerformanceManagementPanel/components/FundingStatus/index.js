import React, { useState, useMemo } from "react";

// Material components
import { Grid } from "@material-ui/core";

// Import common styles
import { useStyles } from "../../../styles";

// Shared componenrs
import { Chart } from "../../../../../../components/";

// Import Funding Status  Components.
import BudgetAllocationBarChart from "./BudgetAllocationBarChart/index";
// import NumberOfPlannedActivitiesBarChart from "./NumberOfPlannedActivitiesBarChart/index";
// import ActivityByResponsibleOrganisationBarChart from "./ActivityByResponsibleOrganisationBarChart/index";
// import NumberOfPlannedActivitiesTable from "./NumberOfPlannedActivitiesTable/index";

export default function FundingStatus({ data, isLoading }) {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} style={{ paddingTop: 0 }}>
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <Grid container spacing={3} style={{ paddingTop: 50, height: 720 }}>
            <Grid item lg={6} md={6} xs={12}>
              <Grid spacing={3} container direction="column">
                <Grid
                  item
                  lg={6}
                  md={6}
                  xs={12}
                  style={{
                    width: "100%",
                    maxWidth: "100%",
                    height: 345,
                  }}
                >
                  <BudgetAllocationBarChart
                    data={data.fundingStatus}
                    isLoading={data.isLoading}
                  />
                </Grid>
                <Grid
                  item
                  lg={6}
                  md={6}
                  xs={12}
                  style={{
                    width: "100%",
                    maxWidth: "100%",
                    height: 345,
                  }}
                >
                  <Chart
                    title={"Activity status"}
                    //   chart={
                    //     <HighchartsReact highcharts={Highcharts} options={chart && chart} />
                    //   }
                    isLoading={isLoading && isLoading}
                    //   chartData={chart && chart}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={4} md={4} xs={12}>
              <Chart
                title={"Activity status"}
                //   chart={
                //     <HighchartsReact highcharts={Highcharts} options={chart && chart} />
                //   }
                isLoading={isLoading && isLoading}
                //   chartData={chart && chart}
              />
            </Grid>
            <Grid item lg={2} md={2} xs={12}>
              <Chart
                title={"Activity status"}
                //   chart={
                //     <HighchartsReact highcharts={Highcharts} options={chart && chart} />
                //   }
                isLoading={isLoading && isLoading}
                //   chartData={chart && chart}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
