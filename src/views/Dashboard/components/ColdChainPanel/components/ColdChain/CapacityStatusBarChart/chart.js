import { useContext } from "react";

// Bring in our cold chain context
import { ColdChainContext } from "../../../../../../../context/ColdChain/ColdChainState";

// Chart Options
import {
  commonChartOptions,
  commonChartPlotOptions,
} from "../../../../../../../common/chartOptions/chartOptions";

import {
  getCapacityChartData,
  getQuarters,
} from "../../../../../../../common/utils/coldchain/utils";

export const CapacityStatusBarChartTemplate = () => {
  const { capacity } = useContext(ColdChainContext);

  const { capacityMetricsChartData, district } = capacity;

  const data = capacityMetricsChartData?.required_available_comparison_metrics;

  const quarters = getQuarters(data);
  const chartData = getCapacityChartData(data);

  const chart = {
    chart: {
      type: "column",
      height: "75%",
      plotBackgroundColor: null,
      plotBorderWidth: null,
      backgroundColor: null,
      plotShadow: false,
    },
    credits: { ...commonChartOptions.credits },
    exporting: {
      ...commonChartOptions.exporting,
      chartOptions: {
        ...commonChartOptions.exporting.chartOptions,
        title: {
          text: `Storage capacity in litres at ${
            district === "national" ? "at National Level" : "in " + district
          }`,
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
        // stacking: "normal",
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: [...chartData],
  };

  return chart;
};
