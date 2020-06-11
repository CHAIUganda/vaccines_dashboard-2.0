import React, { useState, useMemo, useContext } from "react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Bring in our performance management context
import { PerformanceManagementContext } from "../../../../../../../context/PerformanceManagement/PerformanceManagementState";

// Shared components
import { Chart } from "../../../../../../../components";

// Chart Template
import { BudgetAllocationPerFundingSourceBarChartTemplate } from "./chart";

const BudgetAllocationPerFundingSourceBarChart = () => {
  const { fundingStatus } = useContext(PerformanceManagementContext);

  const { isLoading } = fundingStatus;
  const [chart, setChart] = useState();

  useMemo(() => {
    setChart(BudgetAllocationPerFundingSourceBarChartTemplate());
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <Chart
      title={"Budget Distribution by Funding Source"}
      chart={
        <HighchartsReact highcharts={Highcharts} options={chart && chart} />
      }
      isLoading={isLoading}
      chartData={chart && chart}
    />
  );
};

export default BudgetAllocationPerFundingSourceBarChart;
