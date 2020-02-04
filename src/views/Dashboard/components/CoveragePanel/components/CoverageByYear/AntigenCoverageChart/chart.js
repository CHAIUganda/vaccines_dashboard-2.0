// Chart Options
import {
  commonChartOptions,
  commonChartPlotOptions
} from "../../../../../../../common/chartOptions/chartOptions";

// Utility functions
import {
  aggregateData,
  calculateCoverageRate,
  getYearFromData,
  aggregateYearAntigenData
} from "../../../../../../../common/utils/utils";

export const coverageRateChartTemplate = (data, vaccineName) => {
  const years = getYearFromData(data);

  const antigenData = aggregateYearAntigenData(data, vaccineName);

  let chart = {
    ...commonChartOptions,
    chart: {
      type: "column",
      height: 500
    },
    title: {
      text: ""
    },
    xAxis: {
      categories: years
    },
    yAxis: {
      min: 0,
      title: {
        text: "Coverage Rate (%)",
        align: "middle"
      },
      labels: {
        overflow: "justify"
      }
    },
    plotOptions: {
      column: {
        ...commonChartPlotOptions.plotOptions.column,
        dataLabels: {
          enabled: true,
          format: "{y} %"
        }
      }
    },
    series: [...antigenData]
  };

  return chart;
};
