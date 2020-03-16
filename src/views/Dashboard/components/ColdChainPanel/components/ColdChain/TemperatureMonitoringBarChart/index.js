import React, { useState, useMemo } from "react";
// Highcharts for time series test
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Shared componenrs
import { Chart } from "../../../../../../../components";

// Chart Template
import { TemperatureMonitoringBarChartTemplate } from "./chart";

const TemperatureMonitoringBarChart = ({
  data,
  isLoading,
  district,
  year,
  month
}) => {
  const [chart, setChart] = useState();

  useMemo(() => {
    if (data && data) {
      setChart(
        TemperatureMonitoringBarChartTemplate(data, district, year, month)
      );
    }
  }, [data, district, month, year]);

  return (
    <Chart
      title={`Total number of freeze and heat alarms ${
        district === "national" ? "at National Level" : "in " + district
      }`}
      chart={
        <HighchartsReact highcharts={Highcharts} options={chart && chart} />
      }
      isLoading={isLoading && isLoading}
      chartData={chart && chart}
    />
  );
};

export default TemperatureMonitoringBarChart;
