import React, { useState, useMemo, useContext } from "react";

// Bring in our performance management context
import { PerformanceManagementContext } from "../../../../../../../context/PerformanceManagement/PerformanceManagementState";

// Highcharts for time series
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Shared componenrs
import { Chart } from "../../../../../../../components";

// Chart Template
import { ActivityByResponsibleOrganisationChartTemplate } from "./chart";

const ActivityByResponsibleOrganisationBarChart = () => {
  const { activityCompletionStatus } = useContext(PerformanceManagementContext);
  const {
    isLoading,
    activitiesByResponsibleOrganisation,
  } = activityCompletionStatus;

  const [chart, setChart] = useState();

  useMemo(() => {
    setChart(
      ActivityByResponsibleOrganisationChartTemplate(
        activitiesByResponsibleOrganisation
      )
    );
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <Chart
      title={"Activity by Responsible Organisation"}
      chart={
        <HighchartsReact highcharts={Highcharts} options={chart && chart} />
      }
      isLoading={isLoading}
      chartData={chart && chart}
    />
  );
};

export default ActivityByResponsibleOrganisationBarChart;
