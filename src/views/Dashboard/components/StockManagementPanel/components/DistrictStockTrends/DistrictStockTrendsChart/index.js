import React, { useState, useMemo } from "react";

// Highcharts for time series test
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Shared componenrs
import { Chart } from "../../../../../../../../src/components";

// Chart Template
import { districtStockTrendsChartTemplate } from "./chart";

const DistrictStockTrendsChart = ({
  data,
  isLoading,
  endMonth,
  startMonth,
  district,
  vaccine
}) => {
  const [chart, setChart] = useState();

  const chartTitle = `${district} stock level monthly trends for ${vaccine}`;
  useMemo(() => {
    if (data && data) {
      setChart(
        districtStockTrendsChartTemplate(
          data,
          endMonth,
          startMonth,
          district,
          vaccine
        )
      );
    }
  }, [data, startMonth, endMonth, vaccine, district]);

  return (
    <Chart
      title={chartTitle}
      chart={
        <HighchartsReact highcharts={Highcharts} options={chart && chart} />
      }
      isLoading={isLoading && isLoading}
      centerTitle={true}
    />
  );
};

export default DistrictStockTrendsChart;
