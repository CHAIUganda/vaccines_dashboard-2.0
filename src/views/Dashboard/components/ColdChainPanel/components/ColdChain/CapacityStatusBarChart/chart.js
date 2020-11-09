import { useContext } from 'react';

// Bring in our cold chain context
import { ColdChainContext } from '../../../../../../../context/ColdChain/ColdChainState';

// Chart Options
import {
  commonChartOptions,
  commonChartPlotOptions,
} from '../../../../../../../common/chartOptions/chartOptions';

import {
  getCapacityChartData,
  getCapacityChartData2,
  getQuarters,
} from '../../../../../../../common/utils/coldchain/utils';

export const CapacityStatusBarChartTemplate = () => {
  const { capacity } = useContext(ColdChainContext);

  const { capacityMetricsChartData, district } = capacity;

  const data = capacityMetricsChartData?.required_available_comparison_metrics;

  const data2 = capacityMetricsChartData?.gap_metrics;

  const quarters = getQuarters(data);
  const chartData = getCapacityChartData(data);

  const chartData2 = getCapacityChartData2(data2);

  const chart = {
    chart: {
      type: 'column',
      height: '75%',
      plotBackgroundColor: null,
      plotBorderWidth: null,
      backgroundColor: null,
      plotShadow: false,
    },
    credits: { ...commonChartOptions.credits },
    exporting: {
      ...commonChartOptions.exporting,
      chartOptions: {
        ...commonChartOptions.exporting.chartOptions,
        title: {
          text: `Storage capacity in litres at ${
            district === 'national' ? 'at National Level' : 'in ' + district
          }`,
        },
      },
      title: '',
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: quarters,
    },
    yAxis: {
      min: 0,
      max: 100,
      title: {
        text: 'Sufficiency (%)',
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: 'bold',
          color: 'gray',
        },
      },
    },
    plotOptions: {
      column: {
        ...commonChartPlotOptions.plotOptions.column,
        stacking: 'normal',
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: [...chartData2],
  };

  return chart;
};
