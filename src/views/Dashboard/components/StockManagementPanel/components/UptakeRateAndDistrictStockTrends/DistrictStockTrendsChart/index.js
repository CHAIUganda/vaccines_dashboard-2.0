import React, { useState, useMemo, useContext } from "react";

// Bring in our stock management context
import { StockManagementContext } from "../../../../../../../context/StockManagement/StockManagementState";

// Highcharts for time series test
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Shared components
import { Chart } from "../../../../../../../../src/components";

// Chart Template
import { DistrictStockTrendsChartTemplate } from "./chart";

const DistrictStockTrendsChart = () => {
  const [chart, setChart] = useState();

  const { districtStockTrends } = useContext(StockManagementContext);

  const {
    endMonth,
    startMonth,
    vaccine,
    district,
    isLoading,
  } = districtStockTrends;

  const chartTitle = `${district} stock level monthly trends for ${vaccine}`;

  useMemo(() => {
    setChart(DistrictStockTrendsChartTemplate());
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startMonth, endMonth, vaccine, district]);

  return (
    <Chart
      title={chartTitle}
      chart={
        <HighchartsReact highcharts={Highcharts} options={chart && chart} />
      }
      isLoading={isLoading && isLoading}
      centerTitle={true}
      chartData={chart && chart}
    />
  );
};

export default DistrictStockTrendsChart;
