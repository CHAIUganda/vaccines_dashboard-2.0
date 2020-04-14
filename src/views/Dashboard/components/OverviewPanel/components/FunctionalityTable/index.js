import React, { useContext } from "react";

// Bring in our overview  context
import { OverviewContext } from "../../../../../../context/Overview/OverviewState";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

// Shared components
import { Chart } from "../../../../../../components";

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
    textAlign: "end",
  },

  rowCategory: {
    color: "#28354A",
    fontSize: "small",
    padding: 15,
    fontWeight: 500,
    textAlign: "inherit",
  },

  working: {
    height: 7,
    width: 7,
    backgroundColor: "#24c53f",
    borderRadius: "50%",
    display: "inline-block",
    marginRight: 10,
  },

  notWorking: {
    height: 7,
    width: 7,
    backgroundColor: "#FE5C6B",
    borderRadius: "50%",
    display: "inline-block",
    marginRight: 10,
  },

  needRepair: {
    height: 7,
    width: 7,
    backgroundColor: "#1e3c72",
    borderRadius: "50%",
    display: "inline-block",
    marginRight: 10,
  },
});

const ActivityStatusTable = () => {
  const classes = useStyles();

  const { coldChainFunctionalityData } = useContext(OverviewContext);

  const { isLoading, functionalityDataTableData } = coldChainFunctionalityData;

  const total_working = functionalityDataTableData
    ?.map((a) => a.working)
    .reduce((a, b) => a + b, 0);
  const total_notWorking = functionalityDataTableData
    ?.map((a) => a.not_working)
    .reduce((a, b) => a + b, 0);
  const total_needsRepair = functionalityDataTableData
    ?.map((a) => a.needs_repair)
    .reduce((a, b) => a + b, 0);

  const total_fridges = total_working + total_needsRepair + total_notWorking;

  const percentage_working = Math.round((total_working / total_fridges) * 100);
  const percentage_not_working = Math.round(
    (total_notWorking / total_fridges) * 100
  );
  const percentage_needs_repair = Math.round(
    (total_needsRepair / total_fridges) * 100
  );

  return (
    <Chart
      elevate={0}
      chart={
        <TableContainer component={Paper} elevation={0}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead style={{ color: "#727880" }}>
              <TableRow>
                <TableCell className={classes.headerFont}>Category</TableCell>
                <TableCell
                  align="right"
                  style={{
                    textAlign: "end",
                    color: "#727880",
                    fontSize: "smaller",
                    fontWeight: 400,
                  }}
                >
                  Total
                </TableCell>
                <TableCell
                  align="right"
                  style={{
                    textAlign: "end",
                    color: "#727880",
                    fontSize: "smaller",
                    fontWeight: 400,
                  }}
                >
                  Percentage
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={1}>
                <TableCell align="right" className={classes.rowCategory}>
                  <span className={classes.working}></span>
                  {"Working"}
                </TableCell>
                <TableCell align="right" className={classes.rowContent}>
                  {total_working}
                </TableCell>
                <TableCell align="right" className={classes.rowContent}>
                  {percentage_working + `%`}
                </TableCell>
              </TableRow>
              <TableRow key={2}>
                <TableCell align="right" className={classes.rowCategory}>
                  <span className={classes.notWorking}></span>
                  {"Not Working"}
                </TableCell>
                <TableCell align="right" className={classes.rowContent}>
                  {total_notWorking}
                </TableCell>
                <TableCell align="right" className={classes.rowContent}>
                  {percentage_not_working + `%`}
                </TableCell>
              </TableRow>
              <TableRow key={3}>
                <TableCell align="right" className={classes.rowCategory}>
                  <span className={classes.needRepair}></span>
                  {"Needs Repair"}
                </TableCell>
                <TableCell align="right" className={classes.rowContent}>
                  {total_needsRepair}
                </TableCell>
                <TableCell align="right" className={classes.rowContent}>
                  {percentage_needs_repair + `%`}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      }
      isLoading={isLoading}
    />
  );
};

export default ActivityStatusTable;
