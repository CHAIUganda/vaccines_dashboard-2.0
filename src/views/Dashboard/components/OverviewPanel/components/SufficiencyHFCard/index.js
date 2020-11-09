import React, { useContext } from 'react';

// Bring in our overview  context
import { OverviewContext } from '../../../../../../context/Overview/OverviewState';

import ColdChainCard from '../ColdChainCard/index';

const backgroundImage =
  'linear-gradient(0deg, #f83245 0px, #f83245 1%, #ff6372)';

const SufficiencyHFCard = () => {
  const { coldChainOverviewData } = useContext(OverviewContext);

  const { isLoading } = coldChainOverviewData;

  const sufficiencyAtHF =
    coldChainOverviewData?.coldChainOverviewData?.sufficiency_percentage_at_hfs;

  return (
    <ColdChainCard
      title={'Sufficiency (at HF only)'}
      metric={sufficiencyAtHF}
      type='advanced'
      isPercentage={true}
      backgroundImage={backgroundImage}
      isLoading={isLoading}
    />
  );
};

export default SufficiencyHFCard;
