import { useContext } from "react";

// Bring in our cold chain context
import { ColdChainContext } from "../../../../../../../context/ColdChain/ColdChainState";

// Chart Options
import {
  commonChartOptions,
  commonChartPlotOptions,
} from "../../../../../../../common/chartOptions/chartOptions";

import {
  getFunctionalityChartData,
  getQuarters,
} from "../../../../../../../common/utils/coldchain/utils";

export const FunctionalityStatusBarChartTemplate = () => {
  const { functionality } = useContext(ColdChainContext);

  const { functionalityMetricsChartData } = functionality;

  const quarters = getQuarters(functionalityMetricsChartData);
  const chartData = getFunctionalityChartData(
    functionalityMetricsChartData,
    "bar"
  );

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
          //   text: `Stock Balances of ${vaccine} at the beginning of ${startMonth}`
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
    legend: { show: false },

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
