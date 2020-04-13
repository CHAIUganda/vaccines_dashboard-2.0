import Highcharts from "highcharts";
// Chart Options
import { commonChartOptions } from "../../../../../../../common/chartOptions/chartOptions";

// import { getEligibilityChartData } from "../../../../../../../common/utils/coldchain/utils";

export const NumberOfPlannedActivitiesBarChartTemplate = (data, district) => {
  const chart = {
    credits: {
      ...commonChartOptions.credits,
    },
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
      backgroundColor: null,
      height: 240,
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: ["2020 Q1", "2020 Q2", "2020 Q3", "2020 Q4", "2021 Q1"],
    },
    series: [
      {
        type: "column",
        name: "Jane",
        data: [3, 2, 1, 3, 4],
        color: {
          linearGradient: {
            x1: 0,
            x2: 0,
            y1: 0,
            y2: 1,
          },
          stops: [
            [0, "#4E596A"],
            [1, "#9CA2AB"],
          ],
        },
      },

      {
        type: "line",
        name: "Average",
        data: [3, 2.67, 3, 6.33, 3.33],
        marker: {
          lineWidth: 2,
          lineColor: Highcharts.getOptions().colors[3],
          fillColor: "white",
        },
      },
    ],
  };

  return chart;
};
