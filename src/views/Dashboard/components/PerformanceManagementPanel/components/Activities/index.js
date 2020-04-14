import React from "react";

// Material components
import { makeStyles } from "@material-ui/core/styles";

import ActivitiesTable from "./ActivitiesTable/index";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    // display: "flex",
    border: "solid 1px #4E596A",
    // height: "fit-content",
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
