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
      height: 240,
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
    series: chartData,
  };

  return chart;
};
