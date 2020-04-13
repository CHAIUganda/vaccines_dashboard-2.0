import React, { useState } from "react";

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
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import MenuItem from "@material-ui/core/MenuItem";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";

// Import Performance Management components.

import ActivityStatusCompletion from "./components/ActivityStatusCompletion/index";
import FundingStatus from "./components/FundingStatus/index";

// Import common styles
import { useStyles } from "../styles";

// Data Fetchers
// import { useGetQuarters } from "../../../../helpers/apiDataFetcher";

// Get current date
const date = new Date();

const generate_quarters = () => {
  let quarters = [];

  let years = [];
  let year = date.getFullYear(); // Current year
  let quarters_list = [
    ["01", "Q1"],
    ["02", "Q2"],
    ["03", "Q3"],
    ["04", "Q4"],
  ];

  // Get workplan time range (18 months, ~ 2 years)
  for (let i = year + 1; i > year - 1; i--) {
    years.push(i);
  }

  for (let i = 0; i <= years.length - 1; i++) {
    for (let j = 0; j <= quarters_list.length - 1; j++) {
      quarters.push({
        name: `${years[i] + " - " + quarters_list[j][1]} `,
        value: `${years[i] + quarters_list[j][0]}`,
      });
    }
  }

  return quarters;
};

const ORGS = [
  "AFENET",

  "CDC",

  "CHAI",

  "GoU",

  "JSI",

  "HSS2/GAVI",

  "PATH",

  "UNICEF",

  "PBF/Gavi",

  "WHO",

  "WHO(PEP 2019)",
];

const ISC = [
  "Advocacy, Communication and Social Mobilization",

  "Monitoring, Supervision and Evaluation",

  "Programme Management - General",

  "Programme Management - Financing",

  "Service Delivery and Training",

  "Surveillance",

  "Vaccines, Logistics, Equipment and Infrastructure",
];

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
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const QUARTERS = generate_quarters();

  // Get current year start quarter
  const currentYearStartQuarter = QUARTERS.filter(
    (p) => p.value === `${date.getFullYear()}01`
  ).map((a) => a.value);

  // -----------------------------------------------------------------------
  //  Activity Completion Status State
  // -----------------------------------------------------------------------

  const [
    activityCompletionStatusActiveQuarter,
    setActivityCompletionStatusActiveQuarter,
  ] = useState(currentYearStartQuarter);

  const [
    activityCompletionStatusOrg,
    setActivityCompletionStatusOrg,
  ] = useState(ORGS[1]);

  const [
    activityCompletionStatusISC,
    setActivityCompletionStatusISC,
  ] = useState(ISC[0]);

  const [
    activityCompletionStatusFundingStatus,
    setActivitiyCompletionStatusFundingStatus,
  ] = useState(false);

  // -----------------------------------------------------------------------
  //  Funding Status State
  // -----------------------------------------------------------------------
  const [fundingStatusActiveQuarter, setFundingStatusActiveQuarter] = useState(
    currentYearStartQuarter
  );

  const [fundingStatusOrg, setFundingStatusOrg] = useState(ORGS[1]);

  const [fundingStatusISC, setFundingStatusISC] = useState(ISC[0]);

  const [fundingStatusStatus, setFundingStatusStatus] = useState(false);

  // console.log(
  //   `currentYearStartQuarter: ${activityCompletionStatusActiveQuarter} | activityCompletionStatusOrg: ${activityCompletionStatusOrg} | activityCompletionStatusISC: ${activityCompletionStatusISC} | activityCompletionStatusFundingStatus: ${activityCompletionStatusFundingStatus}`
  // );

  // console.log(
  //   `fundingStatusActiveQuarter: ${fundingStatusActiveQuarter} | fundingStatusOrg: ${fundingStatusOrg} | fundingStatusISC: ${fundingStatusISC} | fundingStatusStatus: ${fundingStatusStatus}`
  // );
  // -----------------------------------------------------------------------
  //  Activity Completion Status Filters
  // -----------------------------------------------------------------------

  const activityCompletionStatusActiveQuarterFilter = QUARTERS.map(
    (quarter) => (
      <MenuItem
        value={quarter.value}
        key={quarter.value}
        className={classes.liItems}
      >
        {quarter.name}
      </MenuItem>
    )
  );

  const activityCompletionStatusOrgFilter = ORGS.map((org) => (
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

  const fundingStatusActiveQuarterFilter = QUARTERS.map((quarter) => (
    <MenuItem
      value={quarter.value}
      key={quarter.value}
      className={classes.liItems}
    >
      {quarter.name}
    </MenuItem>
  ));

  const fundingStatusOrgFilter = ORGS.map((org) => (
    <MenuItem value={org} key={org} className={classes.liItems}>
      {org}
    </MenuItem>
  ));

  const fundingStatusISCFilter = ISC.map((isc) => (
    <MenuItem value={isc} key={isc} className={classes.liItems}>
      {isc}
    </MenuItem>
  ));

  const data = {
    activityStatusCompletion: {},
    fundingStatus: {},
  };

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
        <Paper className={classes.paper} elevation={0}>
          <Grid container spacing={3}>
            <Grid item lg={6} md={6} xl={6} xs={12}>
              <AppBar
                position="static"
                className={classes.appBar}
                elevation={0}
              >
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
                    {...a11yProps(1)}
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
                      htmlFor="ACSQuarter"
                      className={classes.selectorLables}
                    >
                      Active Quarter
                    </InputLabel>
                    <Select
                      className={classes.selector_background}
                      value={activityCompletionStatusActiveQuarter}
                      onChange={(event) =>
                        setActivityCompletionStatusActiveQuarter(
                          event.target.value
                        )
                      }
                      inputProps={{
                        name: "ACSQuarter_selector",
                        id: "ACSQuarter_selector",
                      }}
                    >
                      {activityCompletionStatusActiveQuarterFilter}
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
                    >
                      Organization
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
                    component="fieldset"
                    className={classes.swithFormControl}
                  >
                    <FormLabel
                      component="legend"
                      className={classes.switchLable}
                    >
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
                        value={activityCompletionStatusFundingStatus}
                        control={
                          <CustomSwitch
                            size="small"
                            checked={activityCompletionStatusFundingStatus}
                            onChange={() =>
                              setActivitiyCompletionStatusFundingStatus(
                                !activityCompletionStatusFundingStatus
                              )
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
                    >
                      {activityCompletionStatusISCFilter}
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
                      htmlFor="FSQuarter"
                      className={classes.selectorLables}
                    >
                      Active Quarter
                    </InputLabel>
                    <Select
                      className={classes.selector_background}
                      value={fundingStatusActiveQuarter}
                      onChange={(event) =>
                        setFundingStatusActiveQuarter(event.target.value)
                      }
                      inputProps={{
                        name: "FSQuarter_selector",
                        id: "FSQuarter_selector",
                      }}
                    >
                      {fundingStatusActiveQuarterFilter}
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
                    >
                      Organization
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
                    className={classes.swithFormControl}
                  >
                    <FormLabel
                      component="legend"
                      className={classes.switchLable}
                    >
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
                    >
                      {fundingStatusISCFilter}
                    </Select>
                  </FormControl>
                </div>
              </TabPanel>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TabPanel value={value} index={0}>
            <ActivityStatusCompletion data={data.activityStatusCompletion} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <FundingStatus data={data.fundingStatus} />
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  );
}
