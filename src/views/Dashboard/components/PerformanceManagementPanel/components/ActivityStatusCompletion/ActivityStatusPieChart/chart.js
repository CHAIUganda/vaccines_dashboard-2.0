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
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
      backgroundColor: null,
      // marginTop: -50,
      height: 250,
      type: "pie",
    },
    title: "",
    plotOptions: {
      pie: {
        shadow: false,
      },
    },
    tooltip: {
      formatter: function () {
        return "<b>" + this.point.name + "</b>: " + this.y + " %";
      },
    },
    // legend: {
    //   enabled: false,
    // },
    series: [...chartData],
  };

  return chart;
};
