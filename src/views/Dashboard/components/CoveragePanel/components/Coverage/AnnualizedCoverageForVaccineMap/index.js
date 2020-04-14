import React, { useState, useMemo, useContext } from "react";

// Bring in our coverage context
import { CoverageContext } from "../../../../../../../context/Coverage/CoverageState";

// Highcharts for time series test
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Shared components
import { Chart } from "../../../../../../../components";

// Chart Template
import { VaccineAnnualizedCoverage } from "./chart";

// High Maps components
require("highcharts/modules/map")(Highcharts);

const AnnualizedCoverageForVaccineMap = ({ tabTitle }) => {
  const { coverageByMonth } = useContext(CoverageContext);

  const { vaccine, startYear, isLoading } = coverageByMonth;

  const [map, setMap] = useState();

  const mapTitle = `${
    tabTitle === "Annualized (CY)" || tabTitle === "Annualized (FY)"
      ? "Annualized"
      : "Monthly"
  } Coverage of ${vaccine === "ALL" ? "PENTA3" : vaccine} for ${startYear}`;

  useMemo(() => {
    setMap(VaccineAnnualizedCoverage(tabTitle));
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

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
      isLoading={isLoading}
    />
  );
};

export default AnnualizedCoverageForVaccineMap;
