import React, { useState, useMemo } from "react";
// Highcharts for time series test
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Shared componenrs
import { Chart } from "../../../../../../../components";

// Chart Template
import { TemperatureMonitoringReportRateChartTemplate } from "./chart";

const TemperatureMonitoringReportRateChart = ({
  data,
  isLoading,
  district,
  year,
  month,
}) => {
  const [chart, setChart] = useState();

  useMemo(() => {
    if (data && data) {
      setChart(
        TemperatureMonitoringReportRateChartTemplate(
          data,
          district,
          year,
          month
        )
      );
    }
  }, [data, district, month, year]);

  return (
    <Chart
      title={`Proportion of districts submitting temperature data for ${year}`}
      chart={
        <HighchartsReact highcharts={Highcharts} options={chart && chart} />
      }
      isLoading={isLoading && isLoading}
      chartData={chart && chart}
    />
  );
};

export default TemperatureMonitoringReportRateChart;
