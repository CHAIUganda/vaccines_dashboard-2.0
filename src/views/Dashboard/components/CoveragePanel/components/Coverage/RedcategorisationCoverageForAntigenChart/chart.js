// Chart Options
import {
  commonChartOptions,
  commonChartPlotOptions
} from "../../../../../../../common/chartOptions/chartOptions";

// Utility functions
import { getChartData } from "../../../../../../../common/utils/utils";

export const redCategorisationCoverageChart = (
  data,
  startYear,
  endYear,
  dose,
  tabTitle
) => {
  const monthsInYear = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ];

  let chartData;

  switch (tabTitle) {
    case "Annualized (CY)":
      chartData = getChartData(
        data,
        startYear,
        endYear,
        "CY",
        true,
        "redcategory",
        dose
      );
      break;

    case "Monthly (CY)":
      chartData = getChartData(
        data,
        startYear,
        endYear,
        "CY",
        false,
        "redcategory",
        dose
      );
      break;

    case "Annualized (FY)":
      chartData = getChartData(
        data,
        startYear,
        endYear,
        "FY",
        true,
        "redcategory",
        dose
      );
      break;

    case "Monthly (FY)":
      chartData = getChartData(
        data,
        startYear,
        endYear,
        "FY",
        true,
        "redcategory",
        dose
      );
      break;

    default:
      chartData = getChartData(
        data,
        startYear,
        endYear,
        "CY",
        true,
        "redcategory",
        dose
      );
  }

  return {
    ...commonChartOptions,
    chart: {
      height: 50 + "%"
    },
    title: {
      text: ""
    },
    xAxis: {
      categories: monthsInYear,
      labels: {
        ...commonChartOptions.labels
      }
    },
    yAxis: {
      title: {
        text: "Percentage (%)"
      },
      labels: {
        ...commonChartOptions.labels
      },
      min: 0
    },
    plotOptions: {
      line: {
        ...commonChartPlotOptions.plotOptions.line
      }
    },
    tooltip: { ...commonChartOptions.lineTooltip },

    series: [...chartData]
  };
};