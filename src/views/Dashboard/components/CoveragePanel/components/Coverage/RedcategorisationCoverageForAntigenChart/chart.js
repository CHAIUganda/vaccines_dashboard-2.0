import { useContext } from "react";

// Bring in our coverage context
import { CoverageContext } from "../../../../../../../context/Coverage/CoverageState";

// Chart Options
import {
  commonChartOptions,
  commonChartPlotOptions,
} from "../../../../../../../common/chartOptions/chartOptions";

// Utility functions
import { getChartData } from "../../../../../../../common/utils/utils";

export const RedCategorisationCoverageChart = (tabTitle) => {
  const { redCategorisation } = useContext(CoverageContext);

  const { vaccineDosesForChart, startYear, endYear, dose } = redCategorisation;

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
    "Dec",
  ];

  let chartData;

  switch (tabTitle) {
    case "Annualized (CY)":
      chartData = getChartData(
        vaccineDosesForChart,
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
        vaccineDosesForChart,
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
        vaccineDosesForChart,
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
        vaccineDosesForChart,
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
        vaccineDosesForChart,
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
      height: 50 + "%",
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: monthsInYear,
      labels: {
        ...commonChartOptions.labels,
      },
    },
    yAxis: {
      title: {
        text: "Percentage (%)",
      },
      labels: {
        ...commonChartOptions.labels,
      },
      min: 0,
    },
    plotOptions: {
      line: {
        ...commonChartPlotOptions.plotOptions.line,
      },
    },
    tooltip: { ...commonChartOptions.lineTooltip },

    series: [...chartData],
  };
};
