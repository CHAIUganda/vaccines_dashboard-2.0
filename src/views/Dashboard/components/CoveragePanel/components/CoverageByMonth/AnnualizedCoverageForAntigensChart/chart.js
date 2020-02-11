// Highcharts
import Highcharts from "highcharts";

// Chart Options
import { commonChartOptions } from "../../../../../../../common/chartOptions/chartOptions";

// Utility functions
import { getChartData } from "../../../../../../../common/utils/utils";

export const antigensAnnualizedCoverageCY = (
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
        "coverage",
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
        "coverage",
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
        "coverage",
        dose
      );
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
          text: `Trend of Annualized Coverage of antigens for ${endYear} Calendar Year`
        }
      }
    },

    title: {
      text: ""
    },
    xAxis: {
      categories: monthsInYear
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
      },
      min: 0
    },
    plotOptions: {
      line: {
        lineWidth: 2,
        marker: {
          enabled: false
        }
      }
    },
    series: [...chartData]
  };
};

export const antigensAnnualizedCoverageFY = (
  data,
  startYear,
  endYear,
  dose,
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

  const chartData = getChartData(
    data,
    startYear,
    endYear,
    "FY",
    true,
    "coverage",
    dose
  );

  return {
    ...commonChartOptions,
    chart: {
      ...(district === "National" ? { height: 50 + "%" } : { height: 28 + "%" })
    },
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
      },
      min: 0
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
