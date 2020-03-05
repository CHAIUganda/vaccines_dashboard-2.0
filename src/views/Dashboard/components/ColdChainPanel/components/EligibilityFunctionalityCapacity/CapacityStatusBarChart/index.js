import React, { useState, useMemo } from "react";
// Highcharts for time series test
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Shared componenrs
import { Chart } from "../../../../../../../components";

// Chart Template
import { CapacityStatusBarChartTemplate } from "./chart";

const CapacityStatusBarChart = ({
  data,
  isLoading,
  district,
  careLevel,
  startYearHalf,
  endYearHalf
}) => {
  const [chart, setChart] = useState();

  useMemo(() => {
    if (data && data) {
      setChart(
        CapacityStatusBarChartTemplate(
          data,
          district,
          careLevel,
          startYearHalf,
          endYearHalf
        )
      );
    }
  }, [data, district, careLevel, startYearHalf, endYearHalf]);

  return (
    <Chart
      title={`Storage capacity in litres ${
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

export default CapacityStatusBarChart;
