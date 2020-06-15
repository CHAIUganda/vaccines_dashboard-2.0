import React, { useState, useMemo, useContext } from "react";

// Bring in our coverage contenxt
import { CoverageContext } from "../../../../../../../context/Coverage/CoverageState";

// Highcharts for time series test
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Shared components
import { Chart } from "../../../../../../../components";

// Chart Template
import { CoverageRateChartTemplate } from "./chart";

const AntigenCoverageChart = () => {
  const { coverageByYear } = useContext(CoverageContext);
  const { startYear, endYear, vaccine, isLoading, district } = coverageByYear;

  const [chart, setChart] = useState();
  const [chartTitle, setChartTile] = useState();

  const _setChartTile = (startYear, endYear) => {
    const range =
      startYear === endYear ? startYear : `${startYear} - ${endYear}`;
    const _vaccine = vaccine === "ALL" ? `Antigens` : vaccine;
    const _district =
      district?.length === 1
        ? "National Level"
        : district?.filter((name) => name !== "National");

    return `${_vaccine} Coverage for ${range} for ${_district}`;
  };

  useMemo(() => {
    setChart(CoverageRateChartTemplate());
    setChartTile(_setChartTile(startYear, endYear));
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startYear, endYear, vaccine, district]);

  return (
    <Chart
      title={chartTitle}
      chart={
        <HighchartsReact highcharts={Highcharts} options={chart && chart} />
      }
      isLoading={isLoading && isLoading}
      centerTitle={true}
      chartData={chart && chart}
    />
  );
};

export default AntigenCoverageChart;
