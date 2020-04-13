import React, { useState, useMemo } from "react";
// Highcharts for time series test
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Shared componenrs
import { Chart } from "../../../../../../../components";

// Chart Template
import { NumberOfPlannedActivitiesBarChartTemplate } from "./chart";

const NumberOfPlannedActivitiesBarChart = ({ data, isLoading }) => {
  const [chart, setChart] = useState();

  useMemo(() => {
    setChart(NumberOfPlannedActivitiesBarChartTemplate(data));
  }, [data]);

  return (
    <Chart
      title={"Number of Planned Activities"}
      chart={
        <HighchartsReact highcharts={Highcharts} options={chart && chart} />
      }
      isLoading={isLoading && isLoading}
      chartData={chart && chart}
    />
  );
};

export default NumberOfPlannedActivitiesBarChart;
