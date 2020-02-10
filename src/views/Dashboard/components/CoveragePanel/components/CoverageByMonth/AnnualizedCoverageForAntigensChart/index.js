import React, { useState, useMemo } from "react";

// Highcharts for time series test
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Shared componenrs
import { Chart } from "../../../../../../../components";

// Chart Template
import {
  antigensAnnualizedCoverageCY,
  antigensAnnualizedCoverageFY
} from "./chart";

// Utils
import { generateChartTitle } from "../../../../../../../common/utils/utils";

const CoverageForAntigensChart = props => {
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

  const [chart, setChart] = useState();

  const [chartTitle, setChartTitle] = useState();

  useMemo(() => {
    if (data && data) {
      if (tabTitle === "Annualized (CY)" || tabTitle === "Monthly (CY)") {
        setChart(
          antigensAnnualizedCoverageCY(data, startYear, endYear, dose, tabTitle)
        );
      } else {
        setChart(
          antigensAnnualizedCoverageFY(data, startYear, endYear, dose, tabTitle)
        );
      }

      setChartTitle(
        generateChartTitle(
          tabTitle && tabTitle,
          vaccineName && vaccineName,
          dose && dose,
          "Coverage",
          reportYear && reportYear,
          startYear
        )
      );
    }
  }, [data, vaccineName, tabTitle, dose, startYear, endYear]);

  return (
    <Chart
      title={chartTitle}
      chart={
        <HighchartsReact highcharts={Highcharts} options={chart && chart} />
      }
      isLoading={isLoading && isLoading}
      chartData={chart && chart}
    />
  );
};

export default CoverageForAntigensChart;
