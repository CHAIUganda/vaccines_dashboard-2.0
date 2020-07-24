import React, { useState, useContext, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import LinearProgress from "@material-ui/core/LinearProgress";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

// Bring in our performance management context
import { PerformanceManagementContext } from "../../../../../../../context/PerformanceManagement/PerformanceManagementState";
import { GlobalContext } from "../../../../../../../context/GlobalState";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  cost: {
    backgroundColor: "#28354A",
    color: "white",
    opacity: "0.5",
    fontWeight: 700,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  loading: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(5),
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },

  comment: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const useRowStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#4E596A",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

function Row({ row, data, logEntriesData, index }) {
  const { isAuthenticated, loggedInUser } = useContext(GlobalContext);
  const { updateActivitiesData2 } = useContext(PerformanceManagementContext);

  const [open, setOpen] = useState(false);
  const [editingStatus, setEditingStatus] = useState({
    id: "",
    editing: false,
  });

  const [activityStatus, setActivityStatus] = useState("");
  const [editComment, setEditComment] = useState("");

  const classes = useRowStyles();

  const handleStatusChange = (event) => {
    setActivityStatus(event.target.value);
  };

  const handleEditStatus = (id, status, comment, data, statusIndex) => {
    const payload = {
      id,
      status,
      comment,
      data,
      index,
      statusIndex,
      loggedInUser,
    };

    // Patch the data
    updateActivitiesData2(payload);

    // Reset editing status
    setEditingStatus({
      id,
      editing: !editingStatus.editing,
    });

    // Reset status & comment to empty
    setActivityStatus("");
    setEditComment("");
  };

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell>{row.immunization_component.name}</TableCell>
        <TableCell>{row.objective}</TableCell>
        <TableCell>{row.funding_source_organization.name}</TableCell>
        <TableCell>{row.funding_state}</TableCell>
        <TableCell>{row.funding_status}</TableCell>
        <TableCell>{row.funding_priority_level}</TableCell>
        <TableCell>{row.verification}</TableCell>
        <TableCell>{row.level}</TableCell>
        <TableCell>{row.time_frame}</TableCell>
        <TableCell>{row.responsible_focal_point}</TableCell>
        <TableCell>{row.stackholder_focal_point}</TableCell>
        <TableCell className={classes.cost}>
          {new Intl.NumberFormat("lg-UG").format(row.activity_cost_usd)}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={14}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Activity Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Year</TableCell>
                    <TableCell>Quarter</TableCell>
                    <TableCell style={{ width: 180 }}>
                      Quarter Budget (USD)
                    </TableCell>
                    <TableCell style={{ width: 180 }}>Status</TableCell>
                    <TableCell>Comment</TableCell>
                    <TableCell>Last Updated By</TableCell>
                    <TableCell>Last Update Date and Time</TableCell>
                    {isAuthenticated ? <TableCell></TableCell> : ""}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.activity_status?.map((status, statusIndex) => (
                    <TableRow key={status.id}>
                      <TableCell component="th" scope="row">
                        {status.year}
                      </TableCell>
                      <TableCell>Q{status.quarter}</TableCell>
                      <TableCell>
                        {new Intl.NumberFormat("lg-UG").format(
                          status.quarter_budget_usd
                        )}
                      </TableCell>
                      <TableCell>
                        {editingStatus.id === status.id &&
                        editingStatus.editing &&
                        isAuthenticated ? (
                          <FormControl className={classes.formControl}>
                            <Select
                              labelId="status-select-label"
                              id="status-select"
                              value={activityStatus}
                              onChange={handleStatusChange}
                            >
                              <MenuItem value={"Complete"}>Completed</MenuItem>
                              <MenuItem value={"Ongoing"}>Ongoing</MenuItem>
                              <MenuItem value={"Not Done"}>Not Done</MenuItem>
                            </Select>
                          </FormControl>
                        ) : (
                          <>{status.status} </>
                        )}
                      </TableCell>
                      <TableCell>
                        {editingStatus.id === status.id &&
                        editingStatus.editing &&
                        isAuthenticated ? (
                          <>
                            <form
                              className={classes.comment}
                              noValidate
                              autoComplete="off"
                            >
                              <div>
                                <TextareaAutosize
                                  style={{ width: "100%" }}
                                  rowsMin={4}
                                  id="standard-helperText"
                                  defaultValue={status.comment}
                                  onChange={(event) =>
                                    setEditComment(event.target.value)
                                  }
                                />
                              </div>
                            </form>
                          </>
                        ) : (
                          <> {status.comment} </>
                        )}
                      </TableCell>
                      <TableCell>{status.updated_by?.email}</TableCell>
                      <TableCell>{status.updated_at}</TableCell>
                      {isAuthenticated ? (
                        <TableCell>
                          {/* By default edit status is set to false. */}
                          {editingStatus.id === status.id &&
                          editingStatus.editing ? (
                            <IconButton aria-label="edit">
                              <SaveIcon
                                onClick={() =>
                                  handleEditStatus(
                                    status.id,
                                    activityStatus === ""
                                      ? status.status
                                      : activityStatus,
                                    editComment === ""
                                      ? status.comment
                                      : editComment,
                                    data,
                                    statusIndex
                                  )
                                }
                              />
                            </IconButton>
                          ) : (
                            <IconButton aria-label="edit">
                              <EditIcon
                                aria-label="edit activity"
                                size="small"
                                onClick={() =>
                                  setEditingStatus({
                                    id: status.id,
                                    editing: !editingStatus.editing,
                                  })
                                }
                              ></EditIcon>
                            </IconButton>
                          )}
                        </TableCell>
                      ) : (
                        ""
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export const DataTable = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [logEntriesData, setLogEntriesData] = useState([]);

  const {
    activities,
    currentYearStartQuarter,
    lastWorkPlanQuarter,
  } = useContext(PerformanceManagementContext);

  const { allActivities, logEntries, isLoading } = activities;

  const title = `Activities workplan for ${currentYearStartQuarter} - ${lastWorkPlanQuarter}`;

  useEffect(() => {
    setData(allActivities);
    setLogEntriesData(logEntries);
  }, [allActivities, logEntries]);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="activities table">
        <TableHead>
          <TableRow>
            <StyledTableCell />
            <StyledTableCell>Activity Name</StyledTableCell>
            <StyledTableCell>Immunization System Component</StyledTableCell>
            <StyledTableCell>Objective</StyledTableCell>
            <StyledTableCell>Funding Source</StyledTableCell>
            <StyledTableCell>Funding State</StyledTableCell>
            <StyledTableCell>Funding Status</StyledTableCell>
            <StyledTableCell>Funding Priority</StyledTableCell>
            <StyledTableCell>Means of Verification</StyledTableCell>
            <StyledTableCell>Level</StyledTableCell>
            <StyledTableCell>Activity Time Frame</StyledTableCell>
            <StyledTableCell>Responsible Focal Point</StyledTableCell>
            <StyledTableCell>Stakeholder Focal Point</StyledTableCell>
            <StyledTableCell>Cost (USD)</StyledTableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={14}>{title}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody stripedRows>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={14}>
                <LinearProgress />
              </TableCell>
            </TableRow>
          ) : (
            <>
              {data?.map((row, index) => (
                <Row
                  key={row.name}
                  row={row}
                  isAuthenticated
                  data={data}
                  index={index}
                  logEntriesData={logEntriesData}
                  // .filter((entry => entry.id === (row?.activity_status?.map(status => status))))}
                />
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
