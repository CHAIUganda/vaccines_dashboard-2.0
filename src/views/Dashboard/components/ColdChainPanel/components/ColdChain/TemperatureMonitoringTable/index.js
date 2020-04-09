import React from "react";

// Shared componenrs
import { DataTable } from "./dataTable.js";

const TemperatureMonitoringTable = ({ data, year, isLoading }) => {
  return <DataTable data={data} year={year} isLoading={isLoading} />;
};

export default TemperatureMonitoringTable;
