// Chart Options
import {
  commonChartOptions,
  mapLegend,
} from "../../../../../../../common/chartOptions/chartOptions";

//  Map utilities

import {
  createDistrictDataMap,
  calculateCoverageRate,
  getPeriodList,
} from "../../../../../../../common/utils/mapUtils";

//  Map

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

  // Calculate legend values
  const values = mapData.map((v) => v[1]);
  const below_50 = values.filter((a) => a < 50).length;
  const between_50_to_89 = values.filter((a) => a > 50 && a <= 89 && a !== null)
    .length;
  const above_90 = values.filter((a) => a >= 89.9 && a !== null).length;

  return {
    credits: {
      ...commonChartOptions.credits,
    },
    chart: {
      map: ugandaMap2,
      height: 74 + "%",
    },
    exporting: {
      scale: 2,
      width: 1200,
      chartOptions: {
        plotOptions: {
          series: {
            dataLabels: {
              enabled: true,
              format: "{point.value:.0f} %",
            },
          },
        },
        title: {
          text: `${
            tabTitle === "Annualized (CY)" || tabTitle === "Annualized (FY)"
          } Coverage of ${
            vaccineName === "ALL" ? "PENTA3" : vaccineName
          } for ${startYear}`,
        },
      },

      buttons: {
        ...commonChartOptions.exporting.buttons,
      },
      fallbackToExportServer: false,
    },
    title: {
      text: "",
    },
    mapNavigation: {
      mapNavigation: { ...commonChartOptions.mapNavigation },
    },
    legend: {
      ...mapLegend,
    },
    colorAxis: {
      dataClasses: [
        {
          from: -1,
          to: 50,
          color: "red",
          count: below_50,
          legendName: "<50%",
        },
        {
          from: 50.1,
          to: 89.9,
          color: "yellow",
          count: between_50_to_89,
          legendName: "50% - 89%",
        },
        {
          from: 89.9,
          color: "green",
          count: above_90,
          legendName: ">=90%",
        },
      ],
    },

    tooltip: {
      ...commonChartOptions.mapTooltip,
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
            color: "#a4edba",
          },
        },
      },
    ],
  };
};
