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
  calculateCoverageRate,
  getPeriodList
} from "../../../../../../../common/utils/mapUtils";

//  Map

const ugandaMap = require("../../../../../../../common/maps/map.json");
const ugandaMap2 = require("../../../../../../../common/maps/map2.json");

export const vaccineAnnualizedCoverage = (
  data,
  startYear,
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

    const periodList = getPeriodList(_data, startYear, tabTitle);

    // Get Dose number from dose
    const doseNumber = parseInt(dose[dose.length - 1]);
    const coverageRate = calculateCoverageRate(_data, periodList, doseNumber);

    // Data District name is in format `District District`.
    // We only want the mane minus the word district at the end for our map
    const districtName = district.replace(/ District/g, "").toUpperCase();

    mapData.push([districtName, coverageRate]);
  }

  return {
    ...commonChartOptions,
    chart: {
      map: ugandaMap2,
      height: 79 + "%"
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
      verticalAlign: "top",
      floating: true,
      layout: "vertical",
      valueDecimals: 0,
      backgroundColor: "rgba(255,255,255,0.9)",
      symbolRadius: 0,
      symbolHeight: 14,
      // x: 90,
      y: 45,
      labelFormatter: function() {
        return this.name + "  ";
      }
    },
    colorAxis: {
      dataClasses: [
        {
          to: 50,
          color: "red"
        },
        {
          from: 50.1,
          to: 89.9,
          color: "yellow"
        },
        {
          from: 90,
          color: "green"
        }
      ]
    },

    tooltip: {
      formatter: function() {
        return (
          "<b><u>" +
          this.point.properties.DName2018 +
          "</u></b><br/><br/>" +
          +Highcharts.numberFormat(this.point.value, 1) +
          " %"
        );
      }
    },

    series: [
      {
        data: mapData,
        keys: ["DName2018", "value"],
        joinBy: "DName2018",
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
