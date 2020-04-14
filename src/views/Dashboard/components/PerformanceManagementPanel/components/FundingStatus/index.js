import React from "react";

// Material components
import { Grid } from "@material-ui/core";

// Import Funding Status  Components.
import BudgetAllocationBarChart from "./BudgetAllocationBarChart/index";
import BudgetAllocationPieChart from "./BudgetAllocationPieChart/index";
import FundingSourcesBarChart from "./FundingSourcesBarChart/index";
import ISCActivitiesTable from "./ISCActivitiesTable/index";
import BudgetAllocationPerComponentBarChart from "./BudgetAllocationPerComponentBarChart/index";

export default function FundingStatus() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} style={{ paddingTop: 0 }}>
        <Grid container spacing={2} style={{ paddingTop: 50, height: 720 }}>
          <Grid item lg={5} md={5} xs={12}>
            <Grid spacing={3} container direction="column">
              <Grid item lg={12} md={12} xs={12}>
                <Grid spacing={2} container>
                  <Grid item lg={6} md={6} xs={12}>
                    <BudgetAllocationBarChart />
                  </Grid>

                  <Grid item lg={6} md={6} xs={12}>
                    <BudgetAllocationPieChart />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item lg={12} md={12} xs={12}>
                <BudgetAllocationPerComponentBarChart />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={4} md={4} xs={12}>
            <ISCActivitiesTable />
          </Grid>
          <Grid item lg={3} md={3} xs={12}>
            <FundingSourcesBarChart />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
