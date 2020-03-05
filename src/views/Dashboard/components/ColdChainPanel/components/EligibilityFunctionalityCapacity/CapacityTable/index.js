import React from "react";

// Material components
import { Grid } from "@material-ui/core";

// Shared componenrs
import { Chart } from "../../../../../../../components";
import { DataTable } from "./dataTable.js";

const CapacityTable = ({
  data,
  district,
  careLevel,
  startYearHalf,
  endYearHalf,
  isLoading
}) => {
  return (
    <Chart
      chart={
        <>
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} xl={12} xs={12} style={{ padding: 30 }}>
              <DataTable
                data={data}
                isLoading={isLoading}
                startYearHalf={startYearHalf}
                endYearHalf={endYearHalf}
                district={district}
              />
            </Grid>
          </Grid>
        </>
      }
      isLoading={isLoading && isLoading}
    />
  );
};

export default CapacityTable;
