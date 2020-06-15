import { useContext } from "react";

// Bring in our cold chain context
import { OverviewContext } from "../../../../../../context/Overview/OverviewState";

// Chart Options
import { commonChartOptions } from "../../../../../../common/chartOptions/chartOptions";

import { getFunctionalityChartData } from "../../../../../../common/utils/coldchain/utils";

export const FunctionalityPieChartTemplate = () => {
  const { coldChainFunctionalityData } = useContext(OverviewContext);

  const { functionalityMetricsChartData } = coldChainFunctionalityData;

  const chartData = getFunctionalityChartData(
    functionalityMetricsChartData,
    "pie"
  );

  const chart = {
    chart: {
      type: "pie",
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      height: 270,
      backgroundColor: null,
    },
    credits: { ...commonChartOptions.credits },
    exporting: {
      ...commonChartOptions.exporting,
      chartOptions: {
        ...commonChartOptions.exporting.chartOptions,
        title: "",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        // dataLabels: {
        //   enabled: false,
        // },
        showInLegend: true,
      },
      series: {
        dataLabels: {
          enabled: true,
          formatter: function () {
            return Math.round(this.percentage * 100) / 100 + " %";
          },
          // distance: -30,
          color: "white",
        },
      },
    },

    title: "",
    tooltip: {
      ...commonChartOptions.pieToolTip,
    },
    series: chartData,
  };

  return chart;
};
