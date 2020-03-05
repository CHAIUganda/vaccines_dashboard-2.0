import React, { forwardRef } from "react";

import Paper from "@material-ui/core/Paper";
import MaterialTable from "material-table";

// Import common styles
import { useStyles } from "../../../../styles";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export const DataTable = ({ data, district, startYearHalf, endYearHalf }) => {
  const classes = useStyles();

  const title = `Functionality Status of CCE's at National Level for period ${startYearHalf} - ${endYearHalf}`;

  const columns = [
    {
      field: "district",
      title: "District",
      cellStyle: rowData => ({ fontSize: 13 }),
      headerStyle: { fontSize: 15, fontWeight: 700 },
      render: rowData => rowData.district.replace(/ District/g, "")
    },
    {
      field: "total_cce",
      title: "Existing Equipment",
      cellStyle: rowData => ({ fontSize: 13 }),
      headerStyle: { fontSize: 15, fontWeight: 700 },
      render: rowData =>
        new Intl.NumberFormat("lg-UG").format(rowData.total_cce)
    },
    {
      field: "working",
      title: "Working Equipment",
      cellStyle: rowData => ({ fontSize: 13 }),
      headerStyle: { fontSize: 15, fontWeight: 700 },
      render: rowData => new Intl.NumberFormat("lg-UG").format(rowData.working)
    },
    {
      field: "not_working",
      title: "Not Working",
      cellStyle: rowData => ({ fontSize: 13 }),
      headerStyle: { fontSize: 15, fontWeight: 700 },
      render: rowData =>
        new Intl.NumberFormat("lg-UG").format(rowData.not_working)
    },
    {
      field: "needs_repair",
      title: "Needs Maintenance",
      cellStyle: rowData => ({ fontSize: 13 }),
      headerStyle: { fontSize: 15, fontWeight: 700 },
      render: rowData =>
        new Intl.NumberFormat("lg-UG").format(rowData.needs_repair)
    }
  ];
  return (
    <Paper className={classes.tableRoot}>
      <MaterialTable
        title={title}
        // Filter out statisticts key
        data={data && Object.values(data).filter(v => !v.statistics)}
        columns={columns}
        icons={tableIcons}
        options={
          ({
            sorting: true
          },
          { exportButton: true },
          { pageSize: 7 },
          { pageSizeOptions: [5, 7] })
        }
      />
    </Paper>
  );
};
