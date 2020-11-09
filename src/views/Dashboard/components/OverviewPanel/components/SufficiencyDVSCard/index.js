import React, { useContext } from 'react';

// Bring in our overview  context
import { OverviewContext } from '../../../../../../context/Overview/OverviewState';

import ColdChainCard from '../ColdChainCard/index';

const backgroundImage =
  'linear-gradient(0deg, rgb(36, 197, 63) 0px, rgb(36, 197, 63) 1%, rgb(93, 246, 115))';

const SurplusGapCard = () => {
  const { coldChainOverviewData } = useContext(OverviewContext);

  const { isLoading } = coldChainOverviewData;

  const sufficiencyAtDVS =
    coldChainOverviewData?.coldChainOverviewData?.sufficiency_percentage_at_dvs;
  return (
    <ColdChainCard
      title={'Sufficiency (at DVS only)'}
      metric={sufficiencyAtDVS}
      type='advanced'
      isPercentage={true}
      backgroundImage={backgroundImage}
      isLoading={isLoading}
    />
  );
};

export default SurplusGapCard;
