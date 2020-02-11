import React, { useState, useMemo } from "react";

// Highcharts for time series test
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Shared componenrs
import { Chart } from "../../../../../../../components";

// Chart Template
import { dropoutRateCoverageMap } from "./chart";

// Utils

import { generateMapTitle } from "../../../../../../../common/utils/mapUtils";

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
  const [_dropoutRateCoverageMap, setDropoutRateCoverageMap] = useState();

  const [mapTitle, setMapTitle] = useState(
    "Annualized Coverage of PENTA3 for June 2019"
  );

  useMemo(() => {
    if (data && data) {
      setDropoutRateCoverageMap(
        dropoutRateCoverageMap(
          data,
          startYear,

          tabTitle,

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
  }, [data, tabTitle, vaccineName, startYear]);

  return (
    <Chart
      title={mapTitle}
      chart={
        <HighchartsReact
          highcharts={Highcharts}
          options={_dropoutRateCoverageMap && _dropoutRateCoverageMap}
          constructorType={"mapChart"}
        />
      }
      isLoading={isLoading && isLoading}
    />
  );
};

export default DropoutRateCoverageForVaccineMap;
