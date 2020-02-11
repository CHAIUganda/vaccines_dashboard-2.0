// Highcharts for time series test
import Highcharts from "highcharts";

// Chart Options
import {
  commonChartOptions,
  mapLegend
} from "../../../../../../../common/chartOptions/chartOptions";

//  Map utilities

import {
  createDistrictDataMap,
  calculateDropoutRate,
  getPeriodList
} from "../../../../../../../common/utils/mapUtils";

//  Map
const ugandaMap = require("../../../../../../../common/maps/map.json");
const ugandaMap2 = require("../../../../../../../common/maps/map2.json");

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
    const districtName = district.replace(/ District/g, "").toUpperCase();

    mapData.push([districtName, coverageRate]);
  }

  // Calculate legend values
  const values = mapData.map(v => v[1]);

  const between_negative_10_to_0 = values.filter(
    a => a >= -10 && a <= 0 && a !== undefined
  ).length;

  const between_0_and_10 = values.filter(
    a => a >= 0 && a <= 10 && a !== undefined
  ).length;

  const between_negative_10_to_20 = values.filter(
    a => a >= -10 && a <= 20 && a !== undefined
  ).length;

  return {
    credits: {
      ...commonChartOptions.credits
    },
    chart: {
      map: ugandaMap2,
      height: 74 + "%"
    },
    exporting: {
      scale: 2,
      width: 1200,
      chartOptions: {
        plotOptions: {
          series: {
            dataLabels: {
              enabled: true,
              format: "{point.value:.0f} %"
            }
          }
        },
        title: {
          text: `${tabTitle === "Annualized (CY)" ||
            tabTitle === "Annualized (FY)"} Dropout Rate  of ${
            vaccineName === "ALL" ? "PENTA3" : vaccineName
          } for ${startYear}`
        }
      },
      buttons: {
        ...commonChartOptions.exporting.buttons
      },
      fallbackToExportServer: false
    },
    title: {
      text: ""
    },
    mapNavigation: {
      mapNavigation: { ...commonChartOptions.mapNavigation }
    },

    legend: {
      ...mapLegend
    },

    colorAxis: {
      dataClasses: [
        {
          from: -10,
          to: 20,
          color: "yellow",
          count: between_negative_10_to_20,
          legendName: "<- 10 & < 20"
        },
        {
          from: -10 - 0,
          to: -10,
          color: "red",
          count: between_negative_10_to_0,
          legendName: "(-10-0) & (10-20)"
        },
        {
          from: 0,
          to: 10,
          color: "green",
          count: between_0_and_10,
          legendName: "0-10"
        }
      ]
    },

    tooltip: {
      ...commonChartOptions.mapTooltip
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
