// Functions for stockmanagement

const getMonthNumber = function (month) {
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

// For highcharts to plot a timeseried data for our charts, we need to sort the data in ascending order
// https://www.highcharts.com/errors/15/

const dataSorter = (data) => {
  if (Array.isArray(data[0])) {
    return data.sort();
  } else {
    return data.sort(function (a, b) {
      return a.x - b.x;
    });
  }
};

const convertToTimeSeries = (period) => {
  // Convert to number so we can get the year
  const str_period = period.toString();

  // Extract year
  const year = str_period.substring(0, 4);

  // Extract Month
  const month = str_period.substring(4, 6);

  // We subtract - 1 because JS reads months from 0
  // with Jan = 0, Feb = 1 etc.
  return Date.UTC(year, month - 1, 1);
};

export const getStockChartData = (data = [], endMonth, type) => {
  if (type === "table") {
    let tabledata_so = [];
    let tabledata_bm = [];
    let tabledata_wr = [];
    let tabledata_am = [];
    let tabledata_search = [];

    tabledata_so = data.filter((value) => value.at_hand === 0);

    tabledata_am = data.filter(function (value) {
      return value.at_hand > value.stock_requirement__maximum;
    });

    tabledata_wr = data.filter(function (value) {
      return (
        value.at_hand > value.stock_requirement__minimum &&
        value.at_hand < value.stock_requirement__maximum
      );
    });

    tabledata_bm = data.filter(function (value) {
      return (
        value.at_hand < value.stock_requirement__minimum && value.at_hand > 0
      );
    });
    tabledata_search = data.filter(function (value) {
      return value;
    });

    return [{ tabledata_so, tabledata_am, tabledata_wr, tabledata_bm }];
  } else if (type === "piechart") {
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
            selected: true,
          },
          {
            name: "Within Range",
            y: (within / data.length) * 100,
            color: "#008000",
          },
          {
            name: "Below MIN",
            y: (belowminimum / data.length) * 100,
            color: "#FFA500",
          },
          {
            name: "Above MAX",
            y: (abovemaximum / data.length) * 100,
            color: "#90EE90",
          },
        ],
      };
    }
  } else if (type === "line") {
    let graphdataDistribution = [];
    let seriesDistribution = [];
    let seriesOrders = [];
    let min_seriesDistribution = [];
    let max_seriesDistribution = [];
    let refreshrate = 0;

    Object.values(data).map((period) => {
      seriesDistribution.push([
        convertToTimeSeries(period.period),
        parseInt(period.received),
      ]);
      seriesOrders.push([convertToTimeSeries(period.period), period.ordered]);
      min_seriesDistribution.push([
        convertToTimeSeries(period.period),
        period.stock_requirement__minimum,
      ]);
      max_seriesDistribution.push([
        convertToTimeSeries(period.period),
        period.stock_requirement__maximum,
      ]);
      if (period.month === getMonthNumber(endMonth.split(" ")[0])) {
        refreshrate =
          period.ordered === 0 ? 0 : (period.received / period.ordered) * 100;
      }
    });

    const sortedMin_seriesDistribution = dataSorter(min_seriesDistribution);

    const sortedSeriesDistribution = dataSorter(seriesDistribution);

    const sortedSeriesOrders = dataSorter(seriesOrders);

    const sortedMax_seriesDistribution = dataSorter(max_seriesDistribution);

    graphdataDistribution.push({
      name: "Min",
      data: sortedMin_seriesDistribution,
      color: "#A5E816",
    });
    graphdataDistribution.push({
      name: "Issued",
      data: sortedSeriesDistribution,
      color: "#1F77B4",
    });
    graphdataDistribution.push({
      name: "Ordered",
      data: sortedSeriesOrders,
      color: "red",
    });

    graphdataDistribution.push({
      name: "Max",
      data: sortedMax_seriesDistribution,
      color: "#FF7F0E",
    });
    return graphdataDistribution;
  } else if (type === "column_uptake_rate") {
    let graphdataUptake = [];
    let stockData = [];
    let immunisationData = [];
    let monthlyTargetData = [];
    let forceStartZeroData = [];
    let maxMonthlyTarget = 0;

    let uptake = "0";

    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      /* Certain data had invalid periods like 20172 instead of
            201702 which were causing errors. Hence the filter below. */
      if (item.period.toString().length === 5) continue;

      let periodIndex = convertToTimeSeries(item.period);
      let atHand =
        item.at_hand === undefined ? item.total_at_hand : item.at_hand;
      let received =
        item.received === undefined ? item.total_received : item.received;
      let consumed =
        item.consumed === undefined ? item.total_consumed : item.consumed;
      let monthlyTarget =
        item.stock_requirement__target === undefined
          ? item.total_target
          : item.stock_requirement__target;
      let totalStock = atHand + received;

      maxMonthlyTarget = Math.max(
        maxMonthlyTarget,
        Number(monthlyTarget.toFixed(0))
      );
      stockData.push({ x: periodIndex, y: Number(totalStock.toFixed(0)) });
      immunisationData.push({ x: periodIndex, y: Number(consumed.toFixed(0)) });
      monthlyTargetData.push({
        x: periodIndex,
        y: Number(monthlyTarget.toFixed(0)),
      });
      forceStartZeroData.push({ x: periodIndex, y: 0 });

      if (data[i].month === getMonthNumber(endMonth.split(" ")[0])) {
        uptake =
          received === 0 && atHand === 0
            ? 0
            : Math.round((consumed / totalStock) * 100);
      }
    }

    const sortedStockData = dataSorter(stockData);

    const sortedImmunisationData = dataSorter(immunisationData);

    const sortedMonthlyTargetData = dataSorter(monthlyTargetData);

    const sortedForceStartZeroData = dataSorter(forceStartZeroData);

    graphdataUptake.push({
      name: "Available Stock (Stock balance + Issues)",
      type: "column",
      maxPointWidth: 50,
      color: "green",
      data: sortedStockData,
      yAxis: 0,
    });
    graphdataUptake.push({
      name: "Children Immunised",
      type: "column",
      maxPointWidth: 50,
      color: "DodgerBlue",
      data: sortedImmunisationData,
      yAxis: 1,
    });
    graphdataUptake.push({
      name: "Monthly Targets",
      type: "line",
      data: sortedMonthlyTargetData,
      color: "red",
    });
    graphdataUptake.push({
      name: "",
      type: "line",
      color: "white", // strokeWidth: 0,
      data: sortedForceStartZeroData,
    });

    return graphdataUptake;
  } else if (type === "column_district_stock_trends") {
    let graphData = [];
    let stockData = [];
    let supplyData = [];
    let orderedData = [];

    let periodIndexes = [];

    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      /* Certain data had invalid periods like 20172 instead of
                201702 which were causing errors. Hence the filter below. */
      if (item.period.toString().length === 5) continue;

      let periodIndex = convertToTimeSeries(item.period);
      var atHand =
        item.at_hand === undefined ? item.total_at_hand : item.at_hand;
      var ordered =
        item.ordered === undefined ? item.total_ordered : item.ordered;
      var received =
        item.received === undefined ? item.total_received : item.received;

      stockData.push({ x: periodIndex, y: Number(atHand.toFixed(0)) });
      orderedData.push({ x: periodIndex, y: Number(ordered.toFixed(0)) });
      supplyData.push({ x: periodIndex, y: Number(received.toFixed(0)) });
    }

    const sortedStockData = dataSorter(stockData);

    const sortedOrderedData = dataSorter(orderedData);

    const sortedSupplyData = dataSorter(supplyData);

    graphData.push({
      name: "Stock Balance",
      color: "green",
      data: sortedStockData,
      maxPointWidth: 50,
    });
    graphData.push({
      name: "Orders",
      color: "DodgerBlue",
      data: sortedOrderedData,
      maxPointWidth: 50,
    });
    graphData.push({
      name: "Supply By NMS",
      color: "Orange",
      data: sortedSupplyData,
      maxPointWidth: 50,
    });
    return graphData;
  }
};
