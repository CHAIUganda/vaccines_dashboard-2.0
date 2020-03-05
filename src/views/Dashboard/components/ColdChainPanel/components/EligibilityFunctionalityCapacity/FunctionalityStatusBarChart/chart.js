// Chart Options
import {
  commonChartOptions,
  commonChartPlotOptions
} from "../../../../../../../common/chartOptions/chartOptions";

import {
  getFunctionalityChartData,
  getYearHalfsFromData,
  getUniqueYearsFromData
} from "../../../../../../../common/utils/coldchain/utils";

export const FunctionalityStatusBarChartTemplate = (data, district) => {
  const years = getUniqueYearsFromData(data);
  const chartData = getFunctionalityChartData(data, years);

  const chart = {
    chart: {
      type: "column",
      height: "75%"
    },
    credits: { ...commonChartOptions.credits },
    exporting: {
      ...commonChartOptions.exporting,
      chartOptions: {
        ...commonChartOptions.exporting.chartOptions,
        title: {
          //   text: `Stock Balances of ${vaccine} at the beginning of ${startMonth}`
        }
      },
      title: ""
    },
    title: {
      text: ""
    },
    xAxis: {
      categories: [2019]
    },
    yAxis: { visible: false },
    plotOptions: {
      column: {
        ...commonChartPlotOptions.plotOptions.column,
        stacking: "normal",
        dataLabels: {
          enabled: true
        }
      }
    },
    series: [...chartData],
    series2: [
      {
        name: "Working",
        data: [54],
        stack: "H1",
        color: "green"
      },
      {
        name: "Not Working",
        data: [21],
        stack: "H1",
        color: "red"
      },
      {
        name: "Needs Repair",
        data: [90],
        stack: "H1",
        color: "orange"
      },
      {
        name: "Working",
        data: [0],
        stack: "H2",
        color: "green"
      },
      {
        name: "Not Working",
        data: [0],
        stack: "H2",
        color: "red"
      },
      {
        name: "Needs Repair",
        data: [0],
        stack: "H2",
        color: "orange"
      }
    ]
  };

  console.log(chart.series2);
  console.log(chart.series);
  return chart;
};
