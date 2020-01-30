// Highcharts for time series test
import Highcharts from "highcharts";

// Chart Options
import {
  commonChartOptions,
  commonChartPlotOptions
} from "../../../../../../../common/chartOptions/chartOptions";

//  Map utilities

import {
  createDistrictDataMap,
  calculateDropoutRate,
  getPeriodList
} from "../../../../../../../common/utils/mapUtils";

//  Map

let ugandaMap = require("./map.json");

export const dropoutRateCoverageMap = (
  data,
  startYear,

  tabTitle,

  vaccineName
) => {
  let activeVaccine = vaccineName;

  if (vaccineName === "DPT" || vaccineName === "ALL") {
    activeVaccine = "PENTA";
  }

  let mapData = [];

  const districtMapData = createDistrictDataMap(data);

  for (let [key, value] of Object.entries(districtMapData)) {
    const district = key;
    const _data = value[activeVaccine];

    const periodList = getPeriodList(_data, startYear, tabTitle);

    const coverageRate = calculateDropoutRate(_data, periodList);

    // Data District name is in format `District District`.
    // We only want the mane minus the word district at the end for our map
    const districtName = district.replace(/ District/g, "");

    mapData.push([districtName, coverageRate]);
  }

  return {
    ...commonChartOptions,
    chart: {
      map: ugandaMap,
      height: 80 + "%"
    },

    title: {
      text: ""
    },
    mapNavigation: {
      mapNavigation: { ...commonChartOptions.mapNavigation }
    },

    legend: {
      title: {
        text: "Legend"
      },
      align: "left",
      verticalAlign: "bottom",
      floating: true,
      layout: "vertical",
      valueDecimals: 0,
      backgroundColor: "rgba(255,255,255,0.9)",
      symbolRadius: 0,
      symbolHeight: 14
    },

    colorAxis: {
      dataClasses: [
        {
          from: -10,
          to: 20,
          color: "yellow"
        },
        {
          from: -10 - 0,
          to: 10 - 20,
          color: "red"
        },
        {
          from: 0,
          to: 10,
          color: "green"
        }
      ]
    },

    tooltip: {
      formatter: function() {
        return (
          "<b><u>" +
          this.point.properties.name +
          "</u></b><br/><br/>" +
          +Highcharts.numberFormat(this.point.value, 1) +
          " %"
        );
      }
    },

    series: [
      {
        data: mapData,
        keys: ["name", "value"],
        joinBy: "name",
        borderColor: "grey",
        borderWidth: 0.5,
        states: {
          hover: {
            color: "#a4edba"
          }
        }
      }
    ]
  };
};
