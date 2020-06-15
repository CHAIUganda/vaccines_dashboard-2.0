import React, { useContext } from "react";

// Bring in our overview  context
import { OverviewContext } from "../../../../../../context/Overview/OverviewState";

// Utils
import { getUnepiCoverage } from "../../../../../../common/utils/utils";

import StockCard from "../StockCard/index";

const DPT3PCV3GAPCard = () => {
  const { coverageData } = useContext(OverviewContext);

  const { isLoading, data, period } = coverageData;

  const { Gap } = getUnepiCoverage(data, period);

  return (
    <StockCard
      title={"DPT3-PCV3 GAP"}
      metric={isNaN(Gap) ? 0 : Gap}
      isPercentage
      denominator={100}
      isLoading={isLoading}
    />
  );
};

export default DPT3PCV3GAPCard;
