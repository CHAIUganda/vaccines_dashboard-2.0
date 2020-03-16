import React from "react";

// Shared componenrs
import { DataTable } from "./dataTable.js";

const EligibilityTable = ({ data, startQuarter, endQuarter, isLoading }) => {
  return (
    <DataTable
      data={data}
      isLoading={isLoading}
      startQuarter={startQuarter}
      endQuarter={endQuarter}
    />
  );
};
export default EligibilityTable;
