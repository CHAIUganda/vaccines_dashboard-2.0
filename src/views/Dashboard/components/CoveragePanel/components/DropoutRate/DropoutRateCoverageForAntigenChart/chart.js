// Highcharts
import Highcharts from "highcharts";

// Chart Options
import {
  commonChartOptions,
  commonChartPlotOptions
} from "../../../../../../../common/chartOptions/chartOptions";

// Utility functions
import { getChartData } from "../../../../../../../common/utils/utils";

export const dropoutRateCoverageCY = (
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
    case "Cummulative (CY)":
      chartData = getChartData(
        data,
        startYear,
        endYear,
        "CY",
        true,
        "dropoutrate",
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
        "dropoutrate",
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
        "dropoutrate",
        dose
      );
  }

  return {
    ...commonChartOptions,
    title: {
      text: ""
    },
    xAxis: {
      categories: monthsInYear
    },
    yAxis: {
      title: {
        text: "Percentage (%)"
      }
      // min: 0
    },
    plotOptions: {
      line: {
        lineWidth: 1,
        marker: {
          enabled: false
        }
      }
    },
    series: [...chartData]
  };
};

export const dropoutRateCoverageFY = (
  data,
  startYear,
  endYear,
  dose,
  tabTitle
) => {
  const monthsFinancialYear = [
    "",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun"
  ];

  let chartData;

  switch (tabTitle) {
    case "Cummulative (FY)":
      chartData = getChartData(
        data,
        startYear,
        endYear,
        "FY",
        true,
        "dropoutrate",
        dose
      );
      break;

    case "Monthly (FY)":
      chartData = getChartData(
        data,
        startYear,
        endYear,
        "FY",
        false,
        "dropoutrate",
        dose
      );
      break;

    default:
      chartData = getChartData(
        data,
        startYear,
        endYear,
        "FY",
        true,
        "dropoutrate",
        dose
      );
      break;
  }

  return {
    ...commonChartOptions,
    title: {
      text: ""
    },
    xAxis: {
      categories: monthsFinancialYear
    },

    tooltip: {
      formatter: function() {
        return (
          "<br/>" +
          this.point.series.name +
          ": " +
          Highcharts.numberFormat(this.point.y, 1)
        );
      }
    },
    yAxis: {
      title: {
        text: "Percentage (%)"
      }
    },
    plotOptions: {
      line: {
        lineWidth: 1,
        marker: {
          enabled: false
        }
      }
    },
    series: [...chartData]
  };
};
