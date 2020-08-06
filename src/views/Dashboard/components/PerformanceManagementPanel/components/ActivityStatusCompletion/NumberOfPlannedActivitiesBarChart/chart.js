import { useContext } from "react";

// Bring in our performance management context
import { PerformanceManagementContext } from "../../../../../../../context/PerformanceManagement/PerformanceManagementState";

// Chart Options
import { commonChartOptions } from "../../../../../../../common/chartOptions/chartOptions";

import { getPlannedActivitiesChartData } from "../../../../../../../common/utils/performancemanagement/utils";

export const NumberOfPlannedActivitiesBarChartTemplate = () => {
  const { activityCompletionStatus, quarterCategories } = useContext(
    PerformanceManagementContext
  );

  const { plannedActivities } = activityCompletionStatus;

  const chartData = getPlannedActivitiesChartData(plannedActivities);

  const chart = {
    credits: {
      ...commonChartOptions.credits,
    },
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
      backgroundColor: null,
      height: 320,
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: quarterCategories,
    },
    yAxis: {
      title: {
        text: "Number of activities",
      },
    },
    plotOptions: {
      column: {
        pointPadding: 0,
        borderWidth: 0,
      },
      series: {
        minPointLength: 12,
        pointWidth: 12,
        groupPadding: 0.3,
        pointPadding: 0,
      },
    },
    series: chartData,
  };

  return chart;
};
