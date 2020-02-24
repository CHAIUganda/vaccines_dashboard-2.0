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
    reportYear,
    district
  } = props;

  const [chart, setChart] = useState();

  const [chartTitle, setChartTitle] = useState();

  console.log(vaccineName);

  useMemo(() => {
    if (data && data) {
      if (tabTitle === "Annualized (CY)" || tabTitle === "Monthly (CY)") {
        setChart(
          dropoutRateCoverageCY(
            data,
            startYear,
            endYear,
            dose,
            tabTitle,
            district
          )
        );
      } else {
        setChart(
          dropoutRateCoverageFY(
            data,
            startYear,
            endYear,
            dose,
            tabTitle,
            district
          )
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
        <HighchartsReact highcharts={Highcharts} options={chart && chart} />
      }
      isLoading={isLoading && isLoading}
      chartData={chart && chart}
    />
  );
};

export default DropoutRateForAntigensChart;
