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
import FormControl from "@material-ui/core/FormControl";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

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

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useRowStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  modalPaper: {
    position: "absolute",
    width: 700,
    height: 700,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflow: "scroll",
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
  const { isAuthenticated, loggedInUser, isSuperUser, userISC } = useContext(
    GlobalContext
  );
  const {
    updateActivitiesData2,
    updateAdminEdits,
    fundingSources,
    ISC,
  } = useContext(PerformanceManagementContext);

  const [modalStyle] = React.useState(getModalStyle);
  const [modelOpen, setModelOpen] = React.useState(false);
  const handleOpenModal = () => {
    setModelOpen(true);
  };

  const handleCloseModal = () => {
    setModelOpen(false);
  };

  const [open, setOpen] = useState(false);

  const [editingStatus, setEditingStatus] = useState({
    id: "",
    editing: false,
  });

  const [superUserEditStatus, setSuperUserEditStatus] = useState({
    editing: false,
  });

  // Normal user can only edit activity status and the activity comment
  const [activityStatus, setActivityStatus] = useState("");
  const [editComment, setEditComment] = useState("");

  //Super user can edit everything
  const [editActivityName, setEditActivityName] = useState("");
  const [editISC, setEditISC] = useState("");
  const [editObjective, setEditObjective] = useState("");
  const [editFundingSource, setFundingSource] = useState("");
  const [editFundingState, setEditFundingState] = useState("");
  const [editFundingStatus, setEditFundingStatus] = useState("");
  const [editFundingPriority, setEditFundingPriority] = useState("");
  const [editMoV, setEditMoV] = useState("");
  const [editLevel, setEditLevel] = useState("");
  const [editActivityTimeFrame, setEditActivityTimeFrame] = useState("");
  const [editResponsibleFocalPoint, setEditResponsibleFocalPoint] = useState(
    ""
  );
  const [editStakeHolderFocalPoint, setEditStakeHolderFocalPoint] = useState(
    ""
  );
  const [editCostUSD, setEditCostUSD] = useState("");
  const [editQuarterBudgetUSD, setEditQuarterBudgetUSD] = useState("");

  const classes = useRowStyles();

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

  const handleSuperUserEdit = (
    id,
    editActivityName,
    editISC,
    editObjective,
    editFundingSource,
    editFundingState,
    editFundingStatus,
    editFundingPriority,
    editMoV,
    editLevel,
    editActivityTimeFrame,
    editResponsibleFocalPoint,
    editStakeHolderFocalPoint,
    editCostUSD,
    editQuarterBudgetUSD
  ) => {
    const payload = {
      id,
      editActivityName,
      editISC,
      editObjective,
      editFundingSource,
      editFundingState,
      editFundingStatus,
      editFundingPriority,
      editMoV,
      editLevel,
      editActivityTimeFrame,
      editResponsibleFocalPoint,
      editStakeHolderFocalPoint,
      editCostUSD,
      editQuarterBudgetUSD,
    };

    // Patch admin data

    updateAdminEdits(payload);

    handleCloseModal();
    // setSuperUserEditStatus({
    //   editing: !superUserEditStatus.editing,
    // });
  };

  const handleStatusChange = (event) => {
    setActivityStatus(event.target.value);
  };

  // Filters
  const ISCFilter = ISC.filter((isc) => isc !== "All").map((isc) => (
    <MenuItem value={isc} key={isc} className={classes.liItems}>
      {isc}
    </MenuItem>
  ));

  const fundingSourcesFilter = fundingSources
    .filter((fundingSource) => fundingSource !== "All")
    .map((fundingSource) => (
      <MenuItem
        value={fundingSource}
        key={fundingSource}
        className={classes.liItems}
      >
        {fundingSource}
      </MenuItem>
    ));

  const superUserEditModal = (
    <div style={modalStyle} className={classes.modalPaper}>
      <h4 className={classes.h4}>Edit Activity Details</h4>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Field</TableCell>
              <TableCell align="right"> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                Activity Name
              </TableCell>
              <TableCell component="th" scope="row">
                <div>
                  <TextareaAutosize
                    style={{ width: "100%" }}
                    rowsMin={4}
                    id="standard-helperText"
                    defaultValue={row.name}
                    onChange={(event) =>
                      setEditActivityName(event.target.value)
                    }
                  />
                </div>
              </TableCell>
            </TableRow>
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                Immunization System Component Name
              </TableCell>
              <TableCell component="th" scope="row">
                <FormControl className={classes.formControl}>
                  <Select
                    labelId="ISC-select-label"
                    id="ISC-select"
                    value={editISC}
                    onChange={(event) => setEditISC(event.target.value)}
                  >
                    {ISCFilter}
                  </Select>
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                Objective
              </TableCell>
              <TableCell component="th" scope="row">
                <div>
                  <TextareaAutosize
                    style={{ width: "100%" }}
                    rowsMin={4}
                    id="standard-helperText"
                    defaultValue={row.objective}
                    onChange={(event) => setEditObjective(event.target.value)}
                  />
                </div>
              </TableCell>
            </TableRow>
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                Funding Source Organization
              </TableCell>
              <TableCell component="th" scope="row">
                <FormControl className={classes.formControl}>
                  <Select
                    labelId="fundingSource-select-label"
                    id="fundingSource-select"
                    value={editFundingSource}
                    onChange={(event) => setFundingSource(event.target.value)}
                  >
                    {fundingSourcesFilter}
                  </Select>
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                Funding State
              </TableCell>
              <TableCell component="th" scope="row">
                <FormControl className={classes.formControl}>
                  <Select
                    labelId="fundingState-select-label"
                    id="fundingState-select"
                    value={editFundingState}
                    onChange={(event) =>
                      setEditFundingState(event.target.value)
                    }
                  >
                    <MenuItem value={"Funded"}>Funded</MenuItem>
                    <MenuItem value={"Not Funded"}>Not Funded</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                Funding Status
              </TableCell>
              <TableCell component="th" scope="row">
                <FormControl className={classes.formControl}>
                  <Select
                    labelId="fundingStatus-select-label"
                    id="fundingStatus-select"
                    value={editFundingStatus}
                    onChange={(event) =>
                      setEditFundingStatus(event.target.value)
                    }
                  >
                    <MenuItem value={"Secured"}>Secured</MenuItem>
                    <MenuItem value={"Unsecured"}>Unsecured</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                Funding Priority
              </TableCell>
              <TableCell component="th" scope="row">
                <FormControl className={classes.formControl}>
                  <Select
                    labelId="fundingPriority-select-label"
                    id="fundingPriority-select"
                    value={editFundingPriority}
                    onChange={(event) =>
                      setEditFundingPriority(event.target.value)
                    }
                  >
                    <MenuItem value={"Secured"}>High</MenuItem>
                    <MenuItem value={"Medium"}>Medium</MenuItem>
                    <MenuItem value={"Low"}>Low</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                Means of Verification
              </TableCell>
              <TableCell component="th" scope="row">
                <div>
                  <TextareaAutosize
                    style={{ width: "100%" }}
                    rowsMin={4}
                    id="standard-helperText"
                    defaultValue={row.verification}
                    onChange={(event) => setEditMoV(event.target.value)}
                  />
                </div>
              </TableCell>
            </TableRow>
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                Level
              </TableCell>
              <TableCell component="th" scope="row">
                <FormControl className={classes.formControl}>
                  <Select
                    labelId="level-select-label"
                    id="level-select"
                    value={editLevel}
                    onChange={(event) => setEditLevel(event.target.value)}
                  >
                    <MenuItem value={"National"}>National</MenuItem>
                    <MenuItem value={"District"}>District</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                Activity Time Frame
              </TableCell>
              <TableCell component="th" scope="row">
                <div>
                  <TextareaAutosize
                    style={{ width: "100%" }}
                    rowsMin={4}
                    id="standard-helperText"
                    defaultValue={row.time_frame}
                    onChange={(event) =>
                      setEditActivityTimeFrame(event.target.value)
                    }
                  />
                </div>
              </TableCell>
            </TableRow>
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                Responsible Focal Point
              </TableCell>
              <TableCell component="th" scope="row">
                <div>
                  <TextareaAutosize
                    style={{ width: "100%" }}
                    rowsMin={4}
                    id="standard-helperText"
                    defaultValue={row.responsible_focal_point}
                    onChange={(event) =>
                      setEditResponsibleFocalPoint(event.target.value)
                    }
                  />
                </div>
              </TableCell>
            </TableRow>
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                Stakeholder Focal Point
              </TableCell>
              <TableCell component="th" scope="row">
                <div>
                  <TextareaAutosize
                    style={{ width: "100%" }}
                    rowsMin={4}
                    id="standard-helperText"
                    defaultValue={row.stackholder_focal_point}
                    onChange={(event) =>
                      setEditStakeHolderFocalPoint(event.target.value)
                    }
                  />
                </div>
              </TableCell>
            </TableRow>
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                Cost (USD)
              </TableCell>
              <TableCell component="th" scope="row">
                <div>
                  <TextareaAutosize
                    style={{ width: "100%" }}
                    rowsMin={4}
                    id="standard-helperText"
                    defaultValue={row.activity_cost_usd}
                    onChange={(event) => setEditCostUSD(event.target.value)}
                  />
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        style={{ marginTop: 20 }}
        variant="contained"
        color="primary"
        onClick={() =>
          handleSuperUserEdit(
            row.id,
            editActivityName === "" ? row.name : editActivityName,
            editISC === "" ? row.immunization_component.name : editISC,
            editObjective === "" ? row.objective : editObjective,
            editFundingSource === ""
              ? row.funding_source_organization.name
              : editFundingSource,
            editFundingState === "" ? row.funding_state : editFundingState,
            editFundingStatus === "" ? row.funding_status : editFundingStatus,
            editFundingPriority === ""
              ? row.funding_priority_level
              : editFundingPriority,
            editMoV === "" ? row.verification : editMoV,
            editLevel === "" ? row.level : editLevel,
            editActivityTimeFrame === ""
              ? row.time_frame
              : editActivityTimeFrame,
            editResponsibleFocalPoint === ""
              ? row.responsible_focal_point
              : editResponsibleFocalPoint,
            editStakeHolderFocalPoint === ""
              ? row.stackholder_focal_point
              : editStakeHolderFocalPoint,
            editCostUSD === "" ? row.activity_cost_usd : editCostUSD,
            editQuarterBudgetUSD
          )
        }
      >
        Save
      </Button>

      <Button
        style={{ marginTop: 20, marginLeft: 300 }}
        variant="contained"
        color="secondary"
        onClick={handleCloseModal}
      >
        Cancel
      </Button>
    </div>
  );

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
        {isAuthenticated && isSuperUser ? (
          <TableCell>
            {/* By default edit status is set to false. */}
            {superUserEditStatus.editing ? (
              ""
            ) : (
              <IconButton aria-label="edit">
                <EditIcon
                  aria-label="edit activity"
                  size="small"
                  onClick={handleOpenModal}
                ></EditIcon>
              </IconButton>
            )}

            <Modal
              open={modelOpen}
              onClose={handleCloseModal}
              aria-labelledby="Edit activities"
              aria-describedby="Edit activities"
            >
              {superUserEditModal}
            </Modal>
          </TableCell>
        ) : (
          ""
        )}
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

  const { imcID, isAuthenticated, isSuperUser } = useContext(GlobalContext);

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
            <StyledTableCell>Actions</StyledTableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={15}>{title}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody stripedRows>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={15}>
                <LinearProgress />
              </TableCell>
            </TableRow>
          ) : (
            <>
              {isSuperUser
                ? data?.map((row, index) => (
                    <Row
                      key={row.name}
                      row={row}
                      isAuthenticated
                      data={data}
                      index={index}
                      logEntriesData={logEntriesData}
                    />
                  ))
                : isAuthenticated
                ? data
                    ?.filter((imc) => imc.immunization_component.id === imcID)
                    ?.map((row, index) => (
                      <Row
                        key={row.name}
                        row={row}
                        isAuthenticated
                        data={data}
                        index={index}
                        logEntriesData={logEntriesData}
                      />
                    ))
                : data?.map((row, index) => (
                    <Row
                      key={row.name}
                      row={row}
                      isAuthenticated
                      data={data}
                      index={index}
                      logEntriesData={logEntriesData}
                    />
                  ))}
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
