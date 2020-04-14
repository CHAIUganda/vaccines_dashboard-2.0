import React, { useState, useMemo, useContext } from "react";

// Bring in our cold chain context
import { ColdChainContext } from "../../../../../../../context/ColdChain/ColdChainState";

// Highcharts for time series test
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Shared components
import { Chart } from "../../../../../../../components";

// Chart Template
import { CapacityStatusBarChartTemplate } from "./chart";

const CapacityStatusBarChart = () => {
  const [chart, setChart] = useState();
  const { capacity } = useContext(ColdChainContext);
  const { isLoading, district, careLevel, startQuarter, endQuarter } = capacity;

  useMemo(() => {
    setChart(CapacityStatusBarChartTemplate());
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [district, careLevel, startQuarter, endQuarter]);

  return (
    <Chart
      title={`Storage capacity in litres ${
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

export default CapacityStatusBarChart;
