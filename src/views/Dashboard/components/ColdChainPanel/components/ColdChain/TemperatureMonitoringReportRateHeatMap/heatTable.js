import React, { forwardRef, useContext } from "react";

// Bring in our cold chain context
import { ColdChainContext } from "../../../../../../../context/ColdChain/ColdChainState";

import MaterialTable, { MTableToolbar } from "material-table";

import Chip from "@material-ui/core/Chip";

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

export const HeatTable = () => {
  const classes = useStyles();

  const { temperatureMonitoring } = useContext(ColdChainContext);

  const {
    temperatureMonitoringReportingRatesData,
    isLoading,
    year,
  } = temperatureMonitoring;

  const reportingRateData =
    temperatureMonitoringReportingRatesData?.heat_graph_data;

  const title = `Proportion of districts submitting temperature data for ${year}`;

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
                ? { backgroundColor: "#24c53f", color: "#24c53f" }
                : { backgroundColor: "#f83245", color: "#f83245" }
            )
        : { backgroundColor: "#f83245", color: "#f83245" };
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
      style={{ height: "100%" }}
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
        { pageSize: 10 })
      }
      components={{
        Toolbar: (props) => (
          <div>
            <MTableToolbar {...props} />
            <div style={{ padding: "0px 10px" }}>
              <Chip
                label="Submitted"
                style={{
                  marginRight: 10,
                  backgroundColor: "#24c53f",
                  color: "white",
                }}
              />
              <Chip
                label="Not Submitted"
                style={{
                  marginRight: 5,
                  backgroundColor: "#f83245",
                  color: "white",
                }}
              />
            </div>
          </div>
        ),
      }}
    />
  );
};
