import React, { useState, useMemo } from "react";
// Highcharts for time series test
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Shared componenrs
import { Chart } from "../../../../../../../components";

// Chart Template
import { BudgetAllocationBarChartTemplate } from "./chart";

const BudgetAllocationBarChart = ({ data, isLoading }) => {
  const [chart, setChart] = useState();

  useMemo(() => {
    setChart(BudgetAllocationBarChartTemplate(data));
  }, [data]);

  return (
    <Chart
      title={"Budget Allocation per Quarter"}
      chart={
        <HighchartsReact highcharts={Highcharts} options={chart && chart} />
      }
      isLoading={isLoading && isLoading}
      chartData={chart && chart}
    />
  );
};

export default BudgetAllocationBarChart;
