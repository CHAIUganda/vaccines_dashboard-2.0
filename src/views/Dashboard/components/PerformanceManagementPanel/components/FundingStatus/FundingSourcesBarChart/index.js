import React, { useState, useMemo, useContext } from "react";

// Bring in our performance management context
import { PerformanceManagementContext } from "../../../../../../../context/PerformanceManagement/PerformanceManagementState";

// Highcharts for time series test
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Shared components
import { Chart } from "../../../../../../../components";

// Chart Template
import { FundingSourcesBarChartTemplate } from "./chart";

const FundingSourcesBarChart = () => {
  const { fundingStatus } = useContext(PerformanceManagementContext);

  const { isLoading, fundingSourcesData } = fundingStatus;

  const [chart, setChart] = useState();

  useMemo(() => {
    setChart(FundingSourcesBarChartTemplate(fundingSourcesData));
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <Chart
      title={"Budget allocation by Implementing Agency"}
      chart={
        <HighchartsReact highcharts={Highcharts} options={chart && chart} />
      }
      isLoading={isLoading && isLoading}
      chartData={chart && chart}
    />
  );
};

export default FundingSourcesBarChart;
