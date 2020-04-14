import React, { useState, useMemo } from "react";

// Highcharts for time series test
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Shared components
import { Chart } from "../../../../../../../components";

// Chart Template
import { uptakeRateChartTemplate } from "./chart";

const UptakeRateChart = ({
  data,
  isLoading,
  endMonth,
  startMonth,
  district,
  vaccine,
}) => {
  const [chart, setChart] = useState();

  const chartTitle = `Uptake Rate of ${vaccine} for ${district}`;

  useMemo(() => {
    if (data && data) {
      setChart(
        uptakeRateChartTemplate(data, endMonth, startMonth, district, vaccine)
      );
    }
  }, [data, startMonth, endMonth, vaccine, district]);

  return (
    <Chart
      title={chartTitle}
      chart={
        <HighchartsReact highcharts={Highcharts} options={chart && chart} />
      }
      isLoading={isLoading && isLoading}
      centerTitle={true}
      chartData={chart && chart}
    />
  );
};

export default UptakeRateChart;
