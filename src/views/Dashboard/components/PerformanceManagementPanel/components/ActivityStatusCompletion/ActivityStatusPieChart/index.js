import React, { useState, useMemo, useContext } from "react";

// Bring in our performance management context
import { PerformanceManagementContext } from "../../../../../../../context/PerformanceManagement/PerformanceManagementState";

// Highcharts for time series test
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Shared components
import { Chart } from "../../../../../../../components";

// Chart Template
import { ActivityStatusChartTemplate } from "./chart";

const ActivityStatusPieChart = () => {
  const [chart, setChart] = useState();
  const { activityCompletionStatus } = useContext(PerformanceManagementContext);

  const { isLoading, completionStatus } = activityCompletionStatus;

  useMemo(() => {
    setChart(ActivityStatusChartTemplate(completionStatus));
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <Chart
      elevate={0}
      title={"Activity status"}
      chart={
        <HighchartsReact highcharts={Highcharts} options={chart && chart} />
      }
      isLoading={isLoading}
      chartData={chart && chart}
    />
  );
};

export default ActivityStatusPieChart;
