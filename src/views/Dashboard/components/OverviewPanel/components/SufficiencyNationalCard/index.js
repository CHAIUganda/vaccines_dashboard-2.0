import React, { useContext } from 'react';

// Bring in our overview  context
import { OverviewContext } from '../../../../../../context/Overview/OverviewState';

import ColdChainCard from '../ColdChainCard/index';

const backgroundImage = 'linear-gradient(0deg,#1e3c72 0,#1e3c72 1%,#2a5298)';

const SufficiencyNationalCard = () => {
  const { coldChainCapacityData } = useContext(OverviewContext);

  const { isLoading } = coldChainCapacityData;
  const totalAvailableLiters = new Intl.NumberFormat('lg-UG').format(
    coldChainCapacityData?.capacityMetricsChartData?.overall_total_available,
  );

  return (
    <ColdChainCard
      title={'Sufficiency (Nationally across all sites)'}
      metric={'80'}
      // sign={'%'}
      isPercentage={true}
      backgroundImage={backgroundImage}
      isLoading={isLoading}
      // icon={"UGMap"}
    />
  );
};

export default SufficiencyNationalCard;
