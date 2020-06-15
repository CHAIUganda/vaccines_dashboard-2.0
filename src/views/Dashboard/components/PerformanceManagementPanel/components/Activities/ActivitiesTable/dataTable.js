import React, { useState, forwardRef, useContext } from "react";

// Bring in our performance management context
import { PerformanceManagementContext } from "../../../../../../../context/PerformanceManagement/PerformanceManagementState";
import { GlobalContext } from "../../../../../../../context/GlobalState";

import MaterialTable, { MTableBody } from "material-table";

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
import { useEffect } from "react";

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

export const DataTable = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);

  const { isAuthenticated } = useContext(GlobalContext);
  const {
    activities,
    currentYearStartQuarter,
    lastWorkPlanQuarter,
    updateActivitiesData,
  } = useContext(PerformanceManagementContext);

  const { allActivities, isLoading } = activities;

  const title = `Activities workplan for ${currentYearStartQuarter} - ${lastWorkPlanQuarter}`;

  const statuses = {
    Completed: "Completed",
    Ongoing: "Ongoing",
    "Not Done": "Not Done",
  };

  const styles = {
    headerLong: {
      color: "#727880",
      fontWeight: 400,
      minWidth: 280,
    },
    headerShort: {
      color: "#727880",
      fontWeight: 400,
      maxWidth: 280,
    },
    rowContent: {
      color: "#28354A",
      fontSize: "small",
    },
  };

  const getRowData = (rowData, index, key) => {
    if (key === "status") {
      return rowData.activity_status[index] === undefined
        ? "No data"
        : rowData.activity_status[index].status;
    } else {
      return rowData.activity_status[index] === undefined
        ? "No data"
        : rowData.activity_status[index].comment;
    }
  };

  const [columns, setColumns] = useState([
    {
      field: "name",
      title: "Name",
      cellStyle: (rowData) => styles.rowContent,
      headerStyle: styles.headerLong,
      render: (rowData) => rowData.name,
      editable: "never",
    },
    {
      field: "immunization_component",
      title: "ISC",
      cellStyle: (rowData) => styles.rowContent,
      headerStyle: styles.headerLong,
      render: (rowData) => rowData.immunization_component.name,
      editable: "never",
    },
    {
      field: "activity_status[0].status",
      title: "Q1 Status",
      cellStyle: (rowData) => styles.rowContent,
      headerStyle: styles.headerShort,
      render: (rowData) => getRowData(rowData, 0, "status"),
      lookup: statuses,
      editable: "onUpdate",
    },

    {
      field: "activity_status[0].comment",
      title: "Q1 Comment",
      cellStyle: (rowData) => styles.rowContent,
      headerStyle: styles.headerLong,
      render: (rowData) => getRowData(rowData, 0),
      editable: "onUpdate",
    },

    {
      field: "activity_status[1].status",
      title: "Q2 Status",
      cellStyle: (rowData) => styles.rowContent,
      headerStyle: styles.headerShort,
      render: (rowData) => getRowData(rowData, 1, "status"),
      lookup: statuses,
      editable: "onUpdate",
    },
    {
      field: "activity_status[1].comment",
      title: "Q2 Comment",
      cellStyle: (rowData) => styles.rowContent,
      headerStyle: styles.headerLong,
      render: (rowData) => getRowData(rowData, 1),
      editable: "onUpdate",
    },
    {
      field: "activity_status[2].status",
      title: "Q3 Status",
      cellStyle: (rowData) => styles.rowContent,
      headerStyle: styles.headerShort,
      render: (rowData) => getRowData(rowData, 2, "status"),
      lookup: statuses,
      editable: "onUpdate",
    },
    {
      field: "activity_status[2].comment",
      title: "Q3 Comment",
      cellStyle: (rowData) => styles.rowContent,
      headerStyle: styles.headerLong,
      render: (rowData) => getRowData(rowData, 2),
      lookup: statuses,
      editable: "onUpdate",
    },
    {
      field: "activity_status[3].status",
      title: "Q4 Status",
      cellStyle: (rowData) => styles.rowContent,
      headerStyle: styles.headerShort,
      render: (rowData) => getRowData(rowData, 3, "status"),
      lookup: statuses,
      editable: "onUpdate",
    },
    {
      field: "activity_status[3].comment",
      title: "Q4 Comment",
      cellStyle: (rowData) => styles.rowContent,
      headerStyle: styles.headerLong,
      render: (rowData) => getRowData(rowData, 3),
      editable: "onUpdate",
      width: 150,
    },
    {
      field: "activity_status[4].status",
      title: "Q5 Status",
      cellStyle: (rowData) => styles.rowContent,
      headerStyle: styles.headerShort,
      render: (rowData) => getRowData(rowData, 4, "status"),
      lookup: statuses,
      editable: "onUpdate",
    },
    {
      field: "activity_status[4].comment",
      title: "Q5 Comment",
      cellStyle: (rowData) => styles.rowContent,
      headerStyle: styles.headerLong,
      render: (rowData) => getRowData(rowData, 4),
      editable: "onUpdate",
    },

    {
      field: "activity_status[5].status",
      title: "Q6 Status",
      cellStyle: (rowData) => styles.rowContent,
      headerStyle: styles.headerShort,
      render: (rowData) => getRowData(rowData, 5, "status"),
      lookup: statuses,
      editable: "onUpdate",
    },
    {
      field: "activity_status[5].comment",
      title: "Q6 Comment",
      cellStyle: (rowData) => styles.rowContent,
      headerStyle: styles.headerLong,
      render: (rowData) => getRowData(rowData, 5),

      editable: "onUpdate",
    },

    {
      field: "activity_cost_usd",
      title: "Cost (USD)",
      cellStyle: (rowData) => styles.rowContent,
      headerStyle: styles.headerShort,
      render: (rowData) =>
        new Intl.NumberFormat("lg-UG").format(rowData.activity_cost_usd),
      editable: "never",
    },
    {
      field: "funding_status",
      title: "Funding Status",
      cellStyle: (rowData) => styles.rowContent,
      headerStyle: styles.headerShort,
      render: (rowData) => rowData.funding_status,
      editable: "never",
    },
    {
      field: "level",
      title: "Level",
      cellStyle: (rowData) => styles.rowContent,
      headerStyle: styles.headerShort,
      render: (rowData) => rowData.level,
      editable: "never",
    },
    {
      field: "funding_priority_level",
      title: "Funding Priority",
      cellStyle: (rowData) => styles.rowContent,
      headerStyle: styles.headerShort,
      render: (rowData) => rowData.funding_priority_level,
      editable: "never",
    },
    {
      field: "responsible_focal_point",
      title: "Focal Point",
      cellStyle: (rowData) => styles.rowContent,
      headerStyle: styles.headerShort,
      render: (rowData) => rowData.responsible_focal_point,
      editable: "never",
    },
  ]);

  useEffect(() => {
    setData(allActivities);
  }, [allActivities]);

  return (
    <MaterialTable
      title={<h3 className={classes.tableTitle}>{title}</h3>}
      data={data}
      isLoading={isLoading}
      columns={columns}
      icons={tableIcons}
      options={{
        // fixedColumns: {
        //   left: 2,
        //   right: 5,
        // },
        exportButton: true,
        sorting: true,
        // tableLayout: "fixed",
      }}
      editable={
        isAuthenticated
          ? {
              onRowUpdate: (newData, oldData) =>
                updateActivitiesData(newData, oldData),
              // new Promise((resolve, reject) => {
              //   setTimeout(() => {

              //     const dataUpdate = [...data];
              //     const index = oldData.tableData.id;
              //     console.log(newData);
              //     // console.log(index);
              //     dataUpdate[index] = newData;

              //     // console.log(dataUpdate[index]);
              //     setData([...dataUpdate]);

              //     // console.log(data);

              //     resolve();
              //   }, 1000);
              // }),
            }
          : {}
      }
    />
  );
};
