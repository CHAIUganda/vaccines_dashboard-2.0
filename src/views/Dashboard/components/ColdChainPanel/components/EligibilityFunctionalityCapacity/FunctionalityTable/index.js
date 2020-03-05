import React, { useState } from "react";

// Material components
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

// Import common styles
import { useStyles } from "../../../../styles";

// Shared componenrs
import { Chart } from "../../../../../../../components";
import { DataTable } from "./dataTable.js";

const FunctionalityTable = ({
  data,
  district,
  careLevel,
  startYearHalf,
  endYearHalf,
  isLoading
}) => {
  const title = `Functionality Status of CCE in ${district} for period ${startYearHalf} - ${endYearHalf}`;

  return (
    <Chart
      title={title}
      chart={
        <>
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} xl={12} xs={12} style={{ padding: 30 }}>
              <DataTable data={data} isLoading={isLoading} />
            </Grid>
          </Grid>
        </>
      }
      isLoading={isLoading && isLoading}
    />
  );
};

export default FunctionalityTable;
