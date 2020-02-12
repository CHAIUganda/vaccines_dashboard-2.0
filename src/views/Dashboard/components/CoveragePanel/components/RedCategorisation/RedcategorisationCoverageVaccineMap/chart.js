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
  calculateRedCategoryValue,
  getPeriodList
} from "../../../../../../../common/utils/mapUtils";

//  Map
const ugandaMap = require("../../../../../../../common/maps/map.json");
const ugandaMap2 = require("../../../../../../../common/maps/map2.json");

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
    const districtName = district.replace(/ District/g, "").toUpperCase();

    mapData.push([districtName, coverageRate]);
  }

  // Calculate legend values
  const values = mapData.map(v => v[1]);
  const CAT1 = values.filter(a => a === 1 && a !== null).length;
  const CAT2 = values.filter(a => a === 2 && a !== null).length;
  const CAT3 = values.filter(a => a === 3 && a !== null).length;
  const CAT4 = values.filter(a => a === 4 && a !== null).length;

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
              format: "{point.value:.0f}"
            }
          }
        },
        title: {
          text: `${tabTitle === "Annualized (CY)" ||
            tabTitle === "Annualized (FY)"} Red Categorization of ${
            vaccineName === "ALL" ? "PENTA3" : vaccineName
          } for ${endYear}`
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
          from: 0,
          to: 1.9,
          color: "green",
          legendName: "CAT1",
          count: CAT1
        },
        {
          from: 2,
          to: 2.9,
          color: "yellow",
          legendName: "CAT2",
          count: CAT2
        },
        {
          from: 3,
          to: 3.9,
          color: "orange",
          legendName: "CAT3",
          count: CAT3
        },
        {
          from: 4,
          to: 4.9,
          color: "red",
          legendName: "CAT4",
          count: CAT4
        }
      ]
    },

    tooltip: { ...commonChartOptions.mapTooltip },

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
