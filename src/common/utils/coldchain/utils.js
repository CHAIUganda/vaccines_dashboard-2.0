export const getUniqueYearsFromData = (data) => {
  const years = [
    ...new Set(
      Object.values(data)
        .filter((d) => !d.functionality_percentage)
        .map((y) => y.year)
    ),
  ];

  return years;
};

export const convertToTimeSeries = (year, month) => {
  // We subtract - 1 because JS reads months from 0
  // with Jan = 0, Feb = 1 etc.
  return Date.UTC(year, month - 1, 1);
};

export const getQuarters = (data) => {
  const quarters = Object.values(data)
    .filter((d) => !d.functionality_percentage)
    .map((d) => `${d.year} - Q${d.quarter}`);

  return quarters;
};

export const getTemperatureMonitoringReportRateChartData = (data) => {
  const chartData = [];

  const sorted = Object.fromEntries(Object.entries(data[0]).sort());

  chartData.push({
    name: "Reporting Rate",
    data: Object.values(sorted),
  });

  return chartData;
};

export const getTemperatureMonitoringChartData = (data) => {
  const chartData = [];
  const heat_alarm = [];
  const cold_alarm = [];

  for (let i = 0; i < data.length; i++) {
    let metric = data[i];
    const month = metric.month;
    console.log(month);
    const heat_alarms_sum = metric.heat_alarm__sum;
    const cold_alarm_sum = metric.cold_alarm__sum;

    // If we dont have any working data (first run), create the object with other properties
    // If we have data, just append the working metric to the data key
    cold_alarm[0] === undefined
      ? cold_alarm.push({
          name: "Freeze Alarms",
          data: [cold_alarm_sum],
          stack: month,
          color: "#33339A",
          dashStyle: "Dash",
        })
      : cold_alarm[0]["data"].push(cold_alarm_sum);

    heat_alarm[0] === undefined
      ? heat_alarm.push({
          name: "Heat Alarms",
          data: [heat_alarms_sum],
          stack: month,
          color: "#BBE0E3",
        })
      : heat_alarm[0]["data"].push(heat_alarms_sum);
  }

  chartData.push(...cold_alarm, ...heat_alarm);

  return chartData;
};

export const getEligibilityChartData = (data) => {
  return {
    data: [
      {
        name: "Eligible Facilities",
        y: data.percentage_cce_coverage_rate,
      },
      {
        name: "Ineligible Facilities",
        y: data.percentage_not_cce_coverage_rate,
      },
    ],
  };
};

export const getCapacityChartData = (data) => {
  const chartData = [];
  const totalRequired = [];
  const totalAvailable = [];

  for (let i = 0; i < data.length; i++) {
    let metric = data[i];
    const quarter = metric.quarter;
    const total_available = metric.total_available;
    const total_required = metric.total_required;

    // If we dont have any working data (first run), create the object with other properties
    // If we have data, just append the working metric to the data key
    totalRequired[0] === undefined
      ? totalRequired.push({
          name: "Required",
          data: [total_required],
          stack: quarter,
          color: "yellow",
        })
      : totalRequired[0]["data"].push(total_required);

    totalAvailable[0] === undefined
      ? totalAvailable.push({
          name: "Available",
          data: [total_available],
          stack: quarter,
          color: "green",
          dashStyle: "Dash",
        })
      : totalAvailable[0]["data"].push(total_available);
  }

  chartData.push(...totalRequired, ...totalAvailable);

  return chartData;
};

export const getOptimalityChartData = (data) => {
  const chartData = [];
  const CCEOverallTotal = [];
  const CCEOptimal = [];

  for (let i = 0; i < data.length; i++) {
    let metric = data[i];
    const quarter = metric.quarter;
    const total_overall = metric.cce_overall_total;
    const total_optimal = metric.cce_optimal;

    // If we dont have any working data (first run), create the object with other properties
    // If we have data, just append the working metric to the data key
    CCEOverallTotal[0] === undefined
      ? CCEOverallTotal.push({
          name: "Required",
          data: [total_overall],
          stack: quarter,
          color: "yellow",
        })
      : CCEOverallTotal[0]["data"].push(total_overall);

    CCEOptimal[0] === undefined
      ? CCEOptimal.push({
          name: "Available",
          data: [total_optimal],
          stack: quarter,
          color: "green",
          dashStyle: "Dash",
        })
      : CCEOptimal[0]["data"].push(total_optimal);
  }

  chartData.push(...CCEOverallTotal, ...CCEOptimal);

  return chartData;
};

export const getFunctionalityChartData = (data) => {
  const chartData = [];
  const workingData = [];
  const notWorkingData = [];
  const needsRepairData = [];

  const dataObject = Object.values(data).filter(
    (d) => !d.functionality_percentage
  );

  for (let i = 0; i < dataObject.length; i++) {
    let metric = dataObject[i];

    const quarter = metric.quarter;
    const working = metric.working;
    const notworking = metric.not_working;
    const needsrepair = metric.needs_repair;

    // If we dont have any working data (first run), create the object with other properties
    // If we have data, just append the working metric to the data key
    workingData[0] === undefined
      ? workingData.push({
          name: "Working",
          data: [working],
          stack: quarter,
          color: "green",
        })
      : workingData[0]["data"].push(working);

    notWorkingData[0] === undefined
      ? notWorkingData.push({
          name: "Not Working",
          data: [notworking],
          stack: quarter,
          color: "red",
        })
      : notWorkingData[0]["data"].push(notworking);

    needsRepairData[0] === undefined
      ? needsRepairData.push({
          name: "Needs Repair",
          data: [needsrepair],
          stack: quarter,
          color: "orange",
        })
      : needsRepairData[0]["data"].push(needsrepair);
  }

  chartData.push(...workingData, ...notWorkingData, ...needsRepairData);

  return chartData;
};
