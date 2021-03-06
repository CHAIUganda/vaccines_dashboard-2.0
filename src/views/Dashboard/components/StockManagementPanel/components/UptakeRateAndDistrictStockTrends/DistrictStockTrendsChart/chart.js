import { useContext } from "react";

// Bring in our stock management context
import { StockManagementContext } from "../../../../../../../context/StockManagement/StockManagementState";

// Highcharts for time series test
import Highcharts from "highcharts";

// Chart Options
import {
  commonChartOptions,
  commonChartPlotOptions,
} from "../../../../../../../common/chartOptions/chartOptions";

// Utility functions
import { getStockChartData } from "../../../../../../../common/utils/stockmanagement/utils";

export const DistrictStockTrendsChartTemplate = () => {
  const { districtStockTrends } = useContext(StockManagementContext);

  const {
    stockByDistrictVaccineStockTrendData,
    endMonth,
    vaccine,
    district,
  } = districtStockTrends;

  const chartData = getStockChartData(
    stockByDistrictVaccineStockTrendData,
    endMonth,
    "column_district_stock_trends"
  );

  // Used to determine the width of the bars we render.
  const dataLength = chartData[0].data.length;

  return {
    credits: {
      ...commonChartOptions.credits,
    },
    chart: {
      type: "column",
      ...commonChartOptions.chart,
    },
    exporting: {
      ...commonChartOptions.exporting,
      chartOptions: {
        ...commonChartOptions.exporting.chartOptions,
        title: {
          text: `${district} stock level monthly trends for ${vaccine}`,
        },
      },
    },
    title: {
      text: "",
    },
    xAxis: {
      type: "datetime",
      labels: {
        ...commonChartOptions.labels,
      },
    },
    yAxis: {
      labels: {
        ...commonChartOptions.labels,
      },
      min: 0,
    },
    plotOptions: {
      column: {
        ...(dataLength > 6
          ? { ...commonChartPlotOptions.plotOptions.columnCondensed }
          : { ...commonChartPlotOptions.plotOptions.column }),
        dataLabels: {
          enabled: true,
          rotation: -90,
          align: "right",
          format: "{y:,.0f}",
          ...commonChartOptions.labels,
        },
      },
    },
    tooltip: {
      ...commonChartOptions.lineTooltip,
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
      shadow: true,
    },
    series: [...chartData],
  };
};
