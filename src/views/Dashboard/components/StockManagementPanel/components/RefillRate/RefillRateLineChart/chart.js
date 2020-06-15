import { useContext } from "react";

// Bring in our stock management context
import { StockManagementContext } from "../../../../../../../context/StockManagement/StockManagementState";

// Chart Options
import {
  commonChartOptions,
  commonChartPlotOptions,
} from "../../../../../../../common/chartOptions/chartOptions";

// Utility functions
import { getStockChartData } from "../../../../../../../common/utils/stockmanagement/utils";

export const RefillRateLineChartTemplate = () => {
  const { refillRate } = useContext(StockManagementContext);

  const {
    stockByDistrictVaccineData,
    endMonth,
    vaccine,
    district,
  } = refillRate;
  const chartData = getStockChartData(
    stockByDistrictVaccineData,
    endMonth,
    "line"
  );

  return {
    credits: {
      ...commonChartOptions.credits,
    },
    exporting: {
      ...commonChartOptions.exporting,
      chartOptions: {
        ...commonChartOptions.exporting.chartOptions,
        title: {
          text: `Distribution of ${vaccine} for ${district}`,
        },
      },
    },
    title: {
      text: "",
    },
    xAxis: {
      type: "datetime",
      labels: {
        ...commonChartOptions.labels,
      },
    },

    tooltip: {
      ...commonChartOptions.lineTooltip,
    },

    yAxis: {
      labels: {
        ...commonChartOptions.labels,
      },
      min: 0,
    },
    plotOptions: {
      line: {
        ...commonChartPlotOptions.plotOptions.line,
      },
    },
    series: [...chartData],
  };
};
