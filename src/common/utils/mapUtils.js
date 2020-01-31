// Various utility functions for maps

const createDistrictDataMap = data => {
  let dataDistrictMap = {};

  for (let i in data) {
    const period = data[i].period;
    const first_dose = data[i].total_first_dose;
    const second_dose = data[i].total_second_dose;
    const third_dose = data[i].total_third_dose;
    const last_dose = data[i].total_last_dose;
    const planned = data[i].total_planned;
    const vaccine = data[i].vaccine__name;
    const district = data[i].district__name;
    const periodYear = Number(period.toString().substr(0, 4));
    const periodMonth = Number(period.toString().substr(4, 6));

    if (!(district in dataDistrictMap)) {
      dataDistrictMap[district] = {};
    }

    if (!(vaccine in dataDistrictMap[district])) {
      dataDistrictMap[district][vaccine] = {};
    }

    if (!(periodYear in dataDistrictMap[district][vaccine])) {
      dataDistrictMap[district][vaccine][periodYear] = {};
    }

    if (!(periodMonth in dataDistrictMap[district][vaccine][periodYear])) {
      dataDistrictMap[district][vaccine][periodYear][periodMonth] = {};
    }

    dataDistrictMap[district][vaccine][periodYear][
      periodMonth
    ].first_dose = first_dose;
    dataDistrictMap[district][vaccine][periodYear][
      periodMonth
    ].last_dose = last_dose;
    dataDistrictMap[district][vaccine][periodYear][
      periodMonth
    ].second_dose = second_dose;
    dataDistrictMap[district][vaccine][periodYear][
      periodMonth
    ].third_dose = third_dose;
    dataDistrictMap[district][vaccine][periodYear][
      periodMonth
    ].planned = planned;
  }

  return dataDistrictMap;
};

const getAggregates = (data, periodList) => {
  const result = periodList.reduce(
    function(acc, period) {
      if (
        data === undefined ||
        data[period[0]] === undefined ||
        data[period[0]][period[1]] === undefined
      )
        return acc;
      const item = data[period[0]][period[1]];
      acc.totalPlanned += item.planned;
      acc.totalFirstDose += item.first_dose;
      acc.totalSecondDose += item.second_dose;
      acc.totalThirdDose += item.third_dose;
      acc.totalLastDose += item.last_dose;
      return acc;
    },
    {
      totalPlanned: 0,
      totalFirstDose: 0,
      totalSecondDose: 0,
      totalThirdDose: 0,
      totalLastDose: 0
    }
  );

  //   console.log(result);

  return result;
};

const getLastValue = (d, defaultValue) => {
  if (d === undefined) return;
  if (defaultValue in d) return defaultValue;
  const keys = Object.keys(d);
  return keys[keys.length - 1];
};

const getPeriodList = (data, endYear, tabTitle) => {
  const periodList = [];

  if (tabTitle === "Monthly (CY)") {
    periodList.push([endYear.toString(), getLastValue(data[endYear], 12)]);
  } else if (tabTitle === "Monthly (FY)") {
    const nextYear = endYear + 1;
    let lastValue;

    if (nextYear in data) {
      lastValue = getLastValue(data[nextYear], 6);
      periodList.push([nextYear.toString(), lastValue]);
    } else {
      lastValue = getLastValue(data[endYear], 12);
      periodList.push([endYear.toString(), lastValue]);
    }
  } else if (tabTitle === "Cummulative (CY)") {
    periodList.push.apply(
      periodList,
      getValuesInRange(
        data,
        endYear,
        1,
        endYear,
        getLastValue(data[endYear], 12)
      )
    );
  } else if (tabTitle === "Cummulative (FY)") {
    const nextYear = endYear + 1;

    if (nextYear in data) {
      periodList.push.apply(
        periodList,
        getValuesInRange(
          data,
          endYear,
          7,
          nextYear,
          getLastValue(data[nextYear], 6)
        )
      );
    } else {
      periodList.push.apply(
        periodList,
        getValuesInRange(
          data,
          endYear,
          7,
          endYear,
          getLastValue(data[endYear], 12)
        )
      );
    }
  }

  return periodList;
};

const getValuesInRange = (data, startYear, startMonth, endYear, endMonth) => {
  let values = [];
  for (let yearIndex in data) {
    if (yearIndex < startYear || yearIndex > endYear) continue;

    for (let monthIndex in data[yearIndex]) {
      if (yearIndex === startYear && monthIndex < startMonth) continue;
      if (yearIndex === endYear && monthIndex > endMonth) continue;
      values.push([yearIndex, monthIndex]);
    }
  }
  return values;
};

const calculateCoverageRate = (data, periodList, doseNumber) => {
  const result = getAggregates(data, periodList);
  let doseValue = result.totalLastDose;
  if (doseNumber === 1) doseValue = result.totalFirstDose;
  else if (doseNumber === 2) doseValue = result.totalSecondDose;
  else if (doseNumber === 3) doseValue = result.totalThirdDose;
  return (doseValue / result.totalPlanned) * 100;
};

const calculateDropoutRate = (data, periodList) => {
  const result = getAggregates(data, periodList);
  return (
    ((result.totalFirstDose - result.totalLastDose) / result.totalFirstDose) *
    100
  );
};

const calculateRedCategoryValue = (data, periodList) => {
  const r = getAggregates(data, periodList);
  const access = (r.totalFirstDose / r.totalPlanned) * 100;
  const dropoutRate =
    ((r.totalFirstDose - r.totalLastDose) / r.totalFirstDose) * 100;

  if (access >= 90 && dropoutRate >= 0 && dropoutRate <= 10) return 1;
  else if (access >= 90 && (dropoutRate < 0 || dropoutRate > 10)) return 2;
  else if (access < 90 && dropoutRate >= 0 && dropoutRate <= 10) return 3;
  else if (access < 90 && (dropoutRate < 0 || dropoutRate > 10)) return 4;
  else return 0;
};

const getLastMapPeriod = (data, endYear, tabTitle) => {
  // var vaccineData = for ([key, value] of Object.entries(districtMapData))sampleDistrictData[vm.activeVaccine];
  // const
  // var periodList = getPeriodList(vaccineData, endYear, tabTitle);
  // return periodList[periodList.length - 1];
};

const generateFullLabelFromPeriod = period => {
  period = period.toString();
  var year = period.substr(0, 4);
  var month = Number(period.substr(4, 2));

  var months = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  return months[month] + " " + year;
};

const generateMapTitle = (
  tabTitle,
  vaccineName,
  dose,
  parentTab,
  reportYear,
  year
) => {
  const duration = tabTitle[0] === "A" ? "Annualized" : "Monthly";
  const vaccine = vaccineName === "ALL" ? "antigens" : vaccineName;
  const period = getLastMapPeriod();
  const fullPeriod = generateFullLabelFromPeriod(period[0] + period[1]);
  let doseNumber = dose.replace("Dose ", "");
  if (vaccineName === "ALL") doseNumber = "";
  const antigenLabel = dose !== undefined ? `${vaccine}${doseNumber}` : vaccine;

  return `${duration} ${parentTab} of ${antigenLabel} for ${fullPeriod} `;
};

export {
  createDistrictDataMap,
  getAggregates,
  calculateCoverageRate,
  getPeriodList,
  generateMapTitle,
  calculateDropoutRate,
  calculateRedCategoryValue
};
