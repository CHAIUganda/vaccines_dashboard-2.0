// Chart Options
import { commonChartOptions } from "../../../../../../../common/chartOptions/chartOptions";

export const BudgetAllocationBarChartTemplate = (data, district) => {
  const chart = {
    credits: { ...commonChartOptions.credits },
    chart: {
      type: "column",
      height: 280,
      backgroundColor: null,
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: [
        "2020 Q1",
        "2020 Q2",
        "2020 Q3",
        "2020 Q4",
        "2021 Q1",
        "2021 Q2",
      ],
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Rainfall (mm)",
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "Tokyo",
        data: [49.9, 71.5, 106.4, 129.2, 82.8, 56.2],
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
    ],
  };
  return chart;
};
