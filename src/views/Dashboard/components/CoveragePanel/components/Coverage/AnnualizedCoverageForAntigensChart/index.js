import React, { useState, useMemo, useContext } from "react";

// Bring in our coverage contenxt
import { CoverageContext } from "../../../../../../../context/Coverage/CoverageState";

// Highcharts for time series test
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Shared components
import { Chart } from "../../../../../../../components";

// Chart Template
import {
  AntigensAnnualizedCoverageCY,
  AntigensAnnualizedCoverageFY,
} from "./chart";

// Utils
import { generateChartTitle } from "../../../../../../../common/utils/utils";

const CoverageForAntigensChart = ({ tabTitle, reportYear }) => {
  const { coverageByMonth } = useContext(CoverageContext);
  const { startYear, vaccine, dose, isLoading, district } = coverageByMonth;

  const [chart, setChart] = useState();
  const [chartTitle, setChartTitle] = useState();

  useMemo(() => {
    if (tabTitle === "Annualized (CY)" || tabTitle === "Monthly (CY)") {
      setChart(AntigensAnnualizedCoverageCY(tabTitle));
    } else {
      setChart(AntigensAnnualizedCoverageFY(tabTitle));
    }

    setChartTitle(
      generateChartTitle(
        tabTitle,
        vaccine,
        dose,
        "Coverage",
        reportYear,
        startYear
      )
    );
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vaccine, dose, startYear, district]);

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

export default CoverageForAntigensChart;
