import React, { useContext } from 'react';

// Bring in our overview  context
import { OverviewContext } from '../../../../../../context/Overview/OverviewState';

import ColdChainCard from '../ColdChainCard/index';

const backgroundImage =
  'linear-gradient(0deg, rgba(255,192,0,1) 0%, rgba(241,214,130,1) 100%)';

const OptimalityHFCard = () => {
  const { coldChainOverviewData } = useContext(OverviewContext);

  const { isLoading } = coldChainOverviewData;

  const optimalityAtHF =
    coldChainOverviewData?.coldChainOverviewData?.optimality_percentage_at_hfs;

  return (
    <ColdChainCard
      title={'Optimality (at HF only)'}
      metric={optimalityAtHF}
      type='advanced'
      isPercentage={true}
      backgroundImage={backgroundImage}
      isLoading={isLoading}
    />
  );
};

export default OptimalityHFCard;
