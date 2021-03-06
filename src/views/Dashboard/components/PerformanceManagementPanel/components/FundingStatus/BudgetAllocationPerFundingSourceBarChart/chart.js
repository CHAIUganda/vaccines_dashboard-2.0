import { useContext } from "react";

// Bring in our performance management context
import { PerformanceManagementContext } from "../../../../../../../context/PerformanceManagement/PerformanceManagementState";

// Chart Options
import { commonChartOptions } from "../../../../../../../common/chartOptions/chartOptions";

import { getBudgetAllocationPerFundingSourceChartData } from "../../../../../../../common/utils/performancemanagement/utils";

export const BudgetAllocationPerFundingSourceBarChartTemplate = () => {
  const { fundingStatus } = useContext(PerformanceManagementContext);

  const { fundingSourcesData } = fundingStatus;

  const categories = fundingSourcesData?.map((source) => source.name);
  const chartData = getBudgetAllocationPerFundingSourceChartData(
    fundingSourcesData
  );

  const chart = {
    credits: { ...commonChartOptions.credits },
    chart: {
      type: "column",
      height: 263,
      backgroundColor: null,
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: categories,
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Amount (USD)",
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
    series: [...chartData],
  };
  return chart;
};
