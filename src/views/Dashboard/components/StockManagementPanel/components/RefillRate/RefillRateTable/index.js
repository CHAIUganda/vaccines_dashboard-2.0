import React from "react";

// Shared componenrs
import { DataTable } from "./dataTable";

const RefillRateTable = ({ data, vaccine, endMonth, isLoading }) => {
  return (
    <DataTable
      data={data}
      isLoading={isLoading}
      vaccine={vaccine}
      endMonth={endMonth}
    />
  );
};

export default RefillRateTable;
