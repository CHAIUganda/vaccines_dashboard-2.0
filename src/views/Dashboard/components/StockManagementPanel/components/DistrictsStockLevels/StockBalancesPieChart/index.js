import React, { useState, useMemo, useContext } from "react";

// Bring in our stock management context
import { StockManagementContext } from "../../../../../../../context/StockManagement/StockManagementState";

// Highcharts for time series test
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Shared components
import { Chart } from "../../../../../../../components";

// Chart Template
import { StockBalancesPieChartTemplate } from "./chart";

const StockBalancesPieChart = () => {
  const [chart, setChart] = useState();
  const { districtStockLevels } = useContext(StockManagementContext);

  const { endMonth, vaccine, isLoading } = districtStockLevels;

  useMemo(() => {
    setChart(StockBalancesPieChartTemplate());
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endMonth, vaccine]);

  return (
    <Chart
      chart={
        <HighchartsReact highcharts={Highcharts} options={chart && chart} />
      }
      isLoading={isLoading}
      chartData={chart && chart}
    />
  );
};

export default StockBalancesPieChart;
