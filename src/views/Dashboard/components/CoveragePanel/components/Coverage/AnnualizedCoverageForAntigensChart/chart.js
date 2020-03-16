// Chart Options
import {
  commonChartOptions,
  commonChartPlotOptions,
} from "../../../../../../../common/chartOptions/chartOptions";

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
    "Dec",
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
      ...commonChartOptions.credits,
    },

    chart: {
      ...(district.length === 1 ? { height: 50 + "%" } : { height: 28 + "%" }),
    },
    exporting: {
      ...commonChartOptions.exporting,
      chartOptions: {
        ...commonChartOptions.exporting.chartOptions,
        title: {
          text: `Trend of Annualized Coverage of antigens for ${startYear} Calendar Year`,
        },
      },
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
    tooltip: {
      ...commonChartOptions.lineTooltip,
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
    series: [...chartData],
  };
};

export const antigensAnnualizedCoverageFY = (
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
    "Jun",
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
      ...(district.length === 1 ? { height: 50 + "%" } : { height: 28 + "%" }),
    },
    exporting: {
      ...commonChartOptions.exporting,
      chartOptions: {
        ...commonChartOptions.exporting.chartOptions,
        title: {
          text: `Trend of Annualized Coverage of antigens for ${startYear} Financial Year`,
        },
      },
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: monthsFinancialYear,
      labels: {
        ...commonChartOptions.labels,
      },
    },

    tooltip: {
      ...commonChartOptions.tooltip,
    },

    yAxis: {
      title: {
        text: "Percentage (%)",
      },
      min: 0,
      labels: {
        ...commonChartOptions.labels,
      },
    },
    plotOptions: {
      line: {
        ...commonChartPlotOptions.plotOptions.line,
      },
    },
    series: [...chartData],
  };
};
