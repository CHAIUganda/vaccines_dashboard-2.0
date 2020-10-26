import { useContext } from "react";

// Bring in our cold chain context
import { ColdChainContext } from "../../../../../../../context/ColdChain/ColdChainState";

// Chart Options
import {
  commonChartOptions,
  commonChartPlotOptions,
} from "../../../../../../../common/chartOptions/chartOptions";

import { getTemperatureMonitoringReportRateChartData } from "../../../../../../../common/utils/coldchain/utils";

export const TemperatureMonitoringReportRateChartTemplate = () => {
  const { temperatureMonitoring } = useContext(ColdChainContext);

  const {
    temperatureMonitoringReportingRatesData,
    year,
  } = temperatureMonitoring;

  const data =
    temperatureMonitoringReportingRatesData?.submission_percentages_graph_data;

  // Extract submissions_percentages from data object
  const _data = data && Object.values(data[0]);

  const chartData = getTemperatureMonitoringReportRateChartData(_data && _data);

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
    tooltip: {
      pointFormat:
        "Reporting Rate: <b>{point.y}%</b><br/>Number of reporting facilities in district: <b>{point.districts}",
      shared: true,
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
