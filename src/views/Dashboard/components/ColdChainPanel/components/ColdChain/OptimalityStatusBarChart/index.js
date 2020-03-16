import React, { useState, useMemo } from "react";
// Highcharts for time series test
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Shared componenrs
import { Chart } from "../../../../../../../components";

// Chart Template
import { OptimalityStatusBarChartTemplate } from "./chart";

const OptimalityStatusBarChart = ({ data, isLoading, district }) => {
  const [chart, setChart] = useState();

  useMemo(() => {
    if (data && data) {
      setChart(OptimalityStatusBarChartTemplate(data, district));
    }
  }, [data, district]);

  return (
    <Chart
      title={`Number of optimal CCE's ${
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

export default OptimalityStatusBarChart;
