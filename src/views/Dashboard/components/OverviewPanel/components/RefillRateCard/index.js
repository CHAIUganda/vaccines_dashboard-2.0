import React, { useContext } from "react";

// Bring in our overview  context
import { OverviewContext } from "../../../../../../context/Overview/OverviewState";

import { StockManagementIcon } from "../../../../../../icons/icons";

// Utils
import { getUnepiNationalStock } from "../../../../../../common/utils/utils";

import StockCard from "../StockCard/index";

const RefillRateCard = () => {
  const { stockManagementData } = useContext(OverviewContext);

  const { isLoading, atHandStockLevelsData } = stockManagementData;

  const { allStockData } = getUnepiNationalStock(atHandStockLevelsData);

  const refillRate = allStockData?.map((x) => x?.refillRate);

  const refillRatePercentage = Math.round(
    refillRate.reduce((a, b) => a + b, 0) / refillRate.length
  );

  return (
    <StockCard
      module="stock"
      title={"Refill Rate"}
      metric={isNaN(refillRatePercentage) ? 0 : refillRatePercentage}
      isPercentage
      denominator={100}
      tagLine={
        "The quantity of stock that NMS has fulfilled compared to the quantity of stock ordered for that month"
      }
      icon={
        <StockManagementIcon
          style={{ fontSize: "xx-large", color: "#FC6F6F", margin: 10 }}
        />
      }
      isLoading={isLoading}
    />
  );
};

export default RefillRateCard;
