import React, { useState, useMemo, useContext } from "react";

// Bring in our cold chain context
import { CoverageContext } from "../../../../../../../context/Coverage/CoverageState";

// Highcharts for time series test
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Shared components
import { Chart } from "../../../../../../../components";

// Chart Template
import { RedcategorisationCoverageMap } from "./chart";

// High Maps components
require("highcharts/modules/map")(Highcharts);

const RedCategorisationCoverageForVaccineMap = ({ tabTitle }) => {
  const { redCategorisation } = useContext(CoverageContext);

  const { vaccine, endYear, startYear, isLoading } = redCategorisation;

  const [map, setMap] = useState();

  const mapTitle = `${
    tabTitle === "Annualized (CY)" || tabTitle === "Annualized (FY)"
      ? "Annualized"
      : "Monthly"
  } Red Categorization of ${
    vaccine === "ALL" ? "PENTA3" : vaccine
  } for ${endYear}`;

  useMemo(() => {
    setMap(RedcategorisationCoverageMap(tabTitle));
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startYear, vaccine]);

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

export default RedCategorisationCoverageForVaccineMap;
