import React, { useContext } from "react";

// Bring in our performance management context
import { PerformanceManagementContext } from "../../../../../../../context/PerformanceManagement/PerformanceManagementState";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

// Shared components
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

  completed: {
    height: 7,
    width: 7,
    backgroundColor: "#4E596A",
    borderRadius: "50%",
    display: "inline-block",
    marginRight: 10,
  },

  notDone: {
    height: 7,
    width: 7,
    backgroundColor: "#F8E658",
    borderRadius: "50%",
    display: "inline-block",
    marginRight: 10,
  },

  ongoing: {
    height: 7,
    width: 7,
    backgroundColor: "#FC6F6F",
    borderRadius: "50%",
    display: "inline-block",
    marginRight: 10,
  },
});

const ActivityStatusTable = () => {
  const classes = useStyles();

  const { activityCompletionStatus } = useContext(PerformanceManagementContext);

  const { isLoading, completionStatus } = activityCompletionStatus;

  return (
    <Chart
      elevate={0}
      chart={
        <TableContainer component={Paper} elevation={0}>
          <Table className={classes.table} aria-label="activity-status">
            <TableHead style={{ color: "#727880" }}>
              <TableRow>
                <TableCell className={classes.headerFont}>Category</TableCell>
                <TableCell className={classes.headerFont} align="right">
                  Activities
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={1}>
                <TableCell align="right" className={classes.rowCategory}>
                  <span className={classes.completed}></span>
                  {"Completed"}
                </TableCell>
                <TableCell align="right" className={classes.rowContent}>
                  {completionStatus?.completed}
                </TableCell>
              </TableRow>
              <TableRow key={2}>
                <TableCell align="right" className={classes.rowCategory}>
                  <span className={classes.notDone}></span>
                  {"Not Done"}
                </TableCell>
                <TableCell align="right" className={classes.rowContent}>
                  {completionStatus?.not_done}
                </TableCell>
              </TableRow>
              <TableRow key={3}>
                <TableCell align="right" className={classes.rowCategory}>
                  <span className={classes.ongoing}></span>

                  {"Ongoing"}
                </TableCell>
                <TableCell align="right" className={classes.rowContent}>
                  {completionStatus?.ongoing}
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
