import React, { useContext } from "react";

// Bring in our overview  context
import { OverviewContext } from "../../../../../../context/Overview/OverviewState";
import { StockManagementIcon } from "../../../../../../icons/icons";

import StockCard from "../StockCard/index";

const backgroundImage = "linear-gradient(0deg,#1e3c72 0,#1e3c72 1%,#2a5298)";

const MonthsOfStockCard = () => {
  const { coldChainCapacityData } = useContext(OverviewContext);

  const { isLoading } = coldChainCapacityData;

  return (
    <StockCard
      title={"Penta | Months of Stock"}
      metric={4}
      tagLine={
        "The duration (in months) for which the available stock will last"
      }
      icon={
        <StockManagementIcon
          style={{ fontSize: "xx-large", color: "#FC6F6F", margin: 10 }}
        />
      }
      //   backgroundImage={backgroundImage}
      isLoading={isLoading}
    />
  );
};

export default MonthsOfStockCard;
