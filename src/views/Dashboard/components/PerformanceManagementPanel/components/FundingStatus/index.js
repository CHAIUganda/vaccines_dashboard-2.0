import React from "react";

// Material components
import { Grid } from "@material-ui/core";

// Import common styles
import { useStyles } from "../../../styles";

// Import Funding Status  Components.
import BudgetAllocationBarChart from "./BudgetAllocationBarChart/index";
import BudgetAllocationPieChart from "./BudgetAllocationPieChart/index";
import FundingSourcesBarChart from "./FundingSourcesBarChart/index";
import ISCActivitiesTable from "./ISCActivitiesTable/index";
import ISCFundsTable from "./ISCFundsTable/index";
import FundingSourcesTable from "./FundingSourcesTable/index";
import BudgetAllocationPerComponentBarChart from "./BudgetAllocationPerComponentBarChart/index";

export default function FundingStatus() {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} style={{ paddingTop: 0 }}>
        <Grid container spacing={2} style={{ paddingTop: 50, height: 720 }}>
          <Grid item lg={5} md={5} xs={12}>
            <Grid spacing={3} container direction="column">
              <Grid item lg={12} md={12} xs={12}>
                <Grid spacing={2} container>
                  <Grid item lg={6} md={6} xs={12} style={{ maxHeight: 370 }}>
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
            {/* <Grid spacing={3} container direction="column">
              <Grid
                item
                lg={12}
                md={12}
                xs={12}
                className={classes.fundingStatusComponents}
              >
                <Grid container spacing={1}>
                  <Grid
                    item
                    lg={7}
                    md={7}
                    xs={12}
                    className={classes.fundingStatusComponents}
                  >
                    <BudgetAllocationBarChart />
                  </Grid>
                  <Grid item lg={5} md={5} xs={12}>
                    <BudgetAllocationPieChart />
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                lg={12}
                md={12}
                xs={12}
                className={classes.fundingStatusComponents}
              >
                <BudgetAllocationPerComponentBarChart />
              </Grid>
            </Grid> */}
          </Grid>
          <Grid item lg={3} md={3} xs={12}>
            {/* <FundingSourcesTable /> */}
            <FundingSourcesBarChart />

            {/* <Grid spacing={3} container direction="column">
              <Grid
                item
                lg={12}
                md={12}
                xs={12}
                style={{
                  width: "100%",
                  maxWidth: "100%",
                }}
              >
                <Grid spacing={1} container>
                  <Grid item lg={12} md={12} xs={12}>
                    <ISCActivitiesTable />
                  </Grid>
                  <Grid item lg={12} md={12} xs={12}>
                    <ISCActivitiesTable />
                  </Grid>
                </Grid>
              </Grid>
            </Grid> */}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
