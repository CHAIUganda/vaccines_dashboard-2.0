import React, { useContext } from "react";

// Bring in our performance management context
import { PerformanceManagementContext } from "../../../../../../../context/PerformanceManagement/PerformanceManagementState";

import { makeStyles } from "@material-ui/core/styles";

import { Chart } from "../../../../../../../components";

const useStyles = makeStyles({
  headerFont: {
    color: "#727880",
    fontWeight: 400,
    fontSize: "smaller",
  },

  rowContent: {
    color: "#28354A",
    fontSize: "small",
    padding: 15,
    fontWeight: 500,
    textAlign: "center",
  },

  rowCategory: {
    color: "#28354A",
    fontSize: "small",
    padding: 15,
    fontWeight: 500,
    textAlign: "inherit",
  },
});

const NumberOfPlannedActivitiesTable = () => {
  const classes = useStyles();

  const { activityCompletionStatus } = useContext(PerformanceManagementContext);

  const { isLoading } = activityCompletionStatus;

  return (
    <Chart
      title={"Activity Completion Status Data Table"}
      isLoading={isLoading}
    />
  );
};

export default NumberOfPlannedActivitiesTable;
