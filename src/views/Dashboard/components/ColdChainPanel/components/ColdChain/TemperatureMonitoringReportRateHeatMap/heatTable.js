import React, { forwardRef, useState, useMemo } from "react";

import MaterialTable from "material-table";

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

import { useStyles } from "../../../../styles";

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
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

export const HeatTable = ({ data, year, isLoading }) => {
  const classes = useStyles();

  const title = `Proportion of districts submitting temperature data for ${year}`;

  const [reportingRateData, setReportingRateData] = useState([]);

  useMemo(() => {
    if (data && data.heat_graph_data) {
      setReportingRateData(data.heat_graph_data);
    }
  }, [data]);

  // Very ugly expensive hackish way of drawinng the required heat map.
  // Look into better ways eg Highcharts heat map? or optimize below
  const cellStyleFormat = (rowData, month) => {
    const style =
      rowData.data.length > 0
        ? rowData.data
            .map((v) => v)
            .filter((v) => v.month === month)
            .map((v) =>
              v.submitted === true
                ? { backgroundColor: "limegreen", color: "limegreen" }
                : { backgroundColor: "orangered", color: "orangered" }
            )
        : { backgroundColor: "orangered", color: "orangered" };
    if (Array.isArray(style)) {
      return style[0];
    } else {
      return style;
    }
  };

  const columns = [
    {
      field: "district",
      title: "District",
      cellStyle: (rowData) => ({ fontSize: 13 }),
      headerStyle: { fontSize: 15, fontWeight: 700 },
      render: (rowData) => rowData.district.replace(/ District/g, ""),
    },
    {
      field: "heat_alarm_value",
      title: "J",
      cellStyle: (param1, rowData = []) => {
        return cellStyleFormat(rowData, 1);
      },
      headerStyle: { fontSize: 15, fontWeight: 700 },
    },
    {
      field: "heat_alarm_value",
      title: "F",
      cellStyle: (param1, rowData = []) => {
        return cellStyleFormat(rowData, 2);
      },
      headerStyle: { fontSize: 15, fontWeight: 700 },
      render: (rowData) =>
        rowData.data
          .map((v) => v)
          .filter((v) => v.month === 2)
          .map((v) => (v.submitted === true ? 1 : 0)),
    },
    {
      field: "heat_alarm_value",
      title: "M",
      cellStyle: (param1, rowData = []) => {
        return cellStyleFormat(rowData, 3);
      },
      headerStyle: { fontSize: 15, fontWeight: 700 },
    },
    {
      field: "heat_alarm_value",
      title: "A",
      cellStyle: (param1, rowData = []) => {
        return cellStyleFormat(rowData, 4);
      },
      headerStyle: { fontSize: 15, fontWeight: 700 },
    },
    {
      field: "heat_alarm_value",
      title: "M",
      cellStyle: (param1, rowData = []) => {
        return cellStyleFormat(rowData, 5);
      },
      headerStyle: { fontSize: 15, fontWeight: 700 },
    },
    {
      field: "heat_alarm_value",
      title: "J",
      cellStyle: (param1, rowData = []) => {
        return cellStyleFormat(rowData, 6);
      },
      headerStyle: { fontSize: 15, fontWeight: 700 },
    },
    {
      field: "heat_alarm_value",
      title: "J",
      cellStyle: (param1, rowData = []) => {
        return cellStyleFormat(rowData, 7);
      },
      headerStyle: { fontSize: 15, fontWeight: 700 },
    },
    {
      field: "heat_alarm_value",
      title: "A",
      cellStyle: (param1, rowData = []) => {
        return cellStyleFormat(rowData, 8);
      },
      headerStyle: { fontSize: 15, fontWeight: 700 },
    },
    {
      field: "heat_alarm_value",
      title: "S",
      cellStyle: (param1, rowData = []) => {
        return cellStyleFormat(rowData, 9);
      },
      headerStyle: { fontSize: 15, fontWeight: 700 },
    },

    {
      field: "heat_alarm_value",
      title: "O",
      cellStyle: (param1, rowData = []) => {
        return cellStyleFormat(rowData, 10);
      },
      headerStyle: { fontSize: 15, fontWeight: 700 },
    },

    {
      field: "heat_alarm_value",
      title: "N",
      cellStyle: (param1, rowData = []) => {
        return cellStyleFormat(rowData, 11);
      },
      headerStyle: { fontSize: 15, fontWeight: 700 },
    },

    {
      field: "heat_alarm_value",
      title: "D",
      cellStyle: (param1, rowData = []) => {
        return cellStyleFormat(rowData, 3);
      },
      headerStyle: { fontSize: 15, fontWeight: 700 },
    },
  ];
  return (
    <MaterialTable
      title={<h3 className={classes.tableTitle}>{title}</h3>}
      isLoading={isLoading}
      data={reportingRateData}
      columns={columns}
      icons={tableIcons}
      options={
        ({
          sorting: true,
        },
        { exportButton: true },
        { pageSize: 7 })
      }
    />
  );
};
