// Chart Options
import {
  commonChartOptions,
  commonChartPlotOptions,
} from "../../../../../../../common/chartOptions/chartOptions";

import { getTemperatureMonitoringChartData } from "../../../../../../../common/utils/coldchain/utils";

export const TemperatureMonitoringBarChartTemplate = (
  data,
  district,
  year,
  month
) => {
  const chartData = getTemperatureMonitoringChartData(data);
  const monthsInYear = [
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
    "Dec",
  ];

  const chart = {
    chart: {
      type: "column",
      // height: "75%"
    },
    credits: { ...commonChartOptions.credits },
    exporting: {
      ...commonChartOptions.exporting,
      chartOptions: {
        ...commonChartOptions.exporting.chartOptions,
        title: {
          text: `Total number of freeze and heat alarms for ${year}`,
        },
      },
      title: "",
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: monthsInYear,
    },
    yAxis: { visible: false },
    plotOptions: {
      column: {
        ...commonChartPlotOptions.plotOptions.column,
        stacking: "normal",
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: [...chartData],
  };

  return chart;
};
