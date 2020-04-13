// Chart Options
import { commonChartOptions } from "../../../../../../../common/chartOptions/chartOptions";

// import { getEligibilityChartData } from "../../../../../../../common/utils/coldchain/utils";

export const ActivityStatusChartTemplate = (data, district) => {
  const chart = {
    credits: {
      ...commonChartOptions.credits,
    },
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
      backgroundColor: null,
      marginTop: -50,
      height: 280,
      type: "pie",
    },
    title: "",
    yAxis: {
      title: {
        text: "Total percent market share",
      },
    },
    plotOptions: {
      pie: {
        shadow: false,
      },
    },
    tooltip: {
      formatter: function () {
        return "<b>" + this.point.name + "</b>: " + this.y + " %";
      },
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        name: "Browsers",
        data: [
          {
            name: "Not Done",
            y: 30.4,
            color: "#F8E658",
          },
          {
            name: "Completed",
            y: 63.6,
            color: "#4E596A",
          },
          {
            name: "Ongoing",
            y: 6,
            color: "#FC6F6F",
          },
        ],
        size: "60%",
        innerSize: "80%",
        showInLegend: true,
        dataLabels: {
          enabled: false,
        },
      },
    ],
  };

  return chart;
};
