import React, { useContext } from 'react';

// Bring in our overview  context
import { OverviewContext } from '../../../../../../context/Overview/OverviewState';

import ColdChainCard from '../ColdChainCard/index';

const backgroundImage = `linear-gradient(0deg, rgba(80,131,218,1) 0%, rgba(142,170,219,1) 100%)`;

const OptimalityNationalCard = () => {
  const { coldChainOverviewData } = useContext(OverviewContext);

  const { isLoading } = coldChainOverviewData;

  const optimalityAtNational =
    coldChainOverviewData?.coldChainOverviewData
      ?.optimality_percentage_at_sites;

  return (
    <ColdChainCard
      title={'Optimality (Nationally across all sites)'}
      metric={optimalityAtNational}
      type='advanced'
      isPercentage={true}
      backgroundImage={backgroundImage}
      isLoading={isLoading}
    />
  );
};

export default OptimalityNationalCard;
