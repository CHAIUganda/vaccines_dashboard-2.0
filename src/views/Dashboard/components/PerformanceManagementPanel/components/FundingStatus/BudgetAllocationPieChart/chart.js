import { useContext } from "react";

// Bring in our performance management context
import { PerformanceManagementContext } from "../../../../../../../context/PerformanceManagement/PerformanceManagementState";

// Chart Options
import { commonChartOptions } from "../../../../../../../common/chartOptions/chartOptions";

import { getBudgetAllocationPieChartData } from "../../../../../../../common/utils/performancemanagement/utils";

export const BudgetAllocationPieChartTemplate = () => {
  const { fundingStatus } = useContext(PerformanceManagementContext);

  const { budgetAllocationPerRegion } = fundingStatus;

  const chartData = getBudgetAllocationPieChartData(budgetAllocationPerRegion);

  const chart = {
    credits: {
      ...commonChartOptions.credits,
    },
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
      backgroundColor: null,
      height: 270,
      type: "pie",
    },
    title: {
      text:
        "<center>" +
        (budgetAllocationPerRegion?.national_percentage === undefined
          ? 0
          : budgetAllocationPerRegion?.national_percentage) +
        "%<center>" +
        "<b>National</b> <br><br><center>" +
        (budgetAllocationPerRegion?.district_percentage === undefined
          ? 0
          : budgetAllocationPerRegion?.district_percentage) +
        "%<center>" +
        "District",
      verticalAlign: "middle",
      backgroundColor: null,
      borderWidth: 0,
      shadow: true,
      useHTML: true,
      style: {
        padding: 0,
      },
    },
    plotOptions: {
      pie: {
        shadow: false,
      },
    },
    tooltip: {
      formatter: function () {
        return "<b>" + this.point.name + "</b>: " + this.y + " %";
      },
    },
    legend: {
      enabled: true,
    },
    series: chartData,
  };

  return chart;
};
