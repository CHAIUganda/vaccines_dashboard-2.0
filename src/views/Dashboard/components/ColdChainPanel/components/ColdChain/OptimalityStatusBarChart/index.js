import React, { useState, useMemo, useContext } from "react";

// Bring in our cold chain context
import { ColdChainContext } from "../../../../../../../context/ColdChain/ColdChainState";

// Highcharts for time series test
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Shared components
import { Chart } from "../../../../../../../components";

// Chart Template
import { OptimalityStatusBarChartTemplate } from "./chart";

const OptimalityStatusBarChart = () => {
  const [chart, setChart] = useState();
  const { optimality } = useContext(ColdChainContext);

  const { isLoading, district, careLevel, year } = optimality;

  useMemo(() => {
    setChart(OptimalityStatusBarChartTemplate());
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [careLevel, year, district]);

  return (
    <Chart
      title={`Number of optimal CCE's ${
        district === "national" ? "at National Level" : "in " + district
      }`}
      chart={
        <HighchartsReact highcharts={Highcharts} options={chart && chart} />
      }
      isLoading={isLoading && isLoading}
      chartData={chart && chart}
    />
  );
};

export default OptimalityStatusBarChart;
