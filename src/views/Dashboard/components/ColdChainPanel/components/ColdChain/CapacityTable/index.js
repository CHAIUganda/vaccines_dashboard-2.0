import React from "react";

// Shared componenrs
import { DataTable } from "./dataTable.js";

const CapacityTable = ({
  data,
  district,
  startQuarter,
  endQuarter,
  isLoading,
}) => {
  return (
    <DataTable
      data={data}
      district={district}
      startQuarter={startQuarter}
      endQuarter={endQuarter}
      isLoading={isLoading}
    />
  );
};

export default CapacityTable;
