import React, { useState, useMemo } from "react";

// Highcharts for time series test
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Shared componenrs
import { Chart } from "../../../../../../../components";

// Chart Template
import { redcategorisationCoverageMap } from "./chart";

// High Maps components
require("highcharts/modules/map")(Highcharts);

const DropoutRateCoverageForVaccineMap = ({
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
  } Red Categorization of ${
    vaccineName === "ALL" ? "PENTA3" : vaccineName
  } for ${endYear}`;

  useMemo(() => {
    if (data && data) {
      setMap(
        redcategorisationCoverageMap(data, endYear, tabTitle, dose, vaccineName)
      );
    }
  }, [data, endYear, tabTitle, dose, vaccineName]);

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

export default DropoutRateCoverageForVaccineMap;
