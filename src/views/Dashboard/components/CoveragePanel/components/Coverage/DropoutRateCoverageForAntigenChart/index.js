import React, { useState, useMemo, useContext } from "react";

// Bring in our coverage contenxt
import { CoverageContext } from "../../../../../../../context/Coverage/CoverageState";

// Highcharts for time series test
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Shared componenrs
import { Chart } from "../../../../../../../components";

// Chart Template
import { DropoutRateCoverageCY, DropoutRateCoverageFY } from "./chart";

// Utils

import { generateChartTitle } from "../../../../../../../common/utils/utils";

const DropoutRateForAntigensChart = ({ tabTitle, reportYear }) => {
  const { dropoutRate } = useContext(CoverageContext);
  const { startYear, vaccine, dose, isLoading, district } = dropoutRate;

  const [chart, setChart] = useState();

  const [chartTitle, setChartTitle] = useState();

  useMemo(() => {
    if (tabTitle === "Annualized (CY)" || tabTitle === "Monthly (CY)") {
      setChart(DropoutRateCoverageCY(tabTitle));
    } else {
      setChart(DropoutRateCoverageFY(tabTitle));
    }

    setChartTitle(
      generateChartTitle(
        tabTitle,
        vaccine,
        dose,
        "Dropout Rate",
        reportYear,
        startYear
      )
    );

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vaccine, startYear, district]);

  return (
    <Chart
      title={chartTitle}
      chart={
        <HighchartsReact highcharts={Highcharts} options={chart && chart} />
      }
      isLoading={isLoading}
      chartData={chart && chart}
    />
  );
};

export default DropoutRateForAntigensChart;
