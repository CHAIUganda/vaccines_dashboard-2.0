// Chart Options
import { commonChartOptions } from "../../../../../../../common/chartOptions/chartOptions";

// import { getEligibilityChartData } from "../../../../../../../common/utils/coldchain/utils";

export const ActivityByResponsibleOrganisationChartTemplate = (
  data,
  district
) => {
  return {
    credits: {
      ...commonChartOptions.credits,
    },

    chart: {
      type: "bar",
      height: 600,
      backgroundColor: null,
    },
    title: {
      text: "",
    },
    // subtitle: {
    //   text:
    //     'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>',
    // },
    xAxis: {
      categories: [
        "AFENET",

        "CDC",

        "CHAI",

        "GoU",

        "JSI",

        "HSS2/GAVI",

        "PATH",

        "UNICEF",

        "PBF/Gavi",

        "WHO",

        "WHO(PEP 2019)",
      ],
      title: {
        text: null,
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Population (millions)",
        align: "high",
      },
      labels: {
        overflow: "justify",
      },
    },
    tooltip: {
      valueSuffix: " millions",
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    // legend: {
    //   layout: "vertical",
    //   align: "right",
    //   verticalAlign: "top",
    //   x: -40,
    //   y: 80,
    //   floating: true,
    //   borderWidth: 1,
    //   // backgroundColor:
    //   //     Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
    //   shadow: true,
    // },
    // credits: {
    //     enabled: false
    // },
    series: [
      {
        name: "Year 2016",
        data: [107, 31, 635, 203, 133, 156, 947, 408, 68, 99, 102],
        color: "#FC6F6F",
      },
      {
        name: "Year 2017",
        data: [107, 31, 635, 203, 133, 156, 947, 408, 68, 99, 102].reverse(),
        color: "#4E596A",
      },
    ],
  };
};
