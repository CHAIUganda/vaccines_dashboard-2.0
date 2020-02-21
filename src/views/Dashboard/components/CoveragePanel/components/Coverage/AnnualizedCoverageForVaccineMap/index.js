import React, { useState, useMemo } from "react";

// Highcharts for time series test
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Shared componenrs
import { Chart } from "../../../../../../../components";

// Chart Template
import { vaccineAnnualizedCoverage } from "./chart";

// High Maps components
require("highcharts/modules/map")(Highcharts);

const AnnualizedCoverageForVaccineMap = ({
  data,
  endYear,
  tabTitle,
  dose,
  vaccineName,
  isLoading,
  reportYear,
  startYear
}) => {
  const [map, setMap] = useState();

  const mapTitle = `${
    tabTitle === "Annualized (CY)" || tabTitle === "Annualized (FY)"
      ? "Annualized"
      : "Monthly"
  } Coverage of ${
    vaccineName === "ALL" ? "PENTA3" : vaccineName
  } for ${startYear}`;

  useMemo(() => {
    if (data && data) {
      setMap(
        vaccineAnnualizedCoverage(
          data,
          startYear,
          endYear,
          tabTitle,
          dose,
          vaccineName
        )
      );
    }
  }, [data, tabTitle, dose, vaccineName, startYear, endYear]);

  return (
    <Chart
      title={mapTitle}
      chart={
        <HighchartsReact
          highcharts={Highcharts}
          options={map && map}
          constructorType={"mapChart"}
        />
      }
      isLoading={isLoading && isLoading}
    />
  );
};

export default AnnualizedCoverageForVaccineMap;
