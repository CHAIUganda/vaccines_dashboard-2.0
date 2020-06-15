import React, { useContext } from "react";

// Bring in our overview  context
import { OverviewContext } from "../../../../../../context/Overview/OverviewState";
import { GlobalContext } from "../../../../../../context/GlobalState";

import { StockManagementIcon } from "../../../../../../icons/icons";

// Utils
import { getUnepiNationalStock } from "../../../../../../common/utils/utils";

import StockCard from "../StockCard/index";

const MonthsOfStockCard = () => {
  const { vaccines } = useContext(GlobalContext);
  const { stockManagementData } = useContext(OverviewContext);

  const { isLoading, atHandStockLevelsData } = stockManagementData;

  const { stockedOutAntigens } = getUnepiNationalStock(atHandStockLevelsData);

  return (
    <StockCard
      module="stock"
      parent="monthsStockCard"
      title={"Number of Antigens Stocked Out"}
      metric={stockedOutAntigens}
      denominator={vaccines.length * 10}
      tagLine={
        "The number of vaccines that are not in stock for the selected month"
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

export default MonthsOfStockCard;
