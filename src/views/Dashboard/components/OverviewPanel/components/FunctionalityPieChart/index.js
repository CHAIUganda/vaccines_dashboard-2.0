import React, { useState, useMemo, useContext } from "react";

// Bring in our overview  context
import { OverviewContext } from "../../../../../../context/Overview/OverviewState";

// Highcharts for time series test
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Shared componenrs
import { Chart } from "../../../../../../components";

// Chart Template
import { FunctionalityPieChartTemplate } from "./chart";

const FunctionalityPieChart = () => {
  const [chart, setChart] = useState();
  const { coldChainfunctionalityData } = useContext(OverviewContext);

  const { isLoading } = coldChainfunctionalityData;

  useMemo(() => {
    setChart(FunctionalityPieChartTemplate());
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

export default FunctionalityPieChart;
