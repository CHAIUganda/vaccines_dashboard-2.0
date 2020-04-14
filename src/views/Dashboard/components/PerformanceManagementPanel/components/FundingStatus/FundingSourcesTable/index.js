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

// Shared componenrs
import { Chart } from "../../../../../../../components";

const useStyles = makeStyles({
  headerFont: {
    color: "#727880",
    fontWeight: 400,
  },

  rowContent: {
    color: "#28354A",
    fontSize: "small",
    padding: 10,
  },
});

const FundingSourcesTable = () => {
  const classes = useStyles();
  const { fundingStatus } = useContext(PerformanceManagementContext);

  const { isLoading, fundingSourcesData } = fundingStatus;

  return (
    <Chart
      title={"Budget Allocation per Funding Partner / Organization"}
      chart={
        <TableContainer component={Paper} elevation={0}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead style={{ color: "#727880" }}>
              <TableRow>
                <TableCell className={classes.headerFont}>
                  Funding Partner
                </TableCell>
                <TableCell className={classes.headerFont} align="right">
                  Funding Amount
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fundingSourcesData?.map((row) => (
                <TableRow key={row.name}>
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.rowContent}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell align="right" className={classes.rowContent}>
                    {"$" +
                      new Intl.NumberFormat("lg-UG").format(
                        row.activity_cost_usd
                      )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
      isLoading={isLoading}
    />
  );
};

export default FundingSourcesTable;
