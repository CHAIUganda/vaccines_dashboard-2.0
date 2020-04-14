import React, { useContext } from "react";

// Bring in our overview  context
import { OverviewContext } from "../../../../../../context/Overview/OverviewState";

import ColdChainCard from "../ColdChainCard/index";

const backgroundImage =
  "linear-gradient(0deg, #f83245 0px, #f83245 1%, #ff6372)";

const ShortageGapCard = () => {
  const { coldChainCapacityData } = useContext(OverviewContext);

  const { isLoading } = coldChainCapacityData;

  const capacity_shortage_negative =
    coldChainCapacityData?.capacityMetricsChartData?.gap_metrics
      .negative_gap_percentage;

  return (
    <ColdChainCard
      title={"Shortage (-ve gap)"}
      metric={capacity_shortage_negative}
      isPercentage={true}
      backgroundImage={backgroundImage}
      isLoading={isLoading}
    />
  );
};

export default ShortageGapCard;
