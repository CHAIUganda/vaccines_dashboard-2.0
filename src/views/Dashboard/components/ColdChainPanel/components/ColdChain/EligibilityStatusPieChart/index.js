import React, { useState, useMemo, useContext } from "react";

// Bring in our cold chain context
import { ColdChainContext } from "../../../../../../../context/ColdChain/ColdChainState";

// Highcharts for time series test
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Shared componenrs
import { Chart } from "../../../../../../../components";

// Chart Template
import { EligibilityStatusPieChartTemplate } from "./chart";

const EligibilityStatusPieChart = () => {
  const [chart, setChart] = useState();
  const { eligibility } = useContext(ColdChainContext);

  const {
    isLoading,
    district,
    careLevel,
    startQuarter,
    endQuarter,
  } = eligibility;

  useMemo(() => {
    setChart(EligibilityStatusPieChartTemplate());
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [district, careLevel, startQuarter, endQuarter]);

  return (
    <Chart
      title={`Eligible facilities ${
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

export default EligibilityStatusPieChart;
