// Utility functions
import { getStockChartData } from "../../../../../../../common/utils/stockmanagement/utils";

// Chart Options
import { commonChartOptions } from "../../../../../../../common/chartOptions/chartOptions";

export const StockBalancesPieChartTemplate = (
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
    "piechart"
  );

  return {
    credits: { ...commonChartOptions.credits },
    chart: {
      type: "pie",
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      ...commonChartOptions.chart
    },
    exporting: {
      ...commonChartOptions.exporting,
      chartOptions: {
        ...commonChartOptions.exporting.chartOptions,
        title: {
          text: `Stock Balances of ${vaccine} at the beginning of ${startMonth}`
        }
      }
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,

          formatter: function() {
            return this.point.name + " " + this.percentage.toFixed(0) + "%";
          }
        }
      }
    },

    title: "",
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
    },
    series: [chartData]
  };
};
