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

  const [
    annualizedCoverageForAntigensChart,
    setAnnualizedCoverageForAntigensChart
  ] = useState();

  const [chartTitle, setChartTitle] = useState();
  const [dataState, setDataState] = useState(true);

  useMemo(() => {
    if (data && data) {
      if (tabTitle === "Cummulative (CY)" || tabTitle === "Monthly (CY)") {
        setAnnualizedCoverageForAntigensChart(
          antigensAnnualizedCoverageCY(data, startYear, endYear, dose, tabTitle)
        );
      } else {
        setAnnualizedCoverageForAntigensChart(
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
      // Check if we have series data in the chart so we can appropriately display a message when there is no data returned
      // if (
      //   annualizedCoverageForAntigensChart &&
      //   annualizedCoverageForAntigensChart.series
      // )
      //   console.log(
      //     annualizedCoverageForAntigensChart &&
      //       annualizedCoverageForAntigensChart
      //   );
    }
  }, [data, vaccineName, tabTitle, dose, startYear, endYear]);

  // const getDataState = data => {
  //   if (
  //     (data && !data.series === undefined) ||
  //     (data && !data.series.length === 0)
  //   ) {
  //     return false;
  //   }
  // };

  // const dataState = getDataState(
  //   annualizedCoverageForAntigensChart && annualizedCoverageForAntigensChart
  // );

  // console.log(dataState);

  return (
    <Chart
      title={chartTitle}
      chart={
        <HighchartsReact
          highcharts={Highcharts}
          options={
            annualizedCoverageForAntigensChart &&
            annualizedCoverageForAntigensChart
          }
        />
      }
      isLoading={isLoading && isLoading}
      // dataState={dataState}
    />
  );
};

export default CoverageForAntigensChart;
