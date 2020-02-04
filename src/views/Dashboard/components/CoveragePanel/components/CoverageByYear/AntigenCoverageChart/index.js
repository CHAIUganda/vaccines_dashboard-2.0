import React, { useState, useMemo } from "react";

// Highcharts for time series test
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Shared componenrs
import { Chart } from "../../../../../../../../src/components";

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
  const [coverageRateBarChart, setCoverageRateBarChart] = useState();
  const [chartTitle, setChartTile] = useState();

  const _setChartTile = (startYear, endYear) => {
    const range =
      startYear === endYear ? startYear : `${startYear} - ${endYear}`;
    const _vaccine = vaccineName === "ALL" ? `Antigens` : vaccineName;
    const _district = district === "National" ? `National Level` : district;

    return `${_vaccine} Coverage for ${range} for ${_district}`;
  };

  useMemo(() => {
    if (data && data) {
      setCoverageRateBarChart(coverageRateChartTemplate(data, vaccineName));
      setChartTile(_setChartTile(startYear, endYear));
    }
  }, [data, startYear, endYear, vaccineName, district]);

  return (
    <Chart
      title={chartTitle}
      chart={
        <HighchartsReact
          highcharts={Highcharts}
          options={coverageRateBarChart && coverageRateBarChart}
        />
      }
      isLoading={isLoading && isLoading}
      centerTitle={true}
    />
  );
};

export default AntigenCoverageChart;
