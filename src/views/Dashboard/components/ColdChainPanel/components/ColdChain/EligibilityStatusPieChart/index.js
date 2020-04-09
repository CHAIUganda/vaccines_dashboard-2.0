import React, { useState, useMemo } from "react";
// Highcharts for time series test
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Shared componenrs
import { Chart } from "../../../../../../../components";

// Chart Template
import { EligibilityStatusPieChartTemplate } from "./chart";

const EligibilityStatusPieChart = ({
  data,
  isLoading,
  district,
  careLevel,
  startQuarter,
  endQuarter,
}) => {
  const [chart, setChart] = useState();

  useMemo(() => {
    if (data && data) {
      setChart(
        EligibilityStatusPieChartTemplate(
          data,
          district,
          careLevel,
          startQuarter,
          endQuarter
        )
      );
    }
  }, [data, district, careLevel, startQuarter, endQuarter]);

  return (
    <Chart
      title={`Eligible facilities ${
        district === "national" ? "at National Level" : "in " + district
      }`}
      chart={
        <HighchartsReact highcharts={Highcharts} options={chart && chart} />
      }
      isLoading={isLoading && isLoading}
      chartData={chart && chart}
    />
  );
};

export default EligibilityStatusPieChart;
