import React, { useState, useMemo } from "react";

// Highcharts for time series test
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Shared componenrs
import { Chart } from "../../../../../../../components";

// Chart Template
import { vaccineAnnualizedCoverage } from "./chart";

// Utils

import { generateMapTitle } from "../../../../../../../common/utils/mapUtils";

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
  const [
    annualizedVaccineCoverageMap,
    setAnnualizedVaccineCoverageMap
  ] = useState();

  // const [dataState, setDataState] = useState(true);

  const [mapTitle, setMapTitle] = useState(
    "Annualized Coverage of PENTA3 for June 2019"
  );

  useMemo(() => {
    if (data && data) {
      setAnnualizedVaccineCoverageMap(
        vaccineAnnualizedCoverage(
          data,
          startYear,
          endYear,
          tabTitle,
          dose,
          vaccineName
        )
      );

      // setMapTitle(
      //   generateMapTitle(
      //     tabTitle && tabTitle,
      //     vaccineName && vaccineName,
      //     dose && dose,
      //     "Coverage",
      //     reportYear && reportYear,
      //     startYear
      //   )
      // );
    }
  }, [data, tabTitle, dose, vaccineName, startYear, endYear]);

  // const dataState = () => {
  //   if (
  //     (annualizedVaccineCoverageMap && !annualizedVaccineCoverageMap.series) ||
  //     (annualizedVaccineCoverageMap &&
  //       !annualizedVaccineCoverageMap.series.length)
  //   ) {
  //     return false;
  //   }
  // };

  return (
    <Chart
      title={mapTitle}
      chart={
        <HighchartsReact
          highcharts={Highcharts}
          options={annualizedVaccineCoverageMap && annualizedVaccineCoverageMap}
          constructorType={"mapChart"}
        />
      }
      isLoading={isLoading && isLoading}
      // dataState={dataState()}
    />
  );
};

export default AnnualizedCoverageForVaccineMap;
