import React, { useState, useMemo } from "react";

// Highcharts for time series test
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Shared componenrs
import { Chart } from "../../../../../../../components";

// Chart Template
import { StockBalancesPieChartTemplate } from "./chart";

// Utils

// import { generateMapTitle } from "../../../../../../../common/utils/mapUtils";

const StockBalancesPieChart = ({
  data,
  isLoading,
  endMonth,
  startMonth,
  district,
  vaccine
}) => {
  const [chart, setChart] = useState();

  useMemo(() => {
    if (data && data) {
      setChart(
        StockBalancesPieChartTemplate(
          data,
          endMonth,
          startMonth,
          district,
          vaccine
        )
      );
    }
  }, [data, endMonth, startMonth, district, vaccine]);

  return (
    <Chart
      chart={
        <HighchartsReact highcharts={Highcharts} options={chart && chart} />
      }
      isLoading={isLoading && isLoading}
    />
  );
};

export default StockBalancesPieChart;
