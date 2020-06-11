import { useContext } from "react";

// Bring in our performance management context
import { PerformanceManagementContext } from "../../../../../../../context/PerformanceManagement/PerformanceManagementState";

// Chart Options
import { commonChartOptions } from "../../../../../../../common/chartOptions/chartOptions";

import { getBudgetAllocationByImplementingAgencyChartData } from "../../../../../../../common/utils/performancemanagement/utils";

export const BudgetAllocationByImplementingAgencyChartTemplate = () => {
  const { fundingStatus } = useContext(PerformanceManagementContext);

  const { implementingAgencyStats } = fundingStatus;

  // Flip the chart to a colum chart if filtered
  const chartType =
    implementingAgencyStats?.map((org) => org.name).length > 1
      ? "bar"
      : "column";

  const chartData = getBudgetAllocationByImplementingAgencyChartData(
    implementingAgencyStats
  );

  const chart = {
    credits: {
      ...commonChartOptions.credits,
    },
    chart: {
      type: chartType,
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
      backgroundColor: null,
      height: 620,
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: implementingAgencyStats?.map((org) => org.name),
    },
    yAxis: {
      title: {
        text: "Allocated funds in (USD)",
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">Allocated amount: </td>' +
        '<td style="padding:0"><b>{point.y:,.0f} USD</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0,
        borderWidth: 0,
      },
      series: {
        minPointLength: 20,
        pointWidth: 20,
        groupPadding: 0.3,
        pointPadding: 0,
      },
    },
    series: chartData,
  };

  return chart;
};
