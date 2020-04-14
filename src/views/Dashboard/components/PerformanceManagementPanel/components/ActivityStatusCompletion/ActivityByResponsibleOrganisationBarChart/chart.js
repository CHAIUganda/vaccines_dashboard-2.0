// Bring in our performance management context
import { useContext } from "react";

import { PerformanceManagementContext } from "../../../../../../../context/PerformanceManagement/PerformanceManagementState";

// Chart Options
import { commonChartOptions } from "../../../../../../../common/chartOptions/chartOptions";

import { getActivityByResponsibleOrganisationChartData } from "../../../../../../../common/utils/performancemanagement/utils";

export const ActivityByResponsibleOrganisationChartTemplate = (data) => {
  const { organisations } = useContext(PerformanceManagementContext);

  const chartData = getActivityByResponsibleOrganisationChartData(data);

  return {
    credits: {
      ...commonChartOptions.credits,
    },

    chart: {
      type: "column",
      height: 250,
      backgroundColor: null,
    },
    title: {
      text: "",
    },

    xAxis: {
      categories: organisations.filter((org) => org !== "All"),
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
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
    },

    series: [...chartData],
  };
};
