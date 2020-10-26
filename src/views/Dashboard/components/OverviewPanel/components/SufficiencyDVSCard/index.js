import React, { useContext } from 'react';

// Bring in our overview  context
import { OverviewContext } from '../../../../../../context/Overview/OverviewState';

import ColdChainCard from '../ColdChainCard/index';

const backgroundImage =
  'linear-gradient(0deg, rgb(36, 197, 63) 0px, rgb(36, 197, 63) 1%, rgb(93, 246, 115))';

const SurplusGapCard = () => {
  const { coldChainCapacityData } = useContext(OverviewContext);

  const { isLoading } = coldChainCapacityData;

  const capacity_shortage_positive =
    coldChainCapacityData?.capacityMetricsChartData?.gap_metrics
      .positive_gap_percentage;

  return (
    <ColdChainCard
      title={'Sufficiency (at DVS only)'}
      metric={'85'}
      // sign={'%'}
      isPercentage={true}
      backgroundImage={backgroundImage}
      isLoading={isLoading}
    />
  );
};

export default SurplusGapCard;
