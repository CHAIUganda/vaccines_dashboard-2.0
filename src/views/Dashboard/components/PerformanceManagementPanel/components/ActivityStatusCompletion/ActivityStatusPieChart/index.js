import React, { useState, useMemo } from "react";

// Highcharts for time series test
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Shared componenrs
import { Chart } from "../../../../../../../components";

// Chart Template
import { ActivityStatusChartTemplate } from "./chart";

const ActivityStatusPieChart = ({ data, isLoading }) => {
  const [chart, setChart] = useState();

  useMemo(() => {
    setChart(ActivityStatusChartTemplate(data));
  }, [data]);

  return (
    <Chart
      title={"Activity status"}
      chart={
        <HighchartsReact highcharts={Highcharts} options={chart && chart} />
      }
      isLoading={isLoading && isLoading}
      chartData={chart && chart}
    />
  );
};

export default ActivityStatusPieChart;
