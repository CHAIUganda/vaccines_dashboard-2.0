import React from "react";

// Shared componenrs
import { DataTable } from "./dataTable.js";

const OptimalityTable = ({ data, district, year, isLoading }) => {
  return <DataTable data={data} year={year} isLoading={isLoading} />;
};

export default OptimalityTable;
