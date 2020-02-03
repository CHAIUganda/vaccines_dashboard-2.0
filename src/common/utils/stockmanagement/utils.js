// Functions for stockmanagement

const getMonthNumber = function(month) {
  var months = {};
  months["Jan"] = 1;
  months["Feb"] = 2;
  months["Mar"] = 3;
  months["Apr"] = 4;
  months["May"] = 5;
  months["Jun"] = 6;
  months["Jul"] = 7;
  months["Aug"] = 8;
  months["Sep"] = 9;
  months["Oct"] = 10;
  months["Nov"] = 11;
  months["Dec"] = 12;
  return months[month];
};

const convertToTimeSeries = period => {
  // Convert to number so we can get the year
  const str_period = period.toString();

  // Extract year
  const year = str_period.substring(0, 4);

  // Extract Month
  const month = str_period.substring(5, 6);

  return Date.UTC(year, month, 1);
};

export const getStockChartData = (
  data,
  isLoading,
  endMonth,
  startMonth,
  district,
  vaccine,
  type
) => {
  let tabledata_so = [];
  let tabledata_bm = [];
  let tabledata_wr = [];
  let tabledata_am = [];
  let tabledata_search = [];

  if (type === "table") {
    tabledata_so = data.filter(value => value.at_hand === 0);

    tabledata_am = data.filter(function(value) {
      return value.at_hand > value.stock_requirement__maximum;
    });

    tabledata_wr = data.filter(function(value) {
      return (
        value.at_hand > value.stock_requirement__minimum &&
        value.at_hand < value.stock_requirement__maximum
      );
    });

    tabledata_bm = data.filter(function(value) {
      return (
        value.at_hand < value.stock_requirement__minimum && value.at_hand > 0
      );
    });
    tabledata_search = data.filter(function(value) {
      return value;
    });

    return [{ tabledata_so, tabledata_am, tabledata_wr, tabledata_bm }];
  } else if (type === "chart") {
    // calculate totals
    let nothing = 0;
    let within = 0;
    let belowminimum = 0;
    let abovemaximum = 0;
    let status = "";
    for (let i = 0; i < data.length; i++) {
      if (data[i].at_hand === 0) {
        nothing++;
        status = "Stocked Out";
      } else if (
        data[i].at_hand > data[i].stock_requirement__minimum &&
        data[i].at_hand < data[i].stock_requirement__maximum
      ) {
        within++;
        status = "Within Range";
      } else if (
        data[i].at_hand < data[i].stock_requirement__minimum &&
        data[i].at_hand > 0
      ) {
        belowminimum++;
        status = "Below MIN";
      } else if (data[i].at_hand > data[i].stock_requirement__maximum) {
        abovemaximum++;
        status = "Above MAX";
      }
      data[i].status = status;
    }

    const stockedout = (nothing / data.length) * 100;

    if (nothing === data.length) {
      return [];
    } else {
      return {
        data: [
          {
            name: "Stocked Out",
            y: (nothing / data.length) * 100,
            sliced: true,
            selected: true
          },
          {
            name: "Within Range",
            y: (within / data.length) * 100,
            color: "#008000"
          },
          {
            name: "Below MIN",
            y: (belowminimum / data.length) * 100,
            color: "#FFA500"
          },
          {
            name: "Above MAX",
            y: (abovemaximum / data.length) * 100,
            color: "#90EE90"
          }
        ]
      };
    }
  } else if (type === "line") {
    let graphdataDistribution = [];
    let seriesDistribution = [];
    let seriesOrders = [];
    let min_seriesDistribution = [];
    let max_seriesDistribution = [];
    let refreshrate = 0;

    for (var i = 0; i < data.length; i++) {
      const test = convertToTimeSeries(data[i].period);

      console.log(test);

      seriesDistribution.push([
        convertToTimeSeries(data[i].period),
        parseInt(data[i].received)
      ]);
      seriesOrders.push([convertToTimeSeries(data[i].period), data[i].ordered]);
      min_seriesDistribution.push([
        convertToTimeSeries(data[i].period),
        data[i].stock_requirement__minimum
      ]);
      max_seriesDistribution.push([
        convertToTimeSeries(data[i].period),
        data[i].stock_requirement__maximum
      ]);
      if (data[i].month === getMonthNumber(endMonth.split(" ")[0])) {
        refreshrate =
          data[i].ordered === 0
            ? 0
            : (data[i].received / data[i].ordered) * 100;
      }
    }
    graphdataDistribution.push({
      name: "Min",
      data: min_seriesDistribution,
      color: "#A5E816"
    });
    graphdataDistribution.push({
      name: "Issued",
      data: seriesDistribution,
      color: "#1F77B4"
    });
    graphdataDistribution.push({
      name: "Ordered",
      data: seriesOrders,
      color: "red"
    });

    graphdataDistribution.push({
      name: "Max",
      data: max_seriesDistribution,
      color: "#FF7F0E"
    });

    return graphdataDistribution;
  }
};
