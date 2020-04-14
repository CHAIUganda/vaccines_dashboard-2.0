import { useContext } from "react";

// Bring in our cold chain context
import { ColdChainContext } from "../../../../../../../context/ColdChain/ColdChainState";

// Chart Options
import {
  commonChartOptions,
  commonChartPlotOptions,
} from "../../../../../../../common/chartOptions/chartOptions";

import { getTemperatureMonitoringChartData } from "../../../../../../../common/utils/coldchain/utils";

export const TemperatureMonitoringBarChartTemplate = () => {
  const { temperatureMonitoring } = useContext(ColdChainContext);

  const { temperatureMonitoringMetricsChartData, year } = temperatureMonitoring;

  const chartData = getTemperatureMonitoringChartData(
    temperatureMonitoringMetricsChartData
  );
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
