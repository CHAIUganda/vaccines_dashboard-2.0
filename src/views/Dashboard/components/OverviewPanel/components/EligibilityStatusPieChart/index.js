import React, { useState, useMemo, useContext } from "react";

// Bring in our overview  context
import { OverviewContext } from "../../../../../../context/Overview/OverviewState";

// Highcharts for time series test
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Shared components
import { Chart } from "../../../../../../components";

// Chart Template
import { EligibilityStatusPieChartTemplate } from "./chart";

const EligibilityStatusPieChart = () => {
  const [chart, setChart] = useState();
  const { coldChainEligibilityData } = useContext(OverviewContext);

  const { isLoading } = coldChainEligibilityData;

  useMemo(() => {
    setChart(EligibilityStatusPieChartTemplate());
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <Chart
      elevate={0}
      chart={
        <HighchartsReact highcharts={Highcharts} options={chart && chart} />
      }
      isLoading={isLoading}
      chartData={chart && chart}
    />
  );
};

export default EligibilityStatusPieChart;
