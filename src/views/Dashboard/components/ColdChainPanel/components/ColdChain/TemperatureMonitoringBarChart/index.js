import React, { useState, useMemo, useContext } from "react";

// Bring in our cold chain context
import { ColdChainContext } from "../../../../../../../context/ColdChain/ColdChainState";

// Highcharts for time series test
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Shared components
import { Chart } from "../../../../../../../components";

// Chart Template
import { TemperatureMonitoringBarChartTemplate } from "./chart";

const TemperatureMonitoringBarChart = () => {
  const [chart, setChart] = useState();
  const { temperatureMonitoring } = useContext(ColdChainContext);

  const { isLoading, district, year } = temperatureMonitoring;

  useMemo(() => {
    setChart(TemperatureMonitoringBarChartTemplate());
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [district, year]);

  return (
    <Chart
      title={`Total number of freeze and heat alarms ${
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

export default TemperatureMonitoringBarChart;
