import { useContext } from "react";

// Bring in our cold chain context
import { OverviewContext } from "../../../../../../context/Overview/OverviewState";

// Chart Options
import { commonChartOptions } from "../../../../../../common/chartOptions/chartOptions";

import { getFunctionalityChartData } from "../../../../../../common/utils/coldchain/utils";

export const FunctionalityPieChartTemplate = () => {
  const { coldChainfunctionalityData } = useContext(OverviewContext);

  const { functionalityMetricsChartData } = coldChainfunctionalityData;

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

        // {
        //   text: `Eligible facilities ${
        //     district === "national" ? "at National Level" : "in " + district
        //   }`,
        // },
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
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
