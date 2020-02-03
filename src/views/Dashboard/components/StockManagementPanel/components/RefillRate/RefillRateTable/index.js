import React, { useState, useMemo } from "react";

// Material components
import { Grid } from "@material-ui/core";
import { makeStyles, withStyles, fade } from "@material-ui/core/styles";

// Shared componenrs
import { Chart } from "../../../../../../../components";
import { DataTable } from "./dataTable";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

const RefillRateTable = ({
  data,
  endYear,
  tabTitle,
  dose,
  vaccineName,
  isLoading,
  reportYear,
  startYear
}) => {
  const [value, setValue] = useState(0);
  const classes = useStyles();

  return (
    <Chart
      chart={
        <>
          <Grid container spacing={3} className={classes.section}>
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

export default RefillRateTable;
