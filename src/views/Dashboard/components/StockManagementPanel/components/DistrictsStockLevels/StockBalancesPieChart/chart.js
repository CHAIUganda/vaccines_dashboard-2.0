// Highcharts
import Highcharts from "highcharts";

// Chart Options
import {
  commonChartOptions,
  commonChartPlotOptions
} from "../../../../../../../common/chartOptions/chartOptions";

// Utility functions
import { getStockChartData } from "../../../../../../../common/utils/stockmanagement/utils";

export const StockBalancesPieChartTemplate = (
  data,
  isLoading,
  endMonth,
  startMonth,
  district,
  vaccine
) => {
  const chattData = getStockChartData(
    data,
    isLoading,
    endMonth,
    startMonth,
    district,
    vaccine,
    "chart"
  );

  return {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie"
    },
    title: "Pie Chart",
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: false
        },
        showInLegend: true
      }
    },
    // ...commonChartOptions,
    series: [chattData]
  };
};
