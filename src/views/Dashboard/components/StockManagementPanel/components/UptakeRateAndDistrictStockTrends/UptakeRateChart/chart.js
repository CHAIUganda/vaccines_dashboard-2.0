// Highcharts for time series test
import Highcharts from "highcharts";

// Chart Options
import {
  commonChartOptions,
  commonChartPlotOptions
} from "../../../../../../../common/chartOptions/chartOptions";

// Utility functions
import { getStockChartData } from "../../../../../../../common/utils/stockmanagement/utils";

export const uptakeRateChartTemplate = (
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
    "column_uptake_rate"
  );

  return {
    credits: {
      ...commonChartOptions.credits
    },
    chart: {
      type: "column",
      ...commonChartOptions.chart
    },
    exporting: {
      ...commonChartOptions.exporting,
      chartOptions: {
        ...commonChartOptions.exporting.chartOptions,
        title: {
          text: `Uptake rate of ${vaccine} for ${district}`
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
    yAxis: {
      labels: {
        ...commonChartOptions.labels
      },
      min: 0
    },
    plotOptions: {
      column: {
        ...commonChartPlotOptions.plotOptions.column,
        dataLabels: {
          enabled: true,
          format: "{y:,.0f}",
          ...commonChartOptions.labels
        }
      }
    },
    tooltip: {
      ...commonChartOptions.lineTooltip
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "top",
      x: -40,
      y: 80,
      floating: true,
      borderWidth: 1,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || "#FFFFFF",
      shadow: true
    },
    series: [...chartData]
  };
};
