import React, { useContext } from 'react';

// Bring in our overview  context
import { OverviewContext } from '../../../../../../context/Overview/OverviewState';

import ColdChainCard from '../ColdChainCard/index';

const backgroundImage = 'linear-gradient(0deg,#1e3c72 0,#1e3c72 1%,#2a5298)';

const SufficiencyNationalCard = () => {
  const { coldChainOverviewData } = useContext(OverviewContext);

  const { isLoading } = coldChainOverviewData;

  const sufficiencyAtNational =
    coldChainOverviewData?.coldChainOverviewData
      ?.sufficiency_percentage_at_sites;

  return (
    <ColdChainCard
      title={'Sufficiency (Nationally across all sites)'}
      metric={sufficiencyAtNational}
      type='advanced'
      isPercentage={true}
      backgroundImage={backgroundImage}
      isLoading={isLoading}
    />
  );
};

export default SufficiencyNationalCard;
