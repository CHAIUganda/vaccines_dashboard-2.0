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
  calculateRedCategoryValue,
  getPeriodList
} from "../../../../../../../common/utils/mapUtils";

//  Map

let ugandaMap = require("./map.json");
// let ugandaMap2 = require("./map2.json");

export const redcategorisationCoverageMap = (
  data,
  endYear,
  tabTitle,
  dose,
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

    const periodList = getPeriodList(_data, endYear, tabTitle);

    const coverageRate = calculateRedCategoryValue(_data, periodList);

    // Data District name is in format `District District`.
    // We only want the mane minus the word district at the end for our map
    const districtName = district.replace(/ District/g, "");

    mapData.push([districtName, coverageRate]);
  }

  return {
    ...commonChartOptions,
    chart: {
      map: ugandaMap,
      height: 100 + "%"
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
          from: 0,
          to: 1.9,
          color: "green"
        },
        {
          from: 2,
          to: 2.9,
          color: "yellow"
        },
        {
          from: 3,
          to: 3.9,
          color: "orange"
        },
        {
          from: 4,
          to: 4.9,
          color: "red"
        }
      ]
    },

    tooltip: {
      formatter: function() {
        return (
          "<b><u>" +
          this.point.properties.name +
          "</u></b><br/><br/>" +
          +Highcharts.numberFormat(this.point.value, 2)
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
