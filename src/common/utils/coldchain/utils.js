import { district } from "../../../context/GlobalState";

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

export const getQuarters = (data = []) => {
  const quarters = Object.values(data)
    .filter((d) => !d.functionality_percentage)
    .map((d) => `${d.year} - Q${d.quarter}`);

  return quarters;
};

export const getTemperatureMonitoringReportRateChartData = (data = []) => {
  console.log(data);
  const chartData = [{ data: [] }];

  const percentages = Object.values(data[0] || []);
  const districts = Object.values(data[1] || []);

  // To show reporting districts together with the reporting rate, construct an
  // object that has the reporting rate and number of districts
  if (percentages.length > 0)
    percentages.forEach((month, index) => {
      chartData[0].data.push({ y: month, districts: districts[index] });
    });

  return chartData;
};

export const getTemperatureMonitoringChartData = (data = []) => {
  const chartData = [];
  const heat_alarm = [];
  const cold_alarm = [];

  for (let i = 0; i < data.length; i++) {
    let metric = data[i];
    const month = metric.month;
    const heat_alarms_sum = metric.heat_alarm__sum;
    const cold_alarm_sum = metric.cold_alarm__sum;

    // If we don't have any working data (first run), create the object with other properties
    // If we have data, just append the working metric to the data key
    cold_alarm[0] === undefined
      ? cold_alarm.push({
          name: "Freeze Alarms",
          data: [cold_alarm_sum],
          stack: month,
          color: "#1e3c72",
          dashStyle: "Dash",
        })
      : cold_alarm[0]["data"].push(cold_alarm_sum);

    heat_alarm[0] === undefined
      ? heat_alarm.push({
          name: "Heat Alarms",
          data: [heat_alarms_sum],
          stack: month,
          color: "#f83245",
        })
      : heat_alarm[0]["data"].push(heat_alarms_sum);
  }

  chartData.push(...cold_alarm, ...heat_alarm);

  return chartData;
};

export const getEligibilityChartData = (data = []) => {
  return {
    data: [
      {
        name: "Eligible Facilities",
        y: data.percentage_cce_coverage_rate,
        color: "#1e3c72",
      },
      {
        name: "Ineligible Facilities",
        y: data.percentage_not_cce_coverage_rate,
        color: "#FE5C6B",
      },
    ],
  };
};

export const getCapacityChartData = (data = []) => {
  const chartData = [];
  const totalRequired = [];
  const totalAvailable = [];

  for (let i = 0; i < data.length; i++) {
    let metric = data[i];
    const quarter = metric.quarter;
    const total_available = metric.total_available;
    const total_required = metric.total_required;

    // Quarters are number 1-4, we subtract 1 to get index in xSeries categories array

    totalAvailable.push({
      x: quarter - 1,
      y: total_available,
    });

    totalRequired.push({
      x: quarter - 1,
      y: total_required,
    });
  }

  chartData.push({
    name: "Total Available Litres",
    type: "column",
    color: "#1e3c72",
    data: totalAvailable,
  });

  chartData.push({
    name: "Total Required Litres",
    type: "column",
    color: "#B2C0D6",
    data: totalRequired,
  });

  return chartData;
};

export const getOptimalityChartData = (data = []) => {
  const chartData = [];
  const CCEOverallTotal = [];
  const CCEOptimal = [];

  for (let i = 0; i < data.length; i++) {
    let metric = data[i];
    const quarter = metric.quarter;
    const total_overall = metric.cce_overall_total;
    const total_optimal = metric.cce_optimal;

    // If we don't have any working data (first run), create the object with other properties
    // If we have data, just append the working metric to the data key

    CCEOptimal[0] === undefined
      ? CCEOptimal.push({
          name: "Available CCEs",
          data: [total_optimal],
          stack: quarter,
          color: "#B2C0D6",
          dashStyle: "Dash",
        })
      : CCEOptimal[0]["data"].push(total_optimal);

    CCEOverallTotal[0] === undefined
      ? CCEOverallTotal.push({
          name: "Required CCEs",
          data: [total_overall],
          stack: quarter,
          color: "#1e3c72",
        })
      : CCEOverallTotal[0]["data"].push(total_overall);
  }

  chartData.push(...CCEOverallTotal, ...CCEOptimal);

  return chartData;
};

export const getFunctionalityChartData = (data = [], type) => {
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

    if (type === "bar") {
      // If we dont have any working data (first run), create the object with other properties
      // If we have data, just append the working metric to the data key
      workingData[0] === undefined
        ? workingData.push({
            name: "Working",
            data: [working],
            stack: quarter,
            color: "#24c53f",
          })
        : workingData[0]["data"].push(working);

      notWorkingData[0] === undefined
        ? notWorkingData.push({
            name: "Not Working",
            data: [notworking],
            stack: quarter,
            color: "#FE5C6B",
          })
        : notWorkingData[0]["data"].push(notworking);

      needsRepairData[0] === undefined
        ? needsRepairData.push({
            name: "Needs Repair",
            data: [needsrepair],
            stack: quarter,
            color: "#1e3c72",
          })
        : needsRepairData[0]["data"].push(needsrepair);
    } else if (type === "pie") {
      workingData.push(working);
      notWorkingData.push(notworking);
      needsRepairData.push(needsrepair);
    }
  }

  if (type === "bar") {
    chartData.push(...workingData, ...notWorkingData, ...needsRepairData);
  } else {
    chartData.push({
      data: [
        {
          name: "Working",
          y: workingData.reduce((a, b) => a + b, 0),
          color: "#24c53f",
        },
        {
          name: "Not Working",
          y: notWorkingData.reduce((a, b) => a + b, 0),
          color: "#FE5C6B",
        },
        {
          name: "Needs Repair",
          y: needsRepairData.reduce((a, b) => a + b, 0),
          color: "#1e3c72",
        },
      ],
      size: "80%",
      innerSize: "80%",
      showInLegend: false,
      dataLabels: {
        enabled: false,
      },
    });
  }

  return chartData;
};
