import React, { forwardRef, useContext } from "react";

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

  const { isAuthenticated } = useContext(GlobalContext);

  const {
    activities,
    currentYearStartQuarter,
    lastWorkPlanQuarter,
  } = useContext(PerformanceManagementContext);

  const { allActivities, isLoading } = activities;

  const title = `Activities workplan for ${currentYearStartQuarter} - ${lastWorkPlanQuarter}`;

  const styles = {
    header: {
      //   color: "#28354A",
      //   opacity: "100%",
      //   fontSize: "medium",
      //   fontWeight: 500,
      color: "#727880",
      fontWeight: 400,
    },
    rowContent: {
      color: "#28354A",
      fontSize: "small",
    },
  };

  const columns = [
    {
      field: "name",
      title: "Name",
      cellStyle: (rowData) => styles.rowContent,
      headerStyle: styles.header,
      render: (rowData) => rowData.name,
      editable: "never",
    },

    {
      field: "immunization_component",
      title: "ISC",
      cellStyle: (rowData) => styles.rowContent,
      headerStyle: styles.header,
      render: (rowData) => rowData.immunization_component.name,
      editable: "never",
    },

    {
      field: "activity_cost_usd",
      title: "Cost (USD)",
      cellStyle: (rowData) => styles.rowContent,
      headerStyle: styles.header,
      render: (rowData) =>
        new Intl.NumberFormat("lg-UG").format(rowData.activity_cost_usd),
      editable: "onUpdate",
    },
    {
      field: "funding_status",
      title: "Funding Status",
      cellStyle: (rowData) => styles.rowContent,
      headerStyle: styles.header,
      render: (rowData) => rowData.funding_status,
      editable: "never",
    },
    {
      field: "level",
      title: "Level",
      cellStyle: (rowData) => styles.rowContent,
      headerStyle: styles.header,
      render: (rowData) => rowData.level,
      editable: "never",
    },
    {
      field: "funding_priority_level",
      title: "Funding Priority",
      cellStyle: (rowData) => styles.rowContent,
      headerStyle: styles.header,
      render: (rowData) => rowData.funding_priority_level,
      editable: "never",
    },
    {
      field: "responsible_focal_point",
      title: "Focal Point",
      cellStyle: (rowData) => styles.rowContent,
      headerStyle: styles.header,
      render: (rowData) => rowData.responsible_focal_point,
      editable: "never",
    },

    // {
    //   field: "activity_date",
    //   title: "Date",
    //   cellStyle: (rowData) => styles.rowContent,
    //   headerStyle: styles.header,
    //   render: (rowData) => rowData.activity_date?.map((d) => d.date),
    //   editable: "never",
    // },
    // {
    //   field: "activity_status",
    //   title: "Status",
    //   cellStyle: (rowData) => styles.rowContent,
    //   headerStyle: styles.header,
    //   render: (rowData) => rowData.activity_status?.map((s) => s.status),
    //   editable: "never",
    // },
  ];

  return (
    <MaterialTable
      title={<h3 className={classes.tableTitle}>{title}</h3>}
      data={allActivities || []}
      isLoading={isLoading}
      columns={columns}
      style={{ height: "100%", width: "100%" }}
      icons={tableIcons}
      options={
        ({
          sorting: true,
        },
        { exportButton: true })
        // { pageSize: 6 }
      }
      editable={
        isAuthenticated
          ? {
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    if (oldData) {
                      // setState((prevState) => {
                      //   const data = [...prevState.data];
                      //   data[data.indexOf(oldData)] = newData;
                      //   return { ...prevState, data };
                      // });
                      console.log(oldData);
                      console.log(newData);
                    }
                  }, 600);
                }),
            }
          : {}
      }
    />
  );
};
