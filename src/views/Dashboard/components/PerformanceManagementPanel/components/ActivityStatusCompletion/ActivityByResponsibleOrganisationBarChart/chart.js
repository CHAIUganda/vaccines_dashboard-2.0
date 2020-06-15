// Bring in our performance management context
import { useContext } from "react";

import { PerformanceManagementContext } from "../../../../../../../context/PerformanceManagement/PerformanceManagementState";

// Chart Options
import { commonChartOptions } from "../../../../../../../common/chartOptions/chartOptions";

import {
  getActivityByResponsibleOrganisationChartData,
  getActivityByResponsibleOrganisationOrganisationName,
} from "../../../../../../../common/utils/performancemanagement/utils";

export const ActivityByResponsibleOrganisationChartTemplate = (data) => {
  const chartData = getActivityByResponsibleOrganisationChartData(data);

  return {
    credits: {
      ...commonChartOptions.credits,
    },

    chart: {
      type: "column",
      height: 320,
      backgroundColor: null,
    },
    title: {
      text: "",
    },

    xAxis: {
      categories: getActivityByResponsibleOrganisationOrganisationName(data),
      title: {
        text: null,
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Number of funded activities",
        align: "low",
      },
      labels: {
        overflow: "justify",
      },
    },
    tooltip: {
      valueSuffix: " activities",
    },
    plotOptions: {
      column: {
        pointPadding: 0,
        borderWidth: 0,
      },
      series: {
        minPointLength: 8,
        pointWidth: 8,
        groupPadding: 0.3,
        pointPadding: 0,
      },
    },

    series: [...chartData],
  };
};
