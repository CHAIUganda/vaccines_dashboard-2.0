import { useContext } from "react";

// Bring in our stock management context
import { StockManagementContext } from "../../../../../../../context/StockManagement/StockManagementState";

// Utility functions
import { getStockChartData } from "../../../../../../../common/utils/stockmanagement/utils";

// Chart Options
import { commonChartOptions } from "../../../../../../../common/chartOptions/chartOptions";

export const StockBalancesPieChartTemplate = () => {
  const { districtStockLevels } = useContext(StockManagementContext);

  const { atHandStockLevelsData, endMonth, vaccine } = districtStockLevels;

  const chartData = getStockChartData(
    atHandStockLevelsData,
    endMonth,
    "piechart"
  );

  return {
    credits: { ...commonChartOptions.credits },
    chart: {
      type: "pie",
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      ...commonChartOptions.chart,
    },
    exporting: {
      ...commonChartOptions.exporting,
      chartOptions: {
        ...commonChartOptions.exporting.chartOptions,
        title: {
          text: `Stock Balances of ${vaccine} at the beginning of ${endMonth}`,
        },
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          ...commonChartOptions.labels,
          formatter: function () {
            return this.point.name + " " + this.percentage.toFixed(0) + "%";
          },
        },
      },
    },

    title: "",
    tooltip: {
      ...commonChartOptions.pieToolTip,
    },
    series: [chartData],
  };
};
