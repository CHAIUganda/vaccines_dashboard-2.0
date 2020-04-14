import { useContext } from "react";

// Bring in our performance management context
import { PerformanceManagementContext } from "../../../../../../../context/PerformanceManagement/PerformanceManagementState";

// Chart Options
import { commonChartOptions } from "../../../../../../../common/chartOptions/chartOptions";

import { getFundingSourcesChartData } from "../../../../../../../common/utils/performancemanagement/utils";

export const FundingSourcesBarChartTemplate = () => {
  const { organisations, fundingStatus } = useContext(
    PerformanceManagementContext
  );

  const { fundingSourcesData } = fundingStatus;

  const chartData = getFundingSourcesChartData(fundingSourcesData);

  const chart = {
    credits: {
      ...commonChartOptions.credits,
    },
    chart: {
      type: "bar",
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
      categories: organisations.filter((org) => org !== "All"),
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
    series: chartData,
  };

  return chart;
};
