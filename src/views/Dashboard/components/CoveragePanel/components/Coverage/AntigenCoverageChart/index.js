import React, { useState, useMemo } from "react";

// Highcharts for time series test
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Shared componenrs
import { Chart } from "../../../../../../../components";

// Chart Template
import { coverageRateChartTemplate } from "./chart";

const AntigenCoverageChart = ({
  data,
  startYear,
  endYear,
  isLoading,
  vaccineName,
  district
}) => {
  const [chart, setChart] = useState();
  const [chartTitle, setChartTile] = useState();

  const _setChartTile = (startYear, endYear) => {
    const range =
      startYear === endYear ? startYear : `${startYear} - ${endYear}`;
    const _vaccine = vaccineName === "ALL" ? `Antigens` : vaccineName;
    const _district =
      district.length === 1
        ? "National Level"
        : district.filter(name => name !== "National");

    return `${_vaccine} Coverage for ${range} for ${_district}`;
  };

  useMemo(() => {
    if (data && data) {
      setChart(
        coverageRateChartTemplate(data, vaccineName, startYear, district)
      );
      setChartTile(_setChartTile(startYear, endYear));
    }
  }, [data, startYear, endYear, vaccineName, district]);

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
