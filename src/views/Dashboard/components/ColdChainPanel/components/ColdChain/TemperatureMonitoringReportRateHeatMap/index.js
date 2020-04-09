import React from "react";

// Shared componenrs
import { HeatTable } from "./heatTable.js";

const TemperatureMonitoringReportRateHeatMap = ({ data, isLoading, year }) => {
  return <HeatTable data={data} year={year} isLoading={isLoading} />;
};

export default TemperatureMonitoringReportRateHeatMap;
