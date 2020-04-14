// Chart Options
import { commonChartOptions } from "../../../../../../../common/chartOptions/chartOptions";

import { getActivityCompletionStatusChartData } from "../../../../../../../common/utils/performancemanagement/utils";

export const ActivityStatusChartTemplate = (data) => {
  const chartData = getActivityCompletionStatusChartData(data);

  const chart = {
    credits: {
      ...commonChartOptions.credits,
    },
    chart: {
      type: "pie",
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      backgroundColor: null,
      plotShadow: false,
      height: 320,
    },
    title: "",
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
        },
        showInLegend: true,
      },
      series: {
        dataLabels: {
          enabled: true,
          formatter: function () {
            return Math.round(this.percentage * 100) / 100 + " %";
          },
          distance: -30,
          color: "white",
        },
      },
    },
    tooltip: {
      formatter: function () {
        return "<b>" + this.point.name + "</b>: " + this.y + " %";
      },
    },

    series: [...chartData],
  };

  return chart;
};
