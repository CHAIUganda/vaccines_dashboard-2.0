import React from "react";

// Material components
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// Import common styles
// import { useStyles } from "../../../styles";

import ActivitiesTable from "./ActivitiesTable/index";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    display: "flex",
    border: "solid 1px blue",
    height: "fit-content",
    maxHeight: 640,
    marginTop: 50,
  },
}));

export default function Activities() {
  const classes = useStyles();

  return (
    <div className={classes.tableContainer}>
      <ActivitiesTable />
    </div>
  );
}
