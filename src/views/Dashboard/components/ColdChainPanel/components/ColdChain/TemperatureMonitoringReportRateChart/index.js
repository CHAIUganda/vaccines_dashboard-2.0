import React, { useState, useMemo, useContext } from "react";

// Bring in our cold chain context
import { ColdChainContext } from "../../../../../../../context/ColdChain/ColdChainState";

// Highcharts for time series test
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Shared components
import { Chart } from "../../../../../../../components";

// Chart Template
import { TemperatureMonitoringReportRateChartTemplate } from "./chart";

const TemperatureMonitoringReportRateChart = () => {
  const [chart, setChart] = useState();

  const { temperatureMonitoring } = useContext(ColdChainContext);
  const { isLoading, district, year } = temperatureMonitoring;

  useMemo(() => {
    setChart(TemperatureMonitoringReportRateChartTemplate());
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [district, year]);

  return (
    <Chart
      title={`Proportion of districts submitting temperature data for ${year}`}
      chart={
        <HighchartsReact highcharts={Highcharts} options={chart && chart} />
      }
      isLoading={isLoading && isLoading}
      chartData={chart && chart}
    />
  );
};

export default TemperatureMonitoringReportRateChart;
