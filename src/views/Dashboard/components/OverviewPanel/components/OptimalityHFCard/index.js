import React, { useContext } from 'react';

// Bring in our overview  context
import { OverviewContext } from '../../../../../../context/Overview/OverviewState';

import ColdChainCard from '../ColdChainCard/index';

const backgroundImage =
  'linear-gradient(0deg, rgba(255,192,0,1) 0%, rgba(241,214,130,1) 100%)';

const OptimalityHFCard = () => {
  const { coldChainCapacityData } = useContext(OverviewContext);

  const { isLoading } = coldChainCapacityData;

  const capacity_shortage_negative =
    coldChainCapacityData?.capacityMetricsChartData?.gap_metrics
      .negative_gap_percentage;

  return (
    <ColdChainCard
      title={'Sufficiency (at HF only)'}
      metric={'55'}
      isPercentage={true}
      backgroundImage={backgroundImage}
      isLoading={isLoading}
    />
  );
};

export default OptimalityHFCard;
