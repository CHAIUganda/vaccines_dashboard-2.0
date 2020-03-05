import React, { useState, useMemo } from "react";
// Highcharts for time series test
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Shared componenrs
import { Chart } from "../../../../../../../components";

// Chart Template
import { FunctionalityStatusBarChartTemplate } from "./chart";

const FunctionalityStatusBarChart = ({
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
        FunctionalityStatusBarChartTemplate(
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
      title={`Working status of fridges in ${district}`}
      chart={
        <HighchartsReact highcharts={Highcharts} options={chart && chart} />
      }
      isLoading={isLoading && isLoading}
      chartData={chart && chart}
    />
  );
};

export default FunctionalityStatusBarChart;
