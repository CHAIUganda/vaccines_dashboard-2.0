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
    fontWeight: 700,
  },

  rowContent: {
    color: "#28354A",
    fontSize: "small",
    padding: 10,
  },
});

const ISCActivitiesTable = () => {
  const classes = useStyles();
  const { fundingStatus } = useContext(PerformanceManagementContext);

  const { isLoading, ISTableData } = fundingStatus;

  return (
    <Chart
      title={"Immunization System Component (ISC)"}
      chart={
        <TableContainer component={Paper} elevation={0}>
          <Table
            stickyHeader
            className={classes.table}
            aria-label="simple table"
          >
            <TableHead style={{ color: "#727880" }}>
              <TableRow>
                <TableCell
                  className={classes.headerFont}
                  style={{ width: 300 }}
                >
                  Component
                </TableCell>
                <TableCell
                  className={classes.headerFont}
                  align="right"
                  style={{ width: 150 }}
                >
                  Allocated Fund (USD)
                </TableCell>
                <TableCell className={classes.headerFont} align="right">
                  Total Funded Activities
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ISTableData?.data?.map((row) => (
                <TableRow key={row.component}>
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.rowContent}
                  >
                    {row.component}
                  </TableCell>
                  <TableCell align="right" className={classes.rowContent}>
                    {"$" +
                      new Intl.NumberFormat("lg-UG").format(
                        row.activity_cost_usd
                      )}
                  </TableCell>
                  <TableCell align="right" className={classes.rowContent}>
                    {row.total}
                  </TableCell>
                </TableRow>
              ))}
              <TableCell
                align="right"
                className={classes.rowContent}
                style={{ fontWeight: 700 }}
              >
                Totals
              </TableCell>
              <TableCell
                align="right"
                className={classes.rowContent}
                style={{ fontWeight: 700 }}
              >
                {"$" +
                  new Intl.NumberFormat("lg-UG").format(
                    ISTableData?.data
                      ?.map((row) => row.activity_cost_usd)
                      .reduce((a, b) => a + b, 0)
                  )}
              </TableCell>
              <TableCell
                align="right"
                className={classes.rowContent}
                style={{ fontWeight: 700 }}
              >
                {new Intl.NumberFormat("lg-UG").format(
                  ISTableData?.data
                    ?.map((row) => row.total)
                    .reduce((a, b) => a + b, 0)
                )}
              </TableCell>
            </TableBody>
          </Table>
        </TableContainer>
      }
      isLoading={isLoading}
    />
  );
};

export default ISCActivitiesTable;
