// Chart Options
import {
  commonChartOptions,
  commonChartPlotOptions
} from "../../../../../../../common/chartOptions/chartOptions";

import {
  getCapacityChartData,
  getQuarters
} from "../../../../../../../common/utils/coldchain/utils";

export const CapacityStatusBarChartTemplate = (data, district) => {
  const quarters = getQuarters(data.required_available_comparison_metrics);
  const chartData = getCapacityChartData(
    data.required_available_comparison_metrics
  );

  const chart = {
    chart: {
      type: "column",
      height: "75%"
    },
    credits: { ...commonChartOptions.credits },
    exporting: {
      ...commonChartOptions.exporting,
      chartOptions: {
        ...commonChartOptions.exporting.chartOptions,
        title: {
          text: `Stock Balances of ${district} at the beginning of ${district}`
        }
      },
      title: ""
    },
    title: {
      text: ""
    },
    xAxis: {
      categories: quarters
    },
    yAxis: { visible: false },
    plotOptions: {
      column: {
        ...commonChartPlotOptions.plotOptions.column,
        stacking: "normal",
        dataLabels: {
          enabled: true
        }
      }
    },
    series: [...chartData]
  };

  return chart;
};
