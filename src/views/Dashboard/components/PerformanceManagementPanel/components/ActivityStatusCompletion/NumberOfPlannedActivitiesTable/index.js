import React, { useState } from "react";

// Shared componenrs
// import { DataTable } from "./dataTable.js";
// Shared componenrs
import { Chart } from "../../../../../../../components";

const NumberOfPlannedActivitiesTable = ({ data, isLoading }) => {
  //   return <DataTable data={data} isLoading={isLoading} />;
  const [chart, setChart] = useState();

  return (
    <Chart
      title={"Activity by Responsible Organisation"}
      //   chart={
      //     <HighchartsReact highcharts={Highcharts} options={chart && chart} />
      //   }
      isLoading={isLoading && isLoading}
      chartData={chart && chart}
    />
  );
};

export default NumberOfPlannedActivitiesTable;
