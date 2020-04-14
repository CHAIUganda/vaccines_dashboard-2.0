import React, { useState, useMemo, useContext } from "react";

// Bring in our performance management context
import { PerformanceManagementContext } from "../../../../../../../context/PerformanceManagement/PerformanceManagementState";

// Highcharts for time series test
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Shared componenrs
import { Chart } from "../../../../../../../components";

// Chart Template
import { NumberOfPlannedActivitiesBarChartTemplate } from "./chart";

const NumberOfPlannedActivitiesBarChart = () => {
  const [chart, setChart] = useState();
  const { activityCompletionStatus } = useContext(PerformanceManagementContext);

  const { isLoading } = activityCompletionStatus;

  useMemo(() => {
    setChart(NumberOfPlannedActivitiesBarChartTemplate());
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <Chart
      title={"Number of Planned Activities"}
      chart={
        <HighchartsReact highcharts={Highcharts} options={chart && chart} />
      }
      isLoading={isLoading}
      chartData={chart && chart}
    />
  );
};

export default NumberOfPlannedActivitiesBarChart;
