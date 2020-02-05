import React, { useState, useMemo } from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";

// Table Data Utility functions
import { getStockChartData } from "../../../../../../../common/utils/stockmanagement/utils";

// Shared componenrs
import { Chart } from "../../../../../../../components";

// Table headers
const columns = [
  { id: "district", label: "District", minWidth: 170 },
  { id: "balances", label: "Balances", minWidth: 100 },
  {
    id: "min",
    label: "Min",
    minWidth: 170
  },
  {
    id: "max",
    label: "Max",
    minWidth: 170
  }
];

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5)
  }
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  container: {
    maxHeight: 440
  }
});

export const DataTable = props => {
  const {
    data,
    isLoading,
    endMonth,
    startMonth,
    district,
    vaccine,
    tab
  } = props;

  const classes = useStyles();

  const [tableData, setTableData] = useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useMemo(() => {
    if (data && data) {
      setTableData(
        getStockChartData(
          data,
          endMonth,
          startMonth,
          district,
          vaccine,
          "table"
        )
      );
    }
  }, [data, isLoading, endMonth, startMonth, district, vaccine]);

  const tableDataStockedOut =
    tableData && tableData.map(i => i.tabledata_so)[0];

  const tableDataBelowMIN = tableData && tableData.map(i => i.tabledata_bm)[0];

  const tableDataWithinRANGE =
    tableData && tableData.map(i => i.tabledata_wr)[0];

  const tableDataAboveMAX = tableData && tableData.map(i => i.tabledata_am)[0];

  //   const emptyRows =
  //     rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="stocked-out-table" size="small">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tab === "Stocked Out" ? (
              <>
                {tableDataStockedOut &&
                  tableDataStockedOut.map(row => (
                    <TableRow hover key={row.district_name}>
                      <TableCell>{row.district_name}</TableCell>
                      <TableCell>{row.at_hand}</TableCell>
                      <TableCell>{row.stock_requirement__minimum}</TableCell>
                      <TableCell>{row.stock_requirement__maximum}</TableCell>
                    </TableRow>
                  ))}
              </>
            ) : tab === "Below MIN" ? (
              <>
                {tableDataBelowMIN &&
                  tableDataBelowMIN.map(row => (
                    <TableRow hover key={row.district_name}>
                      <TableCell>{row.district_name}</TableCell>
                      <TableCell>{row.at_hand}</TableCell>
                      <TableCell>{row.stock_requirement__minimum}</TableCell>
                      <TableCell>{row.stock_requirement__maximum}</TableCell>
                    </TableRow>
                  ))}
              </>
            ) : tab === "Within RANGE" ? (
              <>
                {" "}
                {tableDataWithinRANGE &&
                  tableDataWithinRANGE.map(row => (
                    <TableRow hover key={row.district_name}>
                      <TableCell>{row.district_name}</TableCell>
                      <TableCell>{row.at_hand}</TableCell>
                      <TableCell>{row.stock_requirement__minimum}</TableCell>
                      <TableCell>{row.stock_requirement__maximum}</TableCell>
                    </TableRow>
                  ))}{" "}
              </>
            ) : (
              <>
                {tableDataAboveMAX &&
                  tableDataAboveMAX.map(row => (
                    <TableRow hover key={row.district_name}>
                      <TableCell>{row.district_name}</TableCell>
                      <TableCell>{row.at_hand}</TableCell>
                      <TableCell>{row.stock_requirement__minimum}</TableCell>
                      <TableCell>{row.stock_requirement__maximum}</TableCell>
                    </TableRow>
                  ))}
              </>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                // rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                // rowsPerPageOptions={[10, 50]}
                colSpan={3}
                // count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
};
