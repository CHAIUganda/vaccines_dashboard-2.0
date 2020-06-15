import React, { forwardRef, useContext } from "react";

// Bring in our cold chain context
import { ColdChainContext } from "../../../../../../../context/ColdChain/ColdChainState";

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

export const DataTable = () => {
  const classes = useStyles();

  const { eligibility } = useContext(ColdChainContext);

  const {
    eligibilityDataTableData,
    startQuarter,
    endQuarter,
    isLoading,
  } = eligibility;

  const title = `Eligibility Status of CCE's at National Level for period ${startQuarter} - ${endQuarter}`;

  const columns = [
    {
      field: "district__name",
      title: "District",
      cellStyle: (rowData) => ({ fontSize: 13 }),
      headerStyle: { fontSize: 15, fontWeight: 700 },
      render: (rowData) => rowData.district__name.replace(/ District/g, ""),
    },
    {
      field: "total_eligible_facility",
      title: "Eligible Facilities",
      cellStyle: (rowData) => ({ fontSize: 13 }),
      headerStyle: { fontSize: 15, fontWeight: 700 },
      render: (rowData) =>
        new Intl.NumberFormat("lg-UG").format(rowData.total_eligible_facility),
    },
    {
      field: "cce_coverage_rate",
      title: "Coverage Rate",
      cellStyle: (rowData) => ({ fontSize: 13 }),
      headerStyle: { fontSize: 15, fontWeight: 700 },
      render: (rowData) =>
        new Intl.NumberFormat("lg-UG").format(rowData.cce_coverage_rate) + "%",
    },
  ];
  return (
    <MaterialTable
      title={<h3 className={classes.tableTitle}>{title}</h3>}
      data={eligibilityDataTableData || []}
      columns={columns}
      icons={tableIcons}
      isLoading={isLoading}
      style={{ height: "100%" }}
      options={
        ({
          sorting: true,
        },
        { maxBodyHeight: 890 },
        { exportButton: true },
        { pageSize: 10 })
      }
    />
  );
};
