//  Highcharts
import Highcharts from "highcharts";

// Chart Options
import {
  commonChartOptions,
  commonChartPlotOptions
} from "../../../../../../../common/chartOptions/chartOptions";

// Utility functions
import { getStockChartData } from "../../../../../../../common/utils/stockmanagement/utils";

export const RefillRateLineChartTemplate = (
  data,
  isLoading,
  endMonth,
  startMonth,
  district,
  vaccine
) => {
  const chartData = getStockChartData(
    data,
    isLoading,
    endMonth,
    startMonth,
    district,
    vaccine,
    "line"
  );

  const monthsInYear = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ];

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
