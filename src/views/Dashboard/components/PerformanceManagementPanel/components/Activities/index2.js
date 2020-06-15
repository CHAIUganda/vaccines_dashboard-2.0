import React from "react";

// Material components
import { makeStyles } from "@material-ui/core/styles";

import ActivitiesTable from "./ActivitiesTable/index2";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
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
