// Chart Options
import {
  commonChartOptions,
  commonChartPlotOptions
} from "../../../../../../../common/chartOptions/chartOptions";

// Utility functions
import { getStockChartData } from "../../../../../../../common/utils/stockmanagement/utils";

export const RefillRateLineChartTemplate = (
  data,
  endMonth,
  startMonth,
  district,
  vaccine
) => {
  const chartData = getStockChartData(
    data,
    endMonth,
    startMonth,
    district,
    vaccine,
    "line"
  );

  return {
    credits: {
      ...commonChartOptions.credits
    },
    exporting: {
      ...commonChartOptions.exporting,
      chartOptions: {
        ...commonChartOptions.exporting.chartOptions,
        title: {
          text: `Distribution of ${vaccine} for ${district}`
        }
      }
    },
    title: {
      text: ""
    },
    xAxis: {
      type: "datetime",
      labels: {
        ...commonChartOptions.labels
      }
    },

    tooltip: {
      ...commonChartOptions.lineTooltip
    },

    yAxis: {
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
    series: [...chartData]
  };
};
