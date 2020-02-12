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
  tabTitle,
  district
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
    credits: { ...commonChartOptions.credits },

    chart: {
      ...(district === "National" ? { height: 50 + "%" } : { height: 28 + "%" })
    },
    exporting: {
      ...commonChartOptions.exporting,
      chartOptions: {
        ...commonChartOptions.exporting.chartOptions,
        title: {
          text: `Trend of Annualized Dropout Rate of antigens for ${endYear} Calendar Year`
        }
      }
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
      }
    },
    plotOptions: {
      line: {
        ...commonChartPlotOptions.plotOptions.line
      }
    },
    tooltip: {
      ...commonChartOptions.lineTooltip
    },
    series: [...chartData]
  };
};

export const dropoutRateCoverageFY = (
  data,
  startYear,
  endYear,
  dose,
  tabTitle,
  district
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
    case "Annualized (FY)":
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
    credits: {
      ...commonChartOptions.credits
    },
    chart: {
      ...(district === "National" ? { height: 50 + "%" } : { height: 28 + "%" })
    },

    exporting: {
      ...commonChartOptions.exporting,
      chartOptions: {
        ...commonChartOptions.exporting.chartOptions,
        title: {
          text: `Trend of Annualized Dropout Rate of antigens for ${endYear} Financial Year`
        }
      }
    },
    title: {
      text: ""
    },
    xAxis: {
      categories: monthsFinancialYear,
      labels: {
        ...commonChartOptions.labels
      }
    },

    tooltip: {
      ...commonChartOptions.lineTooltip
    },
    yAxis: {
      title: {
        text: "Percentage (%)"
      },
      labels: {
        ...commonChartOptions.labels
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
