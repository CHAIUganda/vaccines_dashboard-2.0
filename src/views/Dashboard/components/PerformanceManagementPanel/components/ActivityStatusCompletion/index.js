import React from "react";

// Material components
import { Grid } from "@material-ui/core";
import { Paper } from "@material-ui/core";

// Import Activity Status Completion Components.
import ActivityStatusPieChart from "./ActivityStatusPieChart/index";
import ActivityStatusTable from "./ActivityStatusTable/index";
import NumberOfPlannedActivitiesBarChart from "./NumberOfPlannedActivitiesBarChart/index";
import ActivityByResponsibleOrganisationBarChart from "./ActivityByResponsibleOrganisationBarChart/index";

export default function ActivityStatusCompletion() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} style={{ paddingTop: 0 }}>
        <Grid container spacing={3} style={{ paddingTop: 50, height: 720 }}>
          <Grid item lg={9} md={9} xs={12}>
            <Grid spacing={3} container direction="column">
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
                <ActivityByResponsibleOrganisationBarChart />
              </Grid>

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
                <NumberOfPlannedActivitiesBarChart />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={3} md={3} xs={12}>
            <Grid spacing={3} container direction="column">
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
                <Paper>
                  <Grid spacing={1} container style={{ margin: 0 }}>
                    <Grid
                      item
                      xs={12}
                      style={{ paddingTop: 0, paddingBottom: 0 }}
                    >
                      <ActivityStatusPieChart />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid item lg={12} md={12} xs={12}>
                <Paper>
                  <ActivityStatusTable />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
