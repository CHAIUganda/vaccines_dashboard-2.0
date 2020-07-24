import React, { useState, useEffect, useContext } from "react";

// Bring in our stock management context
import { PerformanceManagementContext } from "../../../../context/PerformanceManagement/PerformanceManagementState";

// Material components
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Tooltip from "@material-ui/core/Tooltip";
import MenuItem from "@material-ui/core/MenuItem";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";

// Import Performance Management components.

import ActivityStatusCompletion from "./components/ActivityStatusCompletion/index";
import FundingStatus from "./components/FundingStatus/index";
// import Activities from "./components/Activities/index";
import Activities2 from "./components/Activities/index2";

// Import common styles
import { useStyles } from "../styles";

// Shared components

const CustomSwitch = withStyles({
  switchBase: {
    color: "white",
    "&$checked": {
      color: "#4E596A",
    },
    "&$checked + $track": {
      backgroundColor: "#4E596A",
    },
  },
  checked: {},
  track: {},
})(Switch);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`performance-management-keymetrics-tabpanel-${index}`}
      aria-labelledby={`performance-management-keymetrics-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `performance-management-keymetrics-tab-${index}`,
    "aria-controls": `performance-management-keymetrics-tabpanel-${index}`,
  };
}

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}))(Tooltip);

const TabStyle = withStyles((theme) => ({
  root: {
    textTransform: "none",
    fontWeight: theme.typography.fontWeightBold,
    fontSize: 12,
    color: "#28354A",
    "&:hover": {
      backgroundColor: "#4E596A",
      color: "white",
      opacity: 1,
    },
    "&$selected": {
      backgroundColor: "#4E596A",
      color: "white",
      fontWeight: theme.typography.fontWeightMedium,
      fontSize: 12,
    },
  },
  selected: {},
}))((props) => <Tab {...props} />);

export function PerformanceManagementPanel() {
  // Extract required Stock management state variables
  const {
    defaultOrganisation,
    defaultISC,
    defaultFundingSource,
    defaultFundingStatus,
    organisations,
    ISC,
    fundingSources,
    currentYearStartQuarter,
    lastWorkPlanQuarter,
    quarters,
    getOrganistations,
    getFundingSources,
    getISCs,
    getActivityCompletionStatusData,
    getFundingStatusData,
    getActivitiesData,
  } = useContext(PerformanceManagementContext);

  // -----------------------------------------------------------------------
  useEffect(() => {
    getOrganistations();
    getISCs();
    getFundingSources();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // -----------------------------------------------------------------------
  //  Activity Completion Status State
  // -----------------------------------------------------------------------

  const [
    activityCompletionStatusStartQuarter,
    setActivityCompletionStatusStartQuarter,
  ] = useState(currentYearStartQuarter);

  const [
    activityCompletionStatusEndQuarter,
    setActivityCompletionStatusEndQuarter,
  ] = useState(lastWorkPlanQuarter);

  const [
    activityCompletionStatusOrg,
    setActivityCompletionStatusOrg,
  ] = useState(defaultOrganisation);

  const [
    activityCompletionStatusISC,
    setActivityCompletionStatusISC,
  ] = useState(defaultISC);

  useEffect(() => {
    getActivityCompletionStatusData(
      activityCompletionStatusStartQuarter,
      activityCompletionStatusEndQuarter,
      activityCompletionStatusOrg,
      activityCompletionStatusISC
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    activityCompletionStatusStartQuarter,
    activityCompletionStatusEndQuarter,
    activityCompletionStatusOrg,
    activityCompletionStatusISC,
  ]);

  // -----------------------------------------------------------------------
  //  Funding Status State
  // -----------------------------------------------------------------------
  const [fundingStatusStartQuarter, setFundingStatusStartQuarter] = useState(
    currentYearStartQuarter
  );

  const [fundingStatusEndQuarter, setFundingStatusEndQuarter] = useState(
    lastWorkPlanQuarter
  );

  const [
    fundingStatusFundingSourceOrg,
    setFundingStatusFundingSourceOrg,
  ] = useState(defaultFundingSource);

  const [fundingStatusOrg, setFundingStatusOrg] = useState(defaultOrganisation);

  const [fundingStatusISC, setFundingStatusISC] = useState(defaultISC);

  const [fundingStatusStatus, setFundingStatusStatus] = useState(
    defaultFundingStatus
  );

  useEffect(() => {
    getFundingStatusData(
      fundingStatusStartQuarter,
      fundingStatusEndQuarter,
      fundingStatusFundingSourceOrg,
      fundingStatusOrg,
      fundingStatusISC,
      fundingStatusStatus
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    fundingStatusStartQuarter,
    fundingStatusEndQuarter,
    fundingStatusFundingSourceOrg,
    fundingStatusOrg,
    fundingStatusISC,
    fundingStatusStatus,
  ]);

  // -----------------------------------------------------------------------
  //  Activities Status State
  // -----------------------------------------------------------------------
  const [activitiesStartQuarter, setActivitiesStartQuarter] = useState(
    currentYearStartQuarter
  );
  const [activitiesEndQuarter, setActivitiesEndQuarter] = useState(
    lastWorkPlanQuarter
  );

  const [activitiesFundingSourceOrg, setActivitiesFundingSourceOrg] = useState(
    defaultFundingSource
  );

  const [activitiesOrg, setActivitiesOrg] = useState(defaultOrganisation);

  const [activitiesISC, setActivitiesISC] = useState(defaultISC);

  const [activitiesFundingStatus, setActivitiesFundingStatus] = useState(
    defaultFundingStatus
  );

  useEffect(() => {
    getActivitiesData(
      activitiesStartQuarter,
      activitiesEndQuarter,
      activitiesFundingSourceOrg,
      activitiesOrg,
      activitiesISC,
      activitiesFundingStatus
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    activitiesStartQuarter,
    activitiesEndQuarter,
    activitiesFundingSourceOrg,
    activitiesOrg,
    activitiesISC,
    activitiesFundingStatus,
  ]);

  // -----------------------------------------------------------------------
  //  Activity Completion Status Filters
  // -----------------------------------------------------------------------

  const activityCompletionStatusStartQuarterFilter = quarters.map((quarter) => (
    <MenuItem
      value={quarter.value}
      key={quarter.value}
      className={classes.liItems}
    >
      {quarter.name}
    </MenuItem>
  ));

  const activityCompletionStatusEndQuarterFilter = quarters.map((quarter) => (
    <MenuItem
      value={quarter.value}
      key={quarter.value}
      className={classes.liItems}
    >
      {quarter.name}
    </MenuItem>
  ));

  const activityCompletionStatusOrgFilter = organisations.map((org) => (
    <MenuItem value={org} key={org} className={classes.liItems}>
      {org}
    </MenuItem>
  ));

  const activityCompletionStatusISCFilter = ISC.map((isc) => (
    <MenuItem value={isc} key={isc} className={classes.liItems}>
      {isc}
    </MenuItem>
  ));

  // -----------------------------------------------------------------------
  //  Funding Status Filters
  // -----------------------------------------------------------------------

  const fundingStatusStartQuarterFilter = quarters.map((quarter) => (
    <MenuItem
      value={quarter.value}
      key={quarter.value}
      className={classes.liItems}
    >
      {quarter.name}
    </MenuItem>
  ));

  const fundingStatusEndQuarterFilter = quarters.map((quarter) => (
    <MenuItem
      value={quarter.value}
      key={quarter.value}
      className={classes.liItems}
    >
      {quarter.name}
    </MenuItem>
  ));

  const fundingStatusFundingSourceOrgFilter = fundingSources.map((org) => (
    <MenuItem value={org} key={org} className={classes.liItems}>
      {org}
    </MenuItem>
  ));

  const fundingStatusOrgFilter = organisations.map((org) => (
    <MenuItem value={org} key={org} className={classes.liItems}>
      {org}
    </MenuItem>
  ));

  const fundingStatusISCFilter = ISC.map((isc) => (
    <MenuItem value={isc} key={isc} className={classes.liItems}>
      {isc}
    </MenuItem>
  ));

  // -----------------------------------------------------------------------
  //  Activities Filters
  // -----------------------------------------------------------------------

  const activitiesStartQuarterFilter = quarters.map((quarter) => (
    <MenuItem
      value={quarter.value}
      key={quarter.value}
      className={classes.liItems}
    >
      {quarter.name}
    </MenuItem>
  ));

  const activitiesEndQuarterFilter = quarters.map((quarter) => (
    <MenuItem
      value={quarter.value}
      key={quarter.value}
      className={classes.liItems}
    >
      {quarter.name}
    </MenuItem>
  ));

  const activitiesFundingSourceOrgFilter = fundingSources.map((org) => (
    <MenuItem value={org} key={org} className={classes.liItems}>
      {org}
    </MenuItem>
  ));

  const activitiesOrgFilter = organisations.map((org) => (
    <MenuItem value={org} key={org} className={classes.liItems}>
      {org}
    </MenuItem>
  ));

  const activitiesISCFilter = ISC.map((isc) => (
    <MenuItem value={isc} key={isc} className={classes.liItems}>
      {isc}
    </MenuItem>
  ));

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" className={classes.title}>
            Key Metrics
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item lg={6} md={6} xl={6} xs={12}>
            <AppBar position="static" className={classes.appBar} elevation={0}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="Cold Chain Key metrics"
                className={classes.tabs}
                TabIndicatorProps={{
                  style: { backgroundColor: "#4E596A" },
                }}
              >
                <TabStyle
                  {...a11yProps(0)}
                  label={
                    <HtmlTooltip
                      title={
                        <React.Fragment>
                          <Typography color="inherit">
                            <b> {"Help text goes here"}</b>
                          </Typography>
                        </React.Fragment>
                      }
                      enterDelay={500}
                      leaveDelay={200}
                    >
                      <span>Funding Status</span>
                    </HtmlTooltip>
                  }
                />
                <TabStyle
                  {...a11yProps(1)}
                  label={
                    <HtmlTooltip
                      title={
                        <React.Fragment>
                          <Typography color="inherit">
                            <b>{"Help text goes here"}</b>
                          </Typography>
                        </React.Fragment>
                      }
                      enterDelay={500}
                      leaveDelay={200}
                    >
                      <span>Activity Completion Status</span>
                    </HtmlTooltip>
                  }
                />
                <TabStyle
                  {...a11yProps(2)}
                  label={
                    <HtmlTooltip
                      title={
                        <React.Fragment>
                          <Typography color="inherit">
                            <b> {"Help text goes here"}</b>
                          </Typography>
                        </React.Fragment>
                      }
                      enterDelay={500}
                      leaveDelay={200}
                    >
                      <span>Activities</span>
                    </HtmlTooltip>
                  }
                />
                {/* <TabStyle
                  {...a11yProps(3)}
                  label={
                    <HtmlTooltip
                      title={
                        <React.Fragment>
                          <Typography color="inherit">
                            <b> {"Help text goes here"}</b>
                          </Typography>
                        </React.Fragment>
                      }
                      enterDelay={500}
                      leaveDelay={200}
                    >
                      <span>Activities New Design</span>
                    </HtmlTooltip>
                  }
                /> */}
              </Tabs>
            </AppBar>
          </Grid>
          <Grid item lg={6} md={6} xl={6} xs={12}>
            <TabPanel value={value} index={0}>
              <div className={classes.filters2}>
                <FormControl
                  className={classes.formControl}
                  variant="outlined"
                  margin="dense"
                >
                  <InputLabel
                    htmlFor="FSStartQuarter"
                    className={classes.selectorLables}
                  >
                    Start Quarter
                  </InputLabel>
                  <Select
                    className={classes.selector_background}
                    value={fundingStatusStartQuarter}
                    onChange={(event) =>
                      setFundingStatusStartQuarter(event.target.value)
                    }
                    inputProps={{
                      name: "FSStartQuarter_selector",
                      id: "FSStartQuarter_selector",
                    }}
                  >
                    {fundingStatusStartQuarterFilter}
                  </Select>
                </FormControl>

                <FormControl
                  className={classes.formControl}
                  variant="outlined"
                  margin="dense"
                >
                  <InputLabel
                    htmlFor="FSEndQuarter"
                    className={classes.selectorLables}
                  >
                    End Quarter
                  </InputLabel>
                  <Select
                    className={classes.selector_background}
                    value={fundingStatusEndQuarter}
                    onChange={(event) =>
                      setFundingStatusEndQuarter(event.target.value)
                    }
                    inputProps={{
                      name: "FSEndQuarter_selector",
                      id: "FSEndQuarter_selector",
                    }}
                  >
                    {fundingStatusEndQuarterFilter}
                  </Select>
                </FormControl>
                <FormControl
                  className={classes.formControl}
                  variant="outlined"
                  margin="dense"
                >
                  <InputLabel
                    htmlFor="FSourceOrg"
                    className={classes.selectorLables}
                  >
                    Funding Source
                  </InputLabel>
                  <Select
                    className={classes.selector_background}
                    value={fundingStatusFundingSourceOrg}
                    onChange={(event) =>
                      setFundingStatusFundingSourceOrg(event.target.value)
                    }
                    inputProps={{
                      name: "FSourceORG_selector",
                      id: "FSourceORG_selector",
                    }}
                  >
                    {fundingStatusFundingSourceOrgFilter}
                  </Select>
                </FormControl>
                <FormControl
                  className={classes.formControl}
                  variant="outlined"
                  margin="dense"
                >
                  <InputLabel
                    htmlFor="FSOrg"
                    className={classes.selectorLables}
                    style={{ width: 180 }}
                  >
                    Implementing Agency
                  </InputLabel>
                  <Select
                    className={classes.selector_background}
                    value={fundingStatusOrg}
                    onChange={(event) =>
                      setFundingStatusOrg(event.target.value)
                    }
                    inputProps={{
                      name: "FSORG_selector",
                      id: "FSORG_selector",
                    }}
                  >
                    {fundingStatusOrgFilter}
                  </Select>
                </FormControl>
                <FormControl
                  component="fieldset"
                  className={classes.switchFormControl}
                >
                  <FormLabel component="legend" className={classes.switchLable}>
                    Funding Status
                  </FormLabel>
                  <FormGroup
                    aria-label="position"
                    row
                    className={classes.switch}
                  >
                    <FormControlLabel
                      classes={{
                        label: classes.switchLable,
                      }}
                      value={fundingStatusStatus}
                      control={
                        <CustomSwitch
                          size="small"
                          checked={fundingStatusStatus}
                          onChange={() =>
                            setFundingStatusStatus(!fundingStatusStatus)
                          }
                        />
                      }
                      label="Secured"
                      labelPlacement="start"
                      style={{ fontSize: "small", color: "#28354A" }}
                    />
                  </FormGroup>
                </FormControl>
                <FormControl
                  className={classes.formControl}
                  variant="outlined"
                  margin="dense"
                >
                  <InputLabel
                    htmlFor="FSISC"
                    className={classes.selectorLables}
                  >
                    ISC
                  </InputLabel>
                  <Select
                    className={classes.selector_background}
                    value={fundingStatusISC}
                    onChange={(event) =>
                      setFundingStatusISC(event.target.value)
                    }
                    inputProps={{
                      name: "FSISC_selector",
                      id: "FSISC_selector",
                    }}
                    style={{ maxWidth: 135 }}
                  >
                    {fundingStatusISCFilter}
                  </Select>
                </FormControl>
              </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <div className={classes.filters2}>
                <FormControl
                  className={classes.formControl}
                  variant="outlined"
                  margin="dense"
                >
                  <InputLabel
                    htmlFor="ACSStartQuarter"
                    className={classes.selectorLables}
                  >
                    Start Quarter
                  </InputLabel>
                  <Select
                    className={classes.selector_background}
                    value={activityCompletionStatusStartQuarter}
                    onChange={(event) =>
                      setActivityCompletionStatusStartQuarter(
                        event.target.value
                      )
                    }
                    inputProps={{
                      name: "ACSStartQuarter_selector",
                      id: "ACSStartQuarter_selector",
                    }}
                  >
                    {activityCompletionStatusStartQuarterFilter}
                  </Select>
                </FormControl>
                <FormControl
                  className={classes.formControl}
                  variant="outlined"
                  margin="dense"
                >
                  <InputLabel
                    htmlFor="ACSEndQuarter"
                    className={classes.selectorLables}
                  >
                    End Quarter
                  </InputLabel>
                  <Select
                    className={classes.selector_background}
                    value={activityCompletionStatusEndQuarter}
                    onChange={(event) =>
                      setActivityCompletionStatusEndQuarter(event.target.value)
                    }
                    inputProps={{
                      name: "ACSEndQuarter_selector",
                      id: "ACSEndQuarter_selector",
                    }}
                  >
                    {activityCompletionStatusEndQuarterFilter}
                  </Select>
                </FormControl>
                <FormControl
                  className={classes.formControl}
                  variant="outlined"
                  margin="dense"
                >
                  <InputLabel
                    htmlFor="ACSOrg"
                    className={classes.selectorLables}
                    style={{ width: 180 }}
                  >
                    Implementing Agency
                  </InputLabel>
                  <Select
                    className={classes.selector_background}
                    value={activityCompletionStatusOrg}
                    onChange={(event) =>
                      setActivityCompletionStatusOrg(event.target.value)
                    }
                    inputProps={{
                      name: "ACSOrg_selector",
                      id: "ACSOrg_selector",
                    }}
                  >
                    {activityCompletionStatusOrgFilter}
                  </Select>
                </FormControl>
                <FormControl
                  className={classes.formControl}
                  variant="outlined"
                  margin="dense"
                >
                  <InputLabel
                    htmlFor="ACSISC"
                    className={classes.selectorLables}
                  >
                    ISC
                  </InputLabel>
                  <Select
                    className={classes.selector_background}
                    value={activityCompletionStatusISC}
                    onChange={(event) =>
                      setActivityCompletionStatusISC(event.target.value)
                    }
                    inputProps={{
                      name: "ACSISC_selector",
                      id: "ACSISC_selector",
                    }}
                    style={{ maxWidth: 135 }}
                  >
                    {activityCompletionStatusISCFilter}
                  </Select>
                </FormControl>
              </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <div className={classes.filters2}>
                <FormControl
                  className={classes.formControl}
                  variant="outlined"
                  margin="dense"
                >
                  <InputLabel
                    htmlFor="ActivityStartQuarter"
                    className={classes.selectorLables}
                  >
                    Start Quarter
                  </InputLabel>
                  <Select
                    className={classes.selector_background}
                    value={activitiesStartQuarter}
                    onChange={(event) =>
                      setActivitiesStartQuarter(event.target.value)
                    }
                    inputProps={{
                      name: "ActivityStartQuarter_selector",
                      id: "ActivityStartQuarter_selector",
                    }}
                  >
                    {activitiesStartQuarterFilter}
                  </Select>
                </FormControl>
                <FormControl
                  className={classes.formControl}
                  variant="outlined"
                  margin="dense"
                >
                  <InputLabel
                    htmlFor="ActivityEndQuarter"
                    className={classes.selectorLables}
                  >
                    End Quarter
                  </InputLabel>
                  <Select
                    className={classes.selector_background}
                    value={activitiesEndQuarter}
                    onChange={(event) =>
                      setActivitiesEndQuarter(event.target.value)
                    }
                    inputProps={{
                      name: "ActivityEndQuarter_selector",
                      id: "ActivityEndQuarter_selector",
                    }}
                  >
                    {activitiesEndQuarterFilter}
                  </Select>
                </FormControl>
                <FormControl
                  className={classes.formControl}
                  variant="outlined"
                  margin="dense"
                >
                  <InputLabel
                    htmlFor="ActivityFSourceOrg"
                    className={classes.selectorLables}
                  >
                    Funding Source
                  </InputLabel>
                  <Select
                    className={classes.selector_background}
                    value={activitiesFundingSourceOrg}
                    onChange={(event) =>
                      setActivitiesFundingSourceOrg(event.target.value)
                    }
                    inputProps={{
                      name: "ActivityFSourceOrg_selector",
                      id: "ActivityFSourceOrg_selector",
                    }}
                  >
                    {activitiesFundingSourceOrgFilter}
                  </Select>
                </FormControl>
                <FormControl
                  className={classes.formControl}
                  variant="outlined"
                  margin="dense"
                >
                  <InputLabel
                    htmlFor="ActivityOrg"
                    className={classes.selectorLables}
                    style={{ width: 180 }}
                  >
                    Implementing Agency
                  </InputLabel>
                  <Select
                    className={classes.selector_background}
                    value={activitiesOrg}
                    onChange={(event) => setActivitiesOrg(event.target.value)}
                    inputProps={{
                      name: "ActivityOrg_selector",
                      id: "ActivityOrg_selector",
                    }}
                  >
                    {activitiesOrgFilter}
                  </Select>
                </FormControl>
                <FormControl
                  component="fieldset"
                  className={classes.switchFormControl}
                >
                  <FormLabel component="legend" className={classes.switchLable}>
                    Funding Status
                  </FormLabel>
                  <FormGroup
                    aria-label="position"
                    row
                    className={classes.switch}
                  >
                    <FormControlLabel
                      classes={{
                        label: classes.switchLable,
                      }}
                      value={activitiesFundingStatus}
                      control={
                        <CustomSwitch
                          size="small"
                          checked={activitiesFundingStatus}
                          onChange={() =>
                            setActivitiesFundingStatus(!activitiesFundingStatus)
                          }
                        />
                      }
                      label={"Secured"}
                      labelPlacement="start"
                    />
                  </FormGroup>
                </FormControl>
                <FormControl
                  className={classes.formControl}
                  variant="outlined"
                  margin="dense"
                >
                  <InputLabel
                    htmlFor="ActivityISC"
                    className={classes.selectorLables}
                  >
                    ISC
                  </InputLabel>
                  <Select
                    className={classes.selector_background}
                    value={activitiesISC}
                    onChange={(event) => setActivitiesISC(event.target.value)}
                    inputProps={{
                      name: "ActivityISC_selector",
                      id: "ActivityISC_selector",
                    }}
                    style={{ maxWidth: 135 }}
                  >
                    {activitiesISCFilter}
                  </Select>
                </FormControl>
              </div>
            </TabPanel>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} style={{ width: "100vh" }}>
          <TabPanel value={value} index={0}>
            <FundingStatus />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ActivityStatusCompletion />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Activities2 />
          </TabPanel>
          {/* <TabPanel value={value} index={3}>
            <Activities2 />
          </TabPanel> */}
        </Grid>
      </Grid>
    </div>
  );
}
