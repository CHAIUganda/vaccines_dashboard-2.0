import React, { useState, useMemo, useContext } from "react";

// Bring in our coverage context
import { CoverageContext } from "../../../../../../../context/Coverage/CoverageState";

// Highcharts for time series test
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Shared components
import { Chart } from "../../../../../../../components";

// Chart Template
import { RedCategorisationCoverageChart } from "./chart";

// Utils

import { generateChartTitle } from "../../../../../../../common/utils/utils";

const RedCategorisationForAntigensChart = ({ tabTitle, reportYear }) => {
  const { redCategorisation } = useContext(CoverageContext);

  const { startYear, vaccine, dose, isLoading } = redCategorisation;

  const [chat, setChart] = useState();

  const [chartTitle, setChartTitle] = useState();

  useMemo(() => {
    setChart(RedCategorisationCoverageChart(tabTitle));

    setChartTitle(
      generateChartTitle(
        tabTitle,
        vaccine,
        dose,
        "Red Categorization",
        reportYear,
        startYear
      )
    );
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startYear, vaccine]);

  return (
    <Chart
      title={chartTitle}
      chart={<HighchartsReact highcharts={Highcharts} options={chat && chat} />}
      isLoading={isLoading}
    />
  );
};

export default RedCategorisationForAntigensChart;
