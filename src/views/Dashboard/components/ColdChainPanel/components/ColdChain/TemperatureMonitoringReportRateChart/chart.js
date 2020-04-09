// Chart Options
import {
  commonChartOptions,
  commonChartPlotOptions,
} from "../../../../../../../common/chartOptions/chartOptions";

import { getTemperatureMonitoringReportRateChartData } from "../../../../../../../common/utils/coldchain/utils";

export const TemperatureMonitoringReportRateChartTemplate = (
  data,
  district,
  year,
  month
) => {
  // Extract submissions_percentages from data object
  const _data = Object.values(data.submission_percentages_graph_data[0]);
  const chartData = getTemperatureMonitoringReportRateChartData(_data);
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
      type: "line",
    },
    credits: { ...commonChartOptions.credits },
    exporting: {
      ...commonChartOptions.exporting,
      chartOptions: {
        ...commonChartOptions.exporting.chartOptions,
        title: {
          text: `Proportion of districts submitting temperature data for ${year}`,
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
    yAxis: {
      title: {
        text: "Percentage (%)",
      },
      labels: {
        ...commonChartOptions.labels,
      },
    },
    plotOptions: {
      line: {
        ...commonChartPlotOptions.plotOptions.line,
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: [...chartData],
  };

  return chart;
};
