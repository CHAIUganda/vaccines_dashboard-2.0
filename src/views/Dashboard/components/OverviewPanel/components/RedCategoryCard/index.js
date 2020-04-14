import React, { useContext } from "react";

// Bring in our overview  context
import { OverviewContext } from "../../../../../../context/Overview/OverviewState";

// Utils
import { getUnepiCoverage } from "../../../../../../common/utils/utils";

import StockCard from "../StockCard/index";

const greenBackgroundImage =
  "linear-gradient(0deg, rgb(36, 197, 63) 0px, rgb(36, 197, 63) 1%, rgb(93, 246, 115))";

const yellowBackgroundImage =
  "linear-gradient(83deg, rgba(224,202,60,1) 0%, rgba(250,226,73,1) 72%)";

const orangeBackgroundImage =
  "linear-gradient(83deg, rgba(255,165,0,1) 0%, rgba(247,179,55,1) 72%)";

const redBackgroundImage =
  "linear-gradient(0deg, #f83245 0px, #f83245 1%, #ff6372)";

const RedCategoryCard = () => {
  const { coverageData } = useContext(OverviewContext);

  const { isLoading, data, period } = coverageData;

  const { category } = getUnepiCoverage(data, period);

  const backgroundImage =
    category === 1
      ? greenBackgroundImage
      : category === 2
      ? yellowBackgroundImage
      : category === 3
      ? orangeBackgroundImage
      : category === 4
      ? redBackgroundImage
      : "";

  const metric =
    category === 1
      ? "CAT1"
      : category === 2
      ? "CAT2"
      : category === 3
      ? "CAT3"
      : category === 4
      ? "CAT4"
      : "";

  return (
    <StockCard
      title={"RED CATEGORY"}
      metric={metric}
      isLoading={isLoading}
      backgroundImage={backgroundImage}
    />
  );
};

export default RedCategoryCard;
