// Chart Options
import { commonChartOptions } from "../../../../../../../common/chartOptions/chartOptions";

import { getEligibilityChartData } from "../../../../../../../common/utils/coldchain/utils";

export const EligibilityStatusPieChartTemplate = (data, district) => {
  const chartData = getEligibilityChartData(data.cce_coverage_pie_chart);

  const chart = {
    chart: {
      type: "pie",
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      height: 80 + "%",
    },
    credits: { ...commonChartOptions.credits },
    exporting: {
      ...commonChartOptions.exporting,
      chartOptions: {
        ...commonChartOptions.exporting.chartOptions,
        title: {
          text: `Eligible facilities ${
            district === "national" ? "at National Level" : "in " + district
          }`,
        },
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
    series: [chartData],
  };

  return chart;
};
