import React, { useState, useMemo } from "react";

// Highcharts for time series test
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Shared componenrs
import { Chart } from "../../../../../../../components";

// Chart Template
import { RefillRateLineChartTemplate } from "./chart";

const RefillRateLineChart = ({
  data,
  isLoading,
  endMonth,
  startMonth,
  district,
  vaccine
}) => {
  const [chart, setChart] = useState();

  useMemo(() => {
    if (data && data) {
      setChart(
        RefillRateLineChartTemplate(
          data,
          endMonth,
          startMonth,
          district,
          vaccine
        )
      );
    }
  }, [data, endMonth, startMonth, district, vaccine]);

  return (
    <Chart
      title={`Distribution of ${vaccine} for ${district} `}
      chart={
        <HighchartsReact highcharts={Highcharts} options={chart && chart} />
      }
      isLoading={isLoading && isLoading}
      chartData={chart && chart}
    />
  );
};

export default RefillRateLineChart;
