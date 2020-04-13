import React, { useState, useMemo } from "react";

// Material components
import { Grid } from "@material-ui/core";

// Import common styles
import { useStyles } from "../../../styles";

// Import Activity Status Completion Components.
import ActivityStatusPieChart from "./ActivityStatusPieChart/index";
import NumberOfPlannedActivitiesBarChart from "./NumberOfPlannedActivitiesBarChart/index";
import ActivityByResponsibleOrganisationBarChart from "./ActivityByResponsibleOrganisationBarChart/index";
import NumberOfPlannedActivitiesTable from "./NumberOfPlannedActivitiesTable/index";

export default function ActivityStatusCompletion({ data, isLoading }) {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} style={{ paddingTop: 0 }}>
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <Grid container spacing={3} style={{ paddingTop: 50, height: 720 }}>
            <Grid item lg={9} md={9} xs={12}>
              <Grid spacing={3} container direction="column">
                <Grid
                  item
                  lg={6}
                  md={6}
                  xs={12}
                  style={{
                    width: "100%",
                    maxWidth: "100%",
                  }}
                >
                  <Grid spacing={3} container>
                    <Grid item lg={4} md={4} xs={12} style={{ height: 300 }}>
                      <ActivityStatusPieChart
                        data={data}
                        isLoading={isLoading}
                      />
                    </Grid>

                    <Grid item lg={8} md={8} xs={12} style={{ height: 300 }}>
                      <NumberOfPlannedActivitiesBarChart
                        data={data}
                        isLoading={isLoading}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  lg={6}
                  md={6}
                  xs={12}
                  style={{
                    width: "100%",
                    maxWidth: "100%",
                    height: 390,
                  }}
                >
                  <NumberOfPlannedActivitiesTable
                    data={data.data}
                    isLoading={data.isLoading && data.isLoading}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={3} md={3} xs={12}>
              <ActivityByResponsibleOrganisationBarChart
                data={data}
                isLoading={isLoading}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
