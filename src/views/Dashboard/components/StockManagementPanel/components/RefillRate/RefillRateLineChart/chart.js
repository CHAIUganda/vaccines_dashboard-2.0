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
    ...commonChartOptions,
    title: {
      text: ""
    },
    xAxis: {
      //   categories: monthsInYear
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
      title: {
        text: "Percentage (%)"
      },
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
