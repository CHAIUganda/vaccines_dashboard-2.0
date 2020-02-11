//  Highcharts
import Highcharts from "highcharts";

// Chart Options
import { commonChartOptions } from "../../../../../../../common/chartOptions/chartOptions";

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
      type: "datetime"
    },

    tooltip: {
      formatter: function() {
        return (
          "<br/>" +
          this.point.series.name +
          ": " +
          Highcharts.numberFormat(this.point.y, 0)
        );
      }
    },

    yAxis: {
      min: 0
    },
    plotOptions: {
      line: {
        lineWidth: 1,
        marker: {
          enabled: false
        }
      }
    },
    series: [...chartData]
  };
};
