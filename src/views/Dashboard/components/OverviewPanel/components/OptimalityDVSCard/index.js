import React, { useContext } from 'react';

// Bring in our overview  context
import { OverviewContext } from '../../../../../../context/Overview/OverviewState';

import ColdChainCard from '../ColdChainCard/index';

const backgroundImage =
  'linear-gradient(0deg, rgba(150,217,106,1) 0%, rgba(197,224,179,1) 100%)';

const OptimalityDVSCard = () => {
  const { coldChainCapacityData } = useContext(OverviewContext);

  const { isLoading } = coldChainCapacityData;

  const capacity_shortage_positive =
    coldChainCapacityData?.capacityMetricsChartData?.gap_metrics
      .positive_gap_percentage;

  return (
    <ColdChainCard
      title={'Optimality (at DVS only)'}
      metric={'70'}
      isPercentage={true}
      backgroundImage={backgroundImage}
      isLoading={isLoading}
    />
  );
};

export default OptimalityDVSCard;
