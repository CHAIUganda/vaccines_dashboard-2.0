import React, { useState, useMemo, useContext } from "react";

// Bring in our coverage context
import { CoverageContext } from "../../../../../../../context/Coverage/CoverageState";

// Highcharts for time series test
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Shared componenrs
import { Chart } from "../../../../../../../components";

// Chart Template
import { DropoutRateCoverageMap } from "./chart";

// High Maps components
require("highcharts/modules/map")(Highcharts);

const DropoutRateCoverageForVaccineMap = ({ tabTitle }) => {
  const { dropoutRate } = useContext(CoverageContext);

  const { vaccine, dose, startYear, district, isLoading } = dropoutRate;
  const [map, setMap] = useState();

  const mapTitle = `${
    tabTitle === "Annualized (CY)" || tabTitle === "Annualized (FY)"
      ? "Annualized"
      : "Monthly"
  } Dropout Rate of ${vaccine === "ALL" ? "PENTA3" : vaccine} for ${startYear}`;

  useMemo(() => {
    setMap(DropoutRateCoverageMap(tabTitle));
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vaccine, startYear, district]);

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

export default DropoutRateCoverageForVaccineMap;
