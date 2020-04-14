// Various utility functions for graphs
const _ = require("underscore");

const getYearFromData = (data = []) => {
  // Years returned as 201902 (year + period)
  // We map the period, cast it to string and remove the period and return unique years
  const periods = data.map((period) => String(period.period).slice(0, -2));
  const years = [...new Set(periods)];
  return years;
};

const getMonthName = (month) => {
  const months = {};
  months["1"] = "Jan";
  months["2"] = "Feb";
  months["3"] = "Mar";
  months["4"] = "Apr";
  months["5"] = "May";
  months["6"] = "Jun";
  months["7"] = "Jul";
  months["8"] = "Aug";
  months["9"] = "Sep";
  months["10"] = "Oct";
  months["11"] = "Nov";
  months["12"] = "Dec";
  return months[month];
};

const getMonthFromPeriod = (period) => {
  period = period.toString();
  return Number(period.substr(4, 2));
};

const getYearFromPeriod = (period) => {
  period = period.toString();
  return Number(period.substr(0, 4));
};

const getPeriodsFromData = (data = []) => {
  const periods = [...new Set(data.map((p) => p.period))];

  return periods;
};

const getMonthsFromPeriod = (periods) => {
  const months = [];
  periods.forEach((uniquePeriod) => {
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
    "Dec",
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
    "Jun",
  ];
  const monthsToReturn = [];

  months.forEach((month) => {
    yearType === "CY"
      ? monthsToReturn.push(monthsInYear[month])
      : monthsToReturn.push(monthsFinancialYear[month]);
  });

  return monthsToReturn;
};

const aggregateData = (data, vaccine, fieldToAggregate) => {
  let aggregateData = [];
  const periods = [...new Set(data.map((p) => p.period))];

  periods.forEach((uniquePeriod) => {
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
  const year = period.substr(0, 4);
  const month = Number(period.substr(4, 2));

  if (yearType === "CY") {
    return year;
  } else if (yearType === "FY") {
    if (month <= 6) {
      const prevYear = Number(year) - 1;
      return prevYear + "-" + year;
    } else {
      const nextYear = Number(year) + 1;
      return year + "-" + nextYear;
    }
  }
};

const getMonthIndexFromPeriod = (period, yearType) => {
  period = period.toString();
  const month = Number(period.substr(4, 2));

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

const getActiveDoseNumber = (activeDose) => {
  if (activeDose !== undefined)
    return Number(activeDose.substr(activeDose.length - 1, 1));
  return 0;
};

const fillMissingValues = (values) => {
  const monthIndexes = _.range(1, 13);
  const existingIndexes = values.map((item) => {
    return item.x;
  });
  const newIndexes = monthIndexes.filter((v) => {
    return existingIndexes.indexOf(v) < 0;
  });
  newIndexes.forEach((monthIndex) => {
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

const aggregateYearAntigenData = (data = [], vaccineName) => {
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
        totalSecondDose: 0,
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
        maxPointWidth: 50,
      });

      if (["PENTA", "PCV", "OPV", "HPV", "TT"].includes(vaccine))
        chartData.push({
          name: "Dose 2",
          data: vaccineData.cR2,
          maxPointWidth: 50,
        });

      if (["PENTA", "PCV", "OPV", "DPT"].includes(vaccineName))
        chartData.push({
          name: "Dose 3",
          data: vaccineData.cR3,
          maxPointWidth: 50,
        });
    } else {
      chartData.push({
        name: vaccine,
        data: vaccineData.cR,
        maxPointWidth: 50,
      });
    }
  }

  return chartData;
};

const getChartData = (
  data = [],
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
        planned: 0,
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
        planned: 0,
      };
    }

    if (cumulative) {
      let combinedPlanned = 0;
      let combinedFirstDose = 0;
      let combinedSecondDose = 0;
      let combinedThirdDose = 0;

      let combinedLastDose = 0;
      if (path === "redcategory") {
        combinedFirstDose =
          redCategoryTotals[yearLabel][vaccine][district].first_dose +
          first_dose;
        combinedLastDose =
          redCategoryTotals[yearLabel][vaccine][district].last_dose + last_dose;
        combinedPlanned =
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
        combinedFirstDose = totals[yearLabel][vaccine].first_dose + first_dose;
        combinedLastDose = totals[yearLabel][vaccine].last_dose + last_dose;
        combinedSecondDose =
          totals[yearLabel][vaccine].second_dose + second_dose;
        combinedThirdDose = totals[yearLabel][vaccine].third_dose + third_dose;
        combinedPlanned = totals[yearLabel][vaccine].planned + planned;

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
          last: combinedLastDose,
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
          last: last_dose,
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
        y: rate,
      });
    }
  }

  let chartData = [];

  if (path === "redcategory") {
    let getRedCategoryValues = function (
      monthIndex,
      catDistricts,
      totalDistricts
    ) {
      return {
        x: Number(monthIndex),
        y: (catDistricts / totalDistricts) * 100,
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
      4: [],
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
      data: fillMissingValues(categoryValues[1]),
    });
    chartData.push({
      name: "CAT2",
      color: "Yellow",
      data: fillMissingValues(categoryValues[2]),
    });
    chartData.push({
      name: "CAT3",
      color: "Orange",
      data: fillMissingValues(categoryValues[3]),
    });
    chartData.push({
      name: "CAT4",
      color: "Red",
      data: fillMissingValues(categoryValues[4]),
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

const calculateDropoutRate = (firstDose, lastDose) => {
  return Math.round(((firstDose - lastDose) / firstDose) * 100);
};

const calculateRedCategory = (firstDose, lastDose, planned) => {
  const access = calculateCoverageRate(firstDose, planned);
  const dropoutRate = calculateDropoutRate(firstDose, lastDose);

  if (access >= 90 && dropoutRate >= 0 && dropoutRate <= 10) return 1;
  else if (access >= 90 && (dropoutRate < 0 || dropoutRate > 10)) return 2;
  else if (access < 90 && dropoutRate >= 0 && dropoutRate <= 10) return 3;
  else if (access < 90 && (dropoutRate < 0 || dropoutRate > 10)) return 4;
  else return 0;
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
  let doseNumber = dose?.replace("Dose ", "");
  if (vaccineName === "ALL") doseNumber = "";
  const antigenLabel = dose !== undefined ? `${vaccine}${doseNumber}` : vaccine;
  const yearType = reportYear === "CY" ? "Calendar Year" : "Financial Year";

  return `Trend of ${duration} ${parentTab} of ${antigenLabel} for ${year} ${yearType}`;
};

const getValueSum = (data, name, vaccine) => {
  return data.reduce((accumulator, value) => {
    if (value.vaccine__name === vaccine) return accumulator + value[name];
    return accumulator;
  }, 0);
};

const getUnepiCoverage = (data = [], period) => {
  const tableData = [];
  let pentaCR = 0,
    pcvCR = 0;

  let Gap = 0;
  let dropout_Penta = 0;
  let dropout_hpv = 0;
  let category = 0;
  // let periodMonth = periodDisplay(data?.period);

  for (const i in data) {
    const dataPeriod = data[i].period;
    const lastDose = data[i].total_last_dose;
    const firstDose = data[i].total_first_dose;
    const planned = data[i].total_planned;
    const vaccine = data[i].vaccine__name;

    if (dataPeriod != period) continue;

    /* Sum up the values from start of year to selected period
     to calculate Annualized Coverage (avoc) */
    const totalLastDose = getValueSum(data, "total_last_dose", vaccine);
    const totalPlanned = getValueSum(data, "total_planned", vaccine);

    const coverageRate = calculateCoverageRate(lastDose, planned);
    const dropoutRate = calculateDropoutRate(firstDose, lastDose);
    const redCategory = calculateRedCategory(firstDose, lastDose, planned);
    const avoc = calculateCoverageRate(totalLastDose, totalPlanned);

    tableData.push({
      vaccine: vaccine,
      planned_consumption: planned,
      coverage_rate: coverageRate,
      avoc: avoc,
    });

    // eslint-disable-next-line default-case
    switch (vaccine) {
      case "PENTA":
        pentaCR = coverageRate;
        dropout_Penta = dropoutRate;
        category = redCategory;
        break;
      case "PCV":
        pcvCR = coverageRate;
        break;
      case "HPV":
        dropout_hpv = dropoutRate;
        break;
    }
  }
  Gap = pentaCR - pcvCR;

  return { Gap, dropout_Penta, dropout_hpv, category };
};

const getUnepiNationalStock = (data = []) => {
  const allStockData = [];
  let stockedOutAntigens = 0;

  /* Turn the district based data into aggregated
      vaccine based data */
  const vaccineData = data.reduce(function (acc, item) {
    if (!(item.vaccine in acc))
      acc[item.vaccine] = {
        at_hand: 0,
        stock_requirement__minimum: 0,
        received: 0,
        ordered: 0,
        consumed: 0,
        available_stock: 0,
      };

    acc[item.vaccine].at_hand += item.at_hand;
    acc[item.vaccine].stock_requirement__minimum +=
      item.stock_requirement__minimum;
    acc[item.vaccine].received += item.received;
    acc[item.vaccine].ordered += item.ordered;
    acc[item.vaccine].consumed += item.consumed;
    acc[item.vaccine].available_stock += item.available_stock;

    return acc;
  }, {});

  for (let vaccine in vaccineData) {
    const atHand = vaccineData[vaccine].at_hand;
    const minStock = vaccineData[vaccine].stock_requirement__minimum;
    const ordered = vaccineData[vaccine].ordered;
    const received = vaccineData[vaccine].received;
    const consumed = vaccineData[vaccine].consumed;
    const availableStock = atHand + received;
    const monthsStock = Math.round(atHand / minStock);

    if (monthsStock === 0) stockedOutAntigens++;

    allStockData.push({
      vaccine: vaccine,
      monthsStock: monthsStock,
      refillRate: ordered === 0 ? 0 : Math.round((received / ordered) * 100),
      uptakeRate:
        availableStock === 0
          ? 0
          : Math.round((consumed / availableStock) * 100),
    });
  }

  return { stockedOutAntigens, allStockData };
};

export {
  getYearFromData,
  aggregateData,
  getMonthsFromPeriod,
  getPeriodsFromData,
  getMonthsFromPeriodNumber,
  generateChartTitle,
  aggregateYearAntigenData,
  getChartData,
  getUnepiNationalStock,
  getUnepiCoverage,
};
