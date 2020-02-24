import React, { useState, useMemo } from "react";

// Highcharts for time series test
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Shared componenrs
import { Chart } from "../../../../../../../components";

// Chart Template
import { redCategorisationCoverageChart } from "./chart";

// Utils

import { generateChartTitle } from "../../../../../../../common/utils/utils";

const RedCategorisationForAntigensChart = props => {
  const {
    data,
    tabTitle,
    vaccineName,
    dose,
    isLoading,
    startYear,
    endYear,
    reportYear
  } = props;

  const [
    redcategorisationCoverageForAntigensChart,
    setRedcategorisationCoverageForAntigensChart
  ] = useState();

  const [chartTitle, setChartTitle] = useState();

  useMemo(() => {
    if (data && data) {
      setRedcategorisationCoverageForAntigensChart(
        redCategorisationCoverageChart(data, startYear, endYear, dose, tabTitle)
      );

      setChartTitle(
        generateChartTitle(
          tabTitle && tabTitle,
          vaccineName && vaccineName,
          dose && dose,
          "Red Categorization",
          reportYear && reportYear,
          startYear && startYear
        )
      );
    }
  }, [data, vaccineName, tabTitle, dose, startYear, endYear, reportYear]);

  return (
    <Chart
      title={chartTitle}
      chart={
        <HighchartsReact
          highcharts={Highcharts}
          options={
            redcategorisationCoverageForAntigensChart &&
            redcategorisationCoverageForAntigensChart
          }
        />
      }
      isLoading={isLoading && isLoading}
    />
  );
};

export default RedCategorisationForAntigensChart;
