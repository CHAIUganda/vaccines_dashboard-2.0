import React, { useContext } from "react";

// Bring in our overview  context
import { OverviewContext } from "../../../../../../context/Overview/OverviewState";

// Utils
import { getUnepiCoverage } from "../../../../../../common/utils/utils";

import StockCard from "../StockCard/index";

const HPV12Card = () => {
  const { coverageData } = useContext(OverviewContext);

  const { isLoading, data, period } = coverageData;

  const { dropout_hpv } = getUnepiCoverage(data, period);

  return (
    <StockCard
      title={"Drop Out Rate HPV1-2"}
      metric={isNaN(dropout_hpv) ? 0 : dropout_hpv}
      isPercentage
      denominator={100}
      isLoading={isLoading}
    />
  );
};

export default HPV12Card;
