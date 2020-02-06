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
    ...commonChartOptions,
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
      height: 550
    },
    title: "Pie Chart",
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
    },
    series: [chartData]
  };
};
