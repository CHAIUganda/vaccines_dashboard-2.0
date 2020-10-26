import React, { useContext } from 'react';

// Bring in our overview  context
import { OverviewContext } from '../../../../../../context/Overview/OverviewState';

import ColdChainCard from '../ColdChainCard/index';

const backgroundImage = `linear-gradient(0deg, rgba(80,131,218,1) 0%, rgba(142,170,219,1) 100%)`;

const OptimalityNationalCard = () => {
  const { coldChainCapacityData } = useContext(OverviewContext);

  const { isLoading } = coldChainCapacityData;
  const totalAvailableLiters = new Intl.NumberFormat('lg-UG').format(
    coldChainCapacityData?.capacityMetricsChartData?.overall_total_available,
  );

  return (
    <ColdChainCard
      title={'Optimality (Nationally across all sites)'}
      metric={'60'}
      // sign={"%"}
      isPercentage={true}
      backgroundImage={backgroundImage}
      isLoading={isLoading}
      // icon={"UGMap"}
    />
  );
};

export default OptimalityNationalCard;
