import React, { useContext } from 'react';

// Bring in our overview  context
import { OverviewContext } from '../../../../../../context/Overview/OverviewState';

import ColdChainCard from '../ColdChainCard/index';

const backgroundImage =
  'linear-gradient(0deg, rgba(150,217,106,1) 0%, rgba(197,224,179,1) 100%)';

const OptimalityDVSCard = () => {
  const { coldChainOverviewData } = useContext(OverviewContext);

  const { isLoading } = coldChainOverviewData;

  const optimalityAtDVS =
    coldChainOverviewData?.coldChainOverviewData?.optimality_percentage_at_dvs;
  return (
    <ColdChainCard
      title={'Optimality (at DVS only)'}
      metric={optimalityAtDVS}
      type='advanced'
      isPercentage={true}
      backgroundImage={backgroundImage}
      isLoading={isLoading}
    />
  );
};

export default OptimalityDVSCard;
