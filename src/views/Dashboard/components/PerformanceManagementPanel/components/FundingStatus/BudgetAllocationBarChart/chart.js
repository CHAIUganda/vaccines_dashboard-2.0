import { useContext } from "react";

// Bring in our performance management context
import { PerformanceManagementContext } from "../../../../../../../context/PerformanceManagement/PerformanceManagementState";

// Chart Options
import { commonChartOptions } from "../../../../../../../common/chartOptions/chartOptions";

import { getBudgetAllocationPerQuarterChartData } from "../../../../../../../common/utils/performancemanagement/utils";

export const BudgetAllocationBarChartTemplate = (data, district) => {
  const { fundingStatus, quarterCategories } = useContext(
    PerformanceManagementContext
  );

  const { budgetAllocationPerQuarter } = fundingStatus;

  const chartData = getBudgetAllocationPerQuarterChartData(
    budgetAllocationPerQuarter
  );

  const chart = {
    credits: { ...commonChartOptions.credits },
    chart: {
      type: "column",
      height: 250,
      backgroundColor: null,
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: quarterCategories,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Allocated funds (USD)",
      },
    },

    series: chartData,
  };
  return chart;
};
