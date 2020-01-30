import React, { useState } from "react";
import PropTypes from "prop-types";

// Material components
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// Custom components
import AntigenCoverageChart from "./AntigenCoverageChart/index";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  tabsDiv: {
    padding: "1rem 1rem",
    flexGrow: 1,
    backgroundColor: "#F9F9FC",
    fontFamily: "Open Sans"
  }
}));

export default function CoverageByYear(props) {
  const classes = useStyles();
  const {
    vacineData,
    startYear,
    endYear,
    isLoading,
    vaccineName,
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
              <AntigenCoverageChart
                data={vacineData && vacineData}
                startYear={startYear && startYear}
                endYear={endYear && endYear}
                isLoading={isLoading && isLoading}
                vaccineName={vaccineName && vaccineName}
                district={district && district}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
