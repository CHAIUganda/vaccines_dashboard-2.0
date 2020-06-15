import React, { useContext } from "react";

// Bring in our overview  context
import { OverviewContext } from "../../../../../../context/Overview/OverviewState";

import { StockManagementIcon } from "../../../../../../icons/icons";

// Utils
import { getUnepiNationalStock } from "../../../../../../common/utils/utils";

import StockCard from "../StockCard/index";

const UptakeRateCard = () => {
  const { stockManagementData } = useContext(OverviewContext);

  const { isLoading, atHandStockLevelsData } = stockManagementData;

  const { allStockData } = getUnepiNationalStock(atHandStockLevelsData);

  const uptakeRate = allStockData?.map((x) => x?.uptakeRate);

  const uptakeRatePercentage = Math.round(
    uptakeRate.reduce((a, b) => a + b, 0) / uptakeRate.length
  );

  return (
    <StockCard
      module="stock"
      title={"Uptake Rate (utilized)"}
      metric={isNaN(uptakeRatePercentage) ? 0 : uptakeRatePercentage}
      isPercentage
      denominator={100}
      tagLine={
        "The number of children immunized (converted to equivalent doses) compared to the quantity of stock available ( stock balance plus quantity delivered by NMS)"
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

export default UptakeRateCard;
