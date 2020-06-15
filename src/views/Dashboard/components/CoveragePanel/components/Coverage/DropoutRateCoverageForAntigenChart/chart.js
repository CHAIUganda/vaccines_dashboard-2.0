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

export const DropoutRateCoverageCY = (tabTitle) => {
  const { dropoutRate } = useContext(CoverageContext);
  const { vaccineDosesForChart, startYear, endYear, dose } = dropoutRate;

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
        "dropoutrate",
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
        "dropoutrate",
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
        "dropoutrate",
        dose
      );
  }

  return {
    credits: { ...commonChartOptions.credits },

    chart: {
      // ...(district.length === 1 ? { height: 50 + "%" } : { height: 28 + "%" }),
      height: 500,
    },
    exporting: {
      ...commonChartOptions.exporting,
      chartOptions: {
        ...commonChartOptions.exporting.chartOptions,
        title: {
          text: `Trend of Annualized Dropout Rate of antigens for ${endYear} Calendar Year`,
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
    yAxis: {
      title: {
        text: "Percentage (%)",
      },
      labels: {
        ...commonChartOptions.labels,
      },
    },
    plotOptions: {
      line: {
        ...commonChartPlotOptions.plotOptions.line,
      },
    },
    tooltip: {
      ...commonChartOptions.lineTooltip,
    },
    series: [...chartData],
  };
};

export const DropoutRateCoverageFY = (tabTitle) => {
  const { dropoutRate } = useContext(CoverageContext);
  const { vaccineDosesForChart, startYear, endYear, dose } = dropoutRate;

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

  let chartData;

  switch (tabTitle) {
    case "Annualized (FY)":
      chartData = getChartData(
        vaccineDosesForChart,
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
        vaccineDosesForChart,
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
        vaccineDosesForChart,
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
      ...commonChartOptions.credits,
    },
    chart: {
      height: 500,
    },

    exporting: {
      ...commonChartOptions.exporting,
      chartOptions: {
        ...commonChartOptions.exporting.chartOptions,
        title: {
          text: `Trend of Annualized Dropout Rate of antigens for ${endYear} Financial Year`,
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
      ...commonChartOptions.lineTooltip,
    },
    yAxis: {
      title: {
        text: "Percentage (%)",
      },
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
