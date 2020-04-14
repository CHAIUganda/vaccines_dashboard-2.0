import React, { useState, useMemo, useContext } from "react";

// Bring in our performance management context
import { PerformanceManagementContext } from "../../../../../../../context/PerformanceManagement/PerformanceManagementState";

// Highcharts for time series test
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Shared componenrs
import { Chart } from "../../../../../../../components";

// Chart Template
import { BudgetAllocationBarChartTemplate } from "./chart";

const BudgetAllocationBarChart = () => {
  const [chart, setChart] = useState();
  const { fundingStatus } = useContext(PerformanceManagementContext);

  const { isLoading } = fundingStatus;

  useMemo(() => {
    setChart(BudgetAllocationBarChartTemplate());
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <Chart
      title={"Budget Allocation per Quarter"}
      chart={
        <HighchartsReact highcharts={Highcharts} options={chart && chart} />
      }
      isLoading={isLoading}
      chartData={chart && chart}
    />
  );
};

export default BudgetAllocationBarChart;
