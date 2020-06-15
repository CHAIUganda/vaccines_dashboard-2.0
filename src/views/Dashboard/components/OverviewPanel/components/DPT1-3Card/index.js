import React, { useContext } from "react";

// Bring in our overview  context
import { OverviewContext } from "../../../../../../context/Overview/OverviewState";

// Utils
import { getUnepiCoverage } from "../../../../../../common/utils/utils";

import StockCard from "../StockCard/index";

const greenBackgroundImage =
  "linear-gradient(0deg, rgb(36, 197, 63) 0px, rgb(36, 197, 63) 1%, rgb(93, 246, 115))";

const redBackgroundImage =
  "linear-gradient(0deg, #f83245 0px, #f83245 1%, #ff6372)";

const DPT13Card = () => {
  const { coverageData } = useContext(OverviewContext);

  const { isLoading, data, period } = coverageData;

  const { dropout_Penta } = getUnepiCoverage(data, period);

  const backgroundImage =
    dropout_Penta > 10
      ? redBackgroundImage
      : dropout_Penta < 10
      ? greenBackgroundImage
      : "";
  return (
    <StockCard
      title={"Drop Out Rate DPT1-3"}
      metric={isNaN(dropout_Penta) ? 0 : dropout_Penta}
      isPercentage
      isLoading={isLoading}
      backgroundImage={backgroundImage}
    />
  );
};

export default DPT13Card;
