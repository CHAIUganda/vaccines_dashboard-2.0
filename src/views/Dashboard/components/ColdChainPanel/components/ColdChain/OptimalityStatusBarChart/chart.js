import { useContext } from "react";

// Bring in our cold chain context
import { ColdChainContext } from "../../../../../../../context/ColdChain/ColdChainState";

// Chart Options
import {
  commonChartOptions,
  commonChartPlotOptions,
} from "../../../../../../../common/chartOptions/chartOptions";

import {
  getOptimalityChartData,
  getQuarters,
} from "../../../../../../../common/utils/coldchain/utils";

export const OptimalityStatusBarChartTemplate = () => {
  const { optimality } = useContext(ColdChainContext);

  const { optimalityMetricsChartData, district } = optimality;

  const data = optimalityMetricsChartData?.optimal_bar_graph_metrics;

  const quarters = getQuarters(data);
  const chartData = getOptimalityChartData(data);

  const chart = {
    chart: {
      type: "column",
      height: "75%",
    },
    credits: { ...commonChartOptions.credits },
    exporting: {
      ...commonChartOptions.exporting,
      chartOptions: {
        ...commonChartOptions.exporting.chartOptions,
        title: {
          text: `Stock Balances of ${district} at the beginning of ${district}`,
        },
      },
      title: "",
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: quarters,
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
