export const getUniqueYearsFromData = data => {
  const years = [
    ...new Set(
      Object.values(data)
        .filter(d => !d.functionality_percentage)
        .map(y => y.year)
    )
  ];

  return years;
};

export const getQuarters = data => {
  const quarters = Object.values(data)
    .filter(d => !d.functionality_percentage)
    .map(d => `${d.year} - Q${d.quarter}`);

  return quarters;
};

export const getEligibilityChartData = data => {
  return {
    data: [
      {
        name: "Eligible Facilities",
        y: data.percentage_cce_coverage_rate
      },
      {
        name: "Ineligible Facilities",
        y: data.percentage_not_cce_coverage_rate
      }
    ]
  };
};

export const getCapacityChartData = data => {
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
          color: "yellow"
        })
      : totalRequired[0]["data"].push(total_required);

    totalAvailable[0] === undefined
      ? totalAvailable.push({
          name: "Available",
          data: [total_available],
          stack: quarter,
          color: "green",
          dashStyle: "Dash"
        })
      : totalAvailable[0]["data"].push(total_available);
  }

  chartData.push(...totalRequired, ...totalAvailable);

  return chartData;
};

export const getFunctionalityChartData = data => {
  const chartData = [];
  const workingData = [];
  const notWorkingData = [];
  const needsRepairData = [];

  // const mockData = [
  //   {
  //     not_working_percentage: 11.7,
  //     quarter: 1,
  //     working: 415,
  //     year: 2019,
  //     not_working: 55,
  //     needs_repair_percentage: 0.0,
  //     needs_repair: 4,
  //     working_percentage: 88.3
  //   },
  //   {
  //     not_working_percentage: 0,
  //     quarter: 2,
  //     working: 390,
  //     year: 2019,
  //     not_working: 67,
  //     needs_repair_percentage: 0,
  //     needs_repair: 10,
  //     working_percentage: 0
  //   },
  //   {
  //     not_working_percentage: 0,
  //     quarter: 3,
  //     working: 439,
  //     year: 2019,
  //     not_working: 22,
  //     needs_repair_percentage: 0,
  //     needs_repair: 8,
  //     working_percentage: 0
  //   },
  //   {
  //     not_working_percentage: 0,
  //     quarter: 4,
  //     working: 430,
  //     year: 2019,
  //     not_working: 192,
  //     needs_repair_percentage: 0,
  //     needs_repair: 70,
  //     working_percentage: 0
  //   },
  //   {
  //     functionality_percentage: 88.3
  //   }
  // ];

  const dataObject = Object.values(data).filter(
    d => !d.functionality_percentage
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
          color: "green"
        })
      : workingData[0]["data"].push(working);

    notWorkingData[0] === undefined
      ? notWorkingData.push({
          name: "Not Working",
          data: [notworking],
          stack: quarter,
          color: "red"
        })
      : notWorkingData[0]["data"].push(notworking);

    needsRepairData[0] === undefined
      ? needsRepairData.push({
          name: "Needs Repair",
          data: [needsrepair],
          stack: quarter,
          color: "orange"
        })
      : needsRepairData[0]["data"].push(needsrepair);
  }

  chartData.push(...workingData, ...notWorkingData, ...needsRepairData);

  return chartData;
};
