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

function groupBy(objectArray, property) {
  return objectArray.reduce((acc, obj) => {
    let key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

export const getFunctionalityChartData = (data, years) => {
  // console.log(data);
  const chartData = [];
  const workingData = [];
  const notWorkingData = [];
  const needsRepairData = [];

  // Filter out functionality percentage
  const dataObject = Object.values(data).filter(
    d => !d.functionality_percentage
  );

  for (let i = 0; i < dataObject.length; i++) {
    let metric = dataObject[i];

    const working = metric.working;
    const not_working = metric.not_working;
    const needs_repair = metric.needs_repair;

    workingData.push({
      name: "Working",
      data: [working],
      stack: metric.year_half,
      color: "green"
    });

    notWorkingData.push({
      name: "Not Working",
      data: [not_working],
      stack: metric.year_half,
      color: "red"
    });

    needsRepairData.push({
      name: "Needs Repair",
      data: [needs_repair],
      stack: metric.year_half,
      color: "orange"
    });
  }

  chartData.push(...workingData, ...notWorkingData, ...needsRepairData);

  return chartData;
};
