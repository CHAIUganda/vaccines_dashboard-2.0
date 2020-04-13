import React, { useState, useMemo } from "react";
// Highcharts for time series test
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Shared componenrs
import { Chart } from "../../../../../../../components";

// Chart Template
import { ActivityByResponsibleOrganisationChartTemplate } from "./chart";

const ActivityByResponsibleOrganisationBarChart = ({ data, isLoading }) => {
  const [chart, setChart] = useState();

  useMemo(() => {
    setChart(ActivityByResponsibleOrganisationChartTemplate(data));
  }, [data]);

  return (
    <Chart
      title={"Activity by Responsible Organisation"}
      chart={
        <HighchartsReact highcharts={Highcharts} options={chart && chart} />
      }
      isLoading={isLoading && isLoading}
      chartData={chart && chart}
    />
  );
};

export default ActivityByResponsibleOrganisationBarChart;
