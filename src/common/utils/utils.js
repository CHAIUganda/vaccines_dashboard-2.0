// Various utility functions for graphs
const _ = require("underscore");

const getYearFromData = data => {
  // Years returned as 201902 (year + period)
  // We map the period, cast it to string and remove the period and return unique years
  const periods = data.map(period => String(period.period).slice(0, -2));
  const years = [...new Set(periods)];
  return years;
};

const getMonthFromPeriod = period => {
  period = period.toString();
  return Number(period.substr(4, 2));
};

const getYearFromPeriod = period => {
  period = period.toString();
  return Number(period.substr(0, 4));
};

const getPeriodsFromData = data => {
  const periods = [...new Set(data.map(p => p.period))];

  return periods;
};

const getYearRangeFromData = periodRangesData => {
  const years = periodRangesData.years;
};

const getMonthsFromPeriod = periods => {
  const months = [];
  periods.forEach(uniquePeriod => {
    uniquePeriod = uniquePeriod.toString();
    months.push(Number(uniquePeriod.substr(4, 2)));
  });
  return months;
};

const getMonthsFromPeriodNumber = (months, yearType) => {
  const monthsInYear = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ];
  const monthsFinancialYear = [
    "",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun"
  ];
  const monthsToReturn = [];

  months.forEach(month => {
    yearType === "CY"
      ? monthsToReturn.push(monthsInYear[month])
      : monthsToReturn.push(monthsFinancialYear[month]);
  });

  return monthsToReturn;
};

const aggregateData = (data, vaccine, fieldToAggregate) => {
  let aggregateData = [];
  const periods = [...new Set(data.map(p => p.period))];

  periods.forEach(uniquePeriod => {
    let periodTotal = data
      .filter(({ period }) => period === uniquePeriod)
      .filter(({ vaccine__name }) => vaccine__name === vaccine)
      .reduce((acc, curr) => acc + curr[fieldToAggregate], 0);
    aggregateData.push(periodTotal);
  });

  return aggregateData;
};

const getYearLabelFromPeriod = (period, yearType) => {
  period = period.toString();
  var year = period.substr(0, 4);
  var month = Number(period.substr(4, 2));

  if (yearType === "CY") {
    return year;
  } else if (yearType === "FY") {
    if (month <= 6) {
      var prevYear = Number(year) - 1;
      return prevYear + "-" + year;
    } else {
      var nextYear = Number(year) + 1;
      return year + "-" + nextYear;
    }
  }
};

const getMonthIndexFromPeriod = (period, yearType) => {
  period = period.toString();
  var month = Number(period.substr(4, 2));

  if (yearType === "CY") {
    return month;
  } else {
    if (month >= 7) {
      return Math.abs(month - 7) + 1;
    } else {
      return month + 6;
    }
  }
};

const getActiveDoseNumber = activeDose => {
  if (activeDose !== undefined)
    return Number(activeDose.substr(activeDose.length - 1, 1));
  return 0;
};

const fillMissingValues = values => {
  var monthIndexes = _.range(1, 13);
  var existingIndexes = values.map(item => {
    return item.x;
  });
  var newIndexes = monthIndexes.filter(v => {
    return existingIndexes.indexOf(v) < 0;
  });
  newIndexes.forEach(monthIndex => {
    values.push({ x: monthIndex, y: 0 });
  });
  return values.sort((a, b) => {
    return a.x - b.x;
  });
};

const computeRate = (doses, planned, path, dose) => {
  if (path === "coverage") {
    const activeDoseNumber = getActiveDoseNumber(dose);
    let doseValue = doses.last;

    if (activeDoseNumber === 1) doseValue = doses.first;
    else if (activeDoseNumber === 2) doseValue = doses.second;
    else if (activeDoseNumber === 3) doseValue = doses.third;

    return (doseValue / planned) * 100;
  } else if (path === "dropoutrate") {
    return ((doses.first - doses.last) / doses.first) * 100;
  } else if (path === "redcategory") {
    const access = (doses.first / planned) * 100;
    const dropoutRate = ((doses.first - doses.last) / doses.first) * 100;

    if (access >= 90 && dropoutRate >= 0 && dropoutRate <= 10) return 1;
    else if (access >= 90 && (dropoutRate < 0 || dropoutRate > 10)) return 2;
    else if (access < 90 && dropoutRate >= 0 && dropoutRate <= 10) return 3;
    else if (access < 90 && (dropoutRate < 0 || dropoutRate > 10)) return 4;
    else return 0;
  }
};

