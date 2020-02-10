import React from "react";

// Material components
import { Grid } from "@material-ui/core";

// Shared componenrs
import { Chart } from "../../../../../../../components";
import { DataTable } from "./dataTable";

const RefillRateTable = ({ data, isLoading }) => {
  return (
    <Chart
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

export default RefillRateTable;
