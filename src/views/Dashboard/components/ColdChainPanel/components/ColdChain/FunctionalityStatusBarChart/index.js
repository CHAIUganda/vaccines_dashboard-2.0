import React, { useState, useMemo, useContext } from "react";

// Bring in our cold chain context
import { ColdChainContext } from "../../../../../../../context/ColdChain/ColdChainState";

// Highcharts for time series test
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Shared componenrs
import { Chart } from "../../../../../../../components";

// Chart Template
import { FunctionalityStatusBarChartTemplate } from "./chart";

const FunctionalityStatusBarChart = () => {
  const [chart, setChart] = useState();
  const { functionality } = useContext(ColdChainContext);

  const {
    isLoading,
    district,
    careLevel,
    startQuarter,
    endQuarter,
  } = functionality;

  useMemo(() => {
    setChart(FunctionalityStatusBarChartTemplate());
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [district, careLevel, startQuarter, endQuarter]);

  return (
    <Chart
      title={`Working status of fridges ${
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

export default FunctionalityStatusBarChart;
