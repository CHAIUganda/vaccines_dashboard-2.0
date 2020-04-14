import React, { useState, useMemo, useContext } from "react";

// Bring in our stock management context
import { StockManagementContext } from "../../../../../../../context/StockManagement/StockManagementState";

// Highcharts for time series test
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Shared components
import { Chart } from "../../../../../../../components";

// Chart Template
import { RefillRateLineChartTemplate } from "./chart";

const RefillRateLineChart = () => {
  const [chart, setChart] = useState();
  const { refillRate } = useContext(StockManagementContext);
  const { startMonth, endMonth, isLoading, vaccine, district } = refillRate;

  useMemo(() => {
    setChart(RefillRateLineChartTemplate());
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endMonth, startMonth, vaccine, district]);

  return (
    <Chart
      title={`Distribution of ${vaccine} for ${district} `}
      chart={
        <HighchartsReact highcharts={Highcharts} options={chart && chart} />
      }
      isLoading={isLoading && isLoading}
      chartData={chart && chart}
    />
  );
};

export default RefillRateLineChart;