const aggregateYearAntigenData = (data, vaccineName) => {
  const yearIndexes = [];
  const result = data.reduce((acc, item) => {
    const vaccine = item.vaccine__name;
    const year = item.period.toString().substr(0, 4);
    if (yearIndexes.indexOf(year) === -1) yearIndexes.push(year);
    if (!(vaccine in acc)) acc[vaccine] = {};
    if (!(year in acc[vaccine]))
      acc[vaccine][year] = {
        totalActual: 0,
        totalFirstDose: 0,
        totalThirdDose: 0,
        totalLastDose: 0,
        totalPlanned: 0,
        totalSecondDose: 0
      };

    acc[vaccine][year].totalActual += item.total_actual;
    acc[vaccine][year].totalFirstDose += item.total_first_dose;
    acc[vaccine][year].totalLastDose += item.total_last_dose;
    acc[vaccine][year].totalPlanned += item.total_planned;
    acc[vaccine][year].totalSecondDose += item.total_second_dose;
    acc[vaccine][year].totalThirdDose += item.total_third_dose;

    return acc;
  }, {});

  const chartData = [];

  for (let vaccine in result) {
    let vaccineData = { cR: [], cR1: [], cR2: [], cR3: [] };

    for (let year in result[vaccine]) {
      const planned = result[vaccine][year].totalPlanned;
      const item = result[vaccine][year];

      const cR1 = calculateCoverageRate(item.totalFirstDose, planned);
      const cR2 = calculateCoverageRate(item.totalSecondDose, planned);
      const cR = calculateCoverageRate(item.totalLastDose, planned);
      const cR3 = calculateCoverageRate(item.totalThirdDose, planned);

      vaccineData.cR.push(cR);
      vaccineData.cR1.push(cR1);
      vaccineData.cR2.push(cR2);
      vaccineData.cR3.push(cR3);
    }

    if (vaccineName !== "ALL") {
      /* Show coverages for the different doses */
      chartData.push({
        name: "Dose 1",
        data: vaccineData.cR1,
        maxPointWidth: 50
      });

      if (["PENTA", "PCV", "OPV", "HPV", "TT"].includes(vaccine))
        chartData.push({
          name: "Dose 2",
          data: vaccineData.cR2,
          maxPointWidth: 50
        });

      if (["PENTA", "PCV", "OPV", "DPT"].includes(vaccineName))
        chartData.push({
          name: "Dose 3",
          data: vaccineData.cR3,
          maxPointWidth: 50
        });
    } else {
      chartData.push({
        name: vaccine,
        data: vaccineData.cR,
        maxPointWidth: 50
      });
    }
  }

  return chartData;
};

