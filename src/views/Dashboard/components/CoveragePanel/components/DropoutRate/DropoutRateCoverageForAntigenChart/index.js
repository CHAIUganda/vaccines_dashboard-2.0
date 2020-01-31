import React, { useState, useMemo } from "react";

// Highcharts for time series test
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Shared componenrs
import { Chart } from "../../../../../../../components";

// Chart Template
import { dropoutRateCoverageCY, dropoutRateCoverageFY } from "./chart";

// Utils

import { generateChartTitle } from "../../../../../../../common/utils/utils";

const DropoutRateForAntigensChart = props => {
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
    dropoutRateCoverageForAntigensChart,
    setDropoutRateCoverageForAntigensChart
  ] = useState();

  const [chartTitle, setChartTitle] = useState();

  useMemo(() => {
    if (data && data) {
      if (tabTitle === "Cummulative (CY)" || tabTitle === "Monthly (CY)") {
        setDropoutRateCoverageForAntigensChart(
          dropoutRateCoverageCY(data, startYear, endYear, dose, tabTitle)
        );
      } else {
        setDropoutRateCoverageForAntigensChart(
          dropoutRateCoverageFY(data, startYear, endYear, dose, tabTitle)
        );
      }

      setChartTitle(
        generateChartTitle(
          tabTitle && tabTitle,
          vaccineName && vaccineName,
          dose && dose,
          "Dropout Rate",
          reportYear && reportYear,
          startYear && startYear
        )
      );
    }
  }, [data, vaccineName, tabTitle, dose, startYear, endYear]);

  return (
    <Chart
      title={chartTitle}
      chart={
        <HighchartsReact
          highcharts={Highcharts}
          options={
            dropoutRateCoverageForAntigensChart &&
            dropoutRateCoverageForAntigensChart
          }
        />
      }
      isLoading={isLoading && isLoading}
    />
  );
};

export default DropoutRateForAntigensChart;
