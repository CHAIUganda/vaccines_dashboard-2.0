// Chart Options
import { commonChartOptions } from "../../../../../../../common/chartOptions/chartOptions";

// Utility functions
import {
  getYearFromData,
  aggregateYearAntigenData
} from "../../../../../../../common/utils/utils";

export const coverageRateChartTemplate = (
  data,
  vaccineName,
  startYear,
  district
) => {
  const years = getYearFromData(data);

  const antigenData = aggregateYearAntigenData(data, vaccineName);

  let chart = {
    credits: { ...commonChartOptions.credits },
    chart: {
      type: "column",
      height: { ...commonChartOptions.chart }
    },
    exporting: {
      ...commonChartOptions.exporting,
      chartOptions: {
        ...commonChartOptions.exporting.chartOptions,
        title: {
          text: `Antigen Coverage for ${startYear} for ${
            district === "National" ? "National Level" : district
          }`
        }
      }
    },
    title: {
      text: ""
    },
    xAxis: {
      categories: years,
      labels: {
        ...commonChartOptions.labels
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: "Coverage Rate (%)",
        align: "middle"
      },
      labels: {
        ...commonChartOptions.labels,
        overflow: "justify"
      }
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          format: "{y} %",
          ...commonChartOptions.labels
        }
      }
    },
    tooltip: {
      ...commonChartOptions.lineTooltip
    },
    series: [...antigenData]
  };

  return chart;
};