const getChartData = (
  data,
  startYear,
  endYear,
  reportYear,
  cumulative,
  path,
  activeDose
) => {
  let periodValues = {};
  let redCategoryValues = {};
  let totals = {};
  let redCategoryTotals = {};
  let rate;

  for (let i in data) {
    const period = data[i].period;
    const last_dose = data[i].total_last_dose;
    const first_dose = data[i].total_first_dose;
    const second_dose = data[i].total_second_dose;
    const third_dose = data[i].total_third_dose;
    const planned = data[i].total_planned;
    const vaccine = data[i].vaccine__name;
    const district = data[i].district__name;

    const dataMonth = getMonthFromPeriod(period);
    const dataYear = getYearFromPeriod(period);

    const yearLabel = getYearLabelFromPeriod(period, reportYear);
    const monthIndex = getMonthIndexFromPeriod(period, reportYear);

    /* The view returns extra data to cater for the financial year
    Since its ignorant of the periods, we do the filters ourselves
    Didn't want to create a new API call for a change in report year
    */
    if (reportYear === "CY" && dataYear > endYear) continue;

    if (reportYear === "FY" && dataYear === startYear && dataMonth <= 6)
      continue;

    if (!(yearLabel in periodValues)) {
      periodValues[yearLabel] = {};
      redCategoryValues[yearLabel] = {};
      totals[yearLabel] = {};
      redCategoryTotals[yearLabel] = {};
    }

    if (!(vaccine in periodValues[yearLabel])) {
      periodValues[yearLabel][vaccine] = [];
      redCategoryValues[yearLabel][vaccine] = {};
      totals[yearLabel][vaccine] = {
        first_dose: 0,
        second_dose: 0,
        third_dose: 0,
        last_dose: 0,
        planned: 0
      };
      redCategoryTotals[yearLabel][vaccine] = {};
    }

    if (
      district !== undefined &&
      !(district in redCategoryTotals[yearLabel][vaccine])
    ) {
      redCategoryTotals[yearLabel][vaccine][district] = {
        first_dose: 0,
        last_dose: 0,
        planned: 0
      };
    }

    if (cumulative) {
      if (path === "redcategory") {
        var combinedFirstDose =
          redCategoryTotals[yearLabel][vaccine][district].first_dose +
          first_dose;
        var combinedLastDose =
          redCategoryTotals[yearLabel][vaccine][district].last_dose + last_dose;
        var combinedPlanned =
          redCategoryTotals[yearLabel][vaccine][district].planned + planned;

        redCategoryTotals[yearLabel][vaccine][
          district
        ].first_dose = combinedFirstDose;
        redCategoryTotals[yearLabel][vaccine][
          district
        ].last_dose = combinedLastDose;
        redCategoryTotals[yearLabel][vaccine][
          district
        ].planned = combinedPlanned;
      } else {
        var combinedFirstDose =
          totals[yearLabel][vaccine].first_dose + first_dose;
        var combinedLastDose = totals[yearLabel][vaccine].last_dose + last_dose;
        var combinedSecondDose =
          totals[yearLabel][vaccine].second_dose + second_dose;
        var combinedThirdDose =
          totals[yearLabel][vaccine].third_dose + third_dose;
        var combinedPlanned = totals[yearLabel][vaccine].planned + planned;

        totals[yearLabel][vaccine].first_dose = combinedFirstDose;
        totals[yearLabel][vaccine].last_dose = combinedLastDose;
        totals[yearLabel][vaccine].second_dose = combinedSecondDose;
        totals[yearLabel][vaccine].third_dose = combinedThirdDose;
        totals[yearLabel][vaccine].planned = combinedPlanned;
      }

      rate = computeRate(
        {
          first: combinedFirstDose,
          second: combinedSecondDose,
          third: combinedThirdDose,
          last: combinedLastDose
        },
        combinedPlanned,
        path,
        activeDose
      );
    } else {
      rate = computeRate(
        {
          first: first_dose,
          second: second_dose,
          third: third_dose,
          last: last_dose
        },
        planned,
        path,
        activeDose
      );
    }

    if (path === "redcategory") {
      let category = rate;
      if (!(monthIndex in redCategoryValues[yearLabel][vaccine]))
        redCategoryValues[yearLabel][vaccine][monthIndex] = {};

      if (!(category in redCategoryValues[yearLabel][vaccine][monthIndex]))
        redCategoryValues[yearLabel][vaccine][monthIndex][category] = [];

      redCategoryValues[yearLabel][vaccine][monthIndex][category].push(
        district
      );
    } else {
      periodValues[yearLabel][vaccine].push({
        x: monthIndex,
        y: rate
      });
    }
  }

  let chartData = [];

  if (path === "redcategory") {
    let getRedCategoryValues = function(
      monthIndex,
      catDistricts,
      totalDistricts
    ) {
      return {
        x: Number(monthIndex),
        y: (catDistricts / totalDistricts) * 100
      };
    };

    let getTotalRedCategoryDistricts = (cat, data) => {
      if (cat in data) {
        return data[cat].length;
      }
      return 0;
    };

    let categoryValues = {
      1: [],
      2: [],
      3: [],
      4: []
    };

    for (let yearLabel in redCategoryValues) {
      for (let vaccine in redCategoryValues[yearLabel]) {
        for (let monthIndex in redCategoryValues[yearLabel][vaccine]) {
          let vaccineData = redCategoryValues[yearLabel][vaccine][monthIndex];

          let cat1Districts = getTotalRedCategoryDistricts(1, vaccineData);
          let cat2Districts = getTotalRedCategoryDistricts(2, vaccineData);
          let cat3Districts = getTotalRedCategoryDistricts(3, vaccineData);
          let cat4Districts = getTotalRedCategoryDistricts(4, vaccineData);

          let totalDistricts =
            cat1Districts + cat2Districts + cat3Districts + cat4Districts;

          categoryValues[1].push(
            getRedCategoryValues(monthIndex, cat1Districts, totalDistricts)
          );
          categoryValues[2].push(
            getRedCategoryValues(monthIndex, cat2Districts, totalDistricts)
          );
          categoryValues[3].push(
            getRedCategoryValues(monthIndex, cat3Districts, totalDistricts)
          );
          categoryValues[4].push(
            getRedCategoryValues(monthIndex, cat4Districts, totalDistricts)
          );
        }
      }
    }

    chartData.push({
      name: "CAT1",
      color: "DarkGreen",
      data: fillMissingValues(categoryValues[1])
    });
    chartData.push({
      name: "CAT2",
      color: "Yellow",
      data: fillMissingValues(categoryValues[2])
    });
    chartData.push({
      name: "CAT3",
      color: "Orange",
      data: fillMissingValues(categoryValues[3])
    });
    chartData.push({
      name: "CAT4",
      color: "Red",
      data: fillMissingValues(categoryValues[4])
    });
  } else {
    // Check if we have data
    if (Object.entries(periodValues)[0]) {
      const yearLabel = Object.entries(periodValues)[0][0];

      for (let vaccine in periodValues[yearLabel]) {
        let key = vaccine;
        /* Remove antigens that lack value for particular dose on Coverage */

        if (path === "coverage") {
          if (
            activeDose === "Dose 3" &&
            !["PENTA", "PCV", "OPV"].includes(vaccine)
          )
            continue;
          else if (
            activeDose === "Dose 2" &&
            !["PENTA", "PCV", "OPV", "HPV", "TT"].includes(vaccine)
          )
            continue;
        }

        let values = fillMissingValues(periodValues[yearLabel][vaccine]);
        chartData.push({ name: key, data: values });
      }
    }
  }

  return chartData;
};

const calculateCoverageRate = (consumption, planned) => {
  return Math.round((consumption / planned) * 100);
};

const generateChartTitle = (
  tabTitle,
  vaccineName,
  dose,
  parentTab,
  reportYear,
  year
) => {
  const duration = tabTitle[0] === "A" ? "Annualized" : "Monthly";
  const vaccine = vaccineName === "ALL" ? "antigens" : vaccineName;
  let doseNumber = dose.replace("Dose ", "");
  if (vaccineName === "ALL") doseNumber = "";
  const antigenLabel = dose !== undefined ? `${vaccine}${doseNumber}` : vaccine;
  const yearType = reportYear === "CY" ? "Calendar Year" : "Financial Year";

  return `Trend of ${duration} ${parentTab} of ${antigenLabel} for ${year} ${yearType}`;
};

export {
  getYearFromData,
  aggregateData,
  getMonthsFromPeriod,
  getPeriodsFromData,
  getMonthsFromPeriodNumber,
  generateChartTitle,
  getYearRangeFromData,
  aggregateYearAntigenData,
  getChartData
};
