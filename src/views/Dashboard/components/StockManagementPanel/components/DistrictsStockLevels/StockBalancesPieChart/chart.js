// Utility functions
import { getStockChartData } from "../../../../../../../common/utils/stockmanagement/utils";

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

    series: [chartData]
  };
};
