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
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";

// Data Fetcher
import {
  useGetDistricts,
  useGetFunctionalityData,
  useGetCapacityData,
  useGetEligibilityData,
  useGetOptimalityData,
  useGetTemperatureData,
  useGetQuarters,
} from "../../../../helpers/apiDataFetcher";

// Import common component for ColdChain components
import ColdChain from "./components/ColdChain/index";

// Import common styles
import { useStyles } from "../styles";

// Variables
const date = new Date(),
  years = [],
  year = date.getFullYear();

// Get last 2 years from now
for (let i = year; i > year - 2; i--) {
  years.push(i);
}

const CARE_LEVELS = [
  "District Store",

  "Public HCIV",

  "Public HCII",

  "Public HCIII",

  "NGO Hospital",

  "Public Hospital",

  "NGO HCIII",
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`cold-chain-panel-keymetrics-tabpanel-${index}`}
      aria-labelledby={`cold-chain-panel-keymetrics-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `cold-chain-panel-keymetrics-tab-${index}`,
    "aria-controls": `cold-chain-panel-keymetrics-tabpanel-${index}`,
  };
}

const TabStyle = withStyles((theme) => ({
  root: {
    textTransform: "none",
    fontWeight: theme.typography.fontWeightBold,
    fontSize: 12,
    color: "#28354A",
    "&:hover": {
      backgroundColor: "#6F85FC",
      color: "white",
      opacity: 1,
    },
    "&$selected": {
      backgroundColor: "#6F85FC",
      color: "white",
      fontWeight: theme.typography.fontWeightMedium,
      fontSize: 12,
    },
  },
  selected: {},
}))((props) => <Tab {...props} />);

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}))(Tooltip);

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: "small",
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

export function ColdChainPanel() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [district, setDistrict] = useState("National");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Data Fetch
  // -----------------------------------------------------------------------
  // Fetch Districts
  // -----------------------------------------------------------------------
  const [{ districts }] = useGetDistricts(district);

  // Tab state variables.
  // Eligible Facilities

  const [eligibilityDistrict, setEligibilityDistrict] = useState("national");

  const [eligibilityStartQuarter, setEligibilityStartQuarter] = useState(
    `${year}01`
  );

  const [eligibilityEndQuarter, setEligibilityEndQuarter] = useState(
    `${year}04`
  );

  // Functionality

  const [functionalityDistrict, setFunctionalityDistrict] = useState(
    "national"
  );
  const [functionalityCareLevel, setFunctionalityCareLevel] = useState(
    CARE_LEVELS[0]
  );

  const [functionalityStartQuarter, setFunctionalityStartQuarter] = useState(
    `${year}01`
  );

  const [functionalityEndQuarter, setFunctionalityEndQuarter] = useState(
    `${year}04`
  );

  // Capacity
  const [capacityDistrict, setCapacityDistrict] = useState("national");
  const [capacityCareLevel, setCapacityCareLevel] = useState(CARE_LEVELS[0]);

  const [capacityStartQuarter, setCapacityStartQuarter] = useState(`${year}01`);

  const [capacityEndQuarter, setCapacityEndQuarter] = useState(`${year}04`);

  // Optimality

  const [optimalityDistrict, setOptimalityDistrict] = useState("national");
  const [optimalityCareLevel, setOptimalityCareLevel] = useState(
    CARE_LEVELS[0]
  );

  const [optimalityYear, setOptimalityYear] = useState(`${year}`);

  // Temperature Monitoring

  const [
    temperatureMonitoringDistrict,
    setTemperatureMonitoringDistrict,
  ] = useState("national");
  const [temperatureMonitoringYear, setTemperatureMonitoringYear] = useState(
    `${year}`
  );

  // -----------------------------------------------------------------------
  // Fetch Data
  // -----------------------------------------------------------------------

  const [
    {
      functionalityDataTableData,
      functionalityMetricsChartData,
      isLoadingFunctionalityData,
    },
  ] = useGetFunctionalityData(
    functionalityCareLevel,
    functionalityDistrict,
    functionalityStartQuarter,
    functionalityEndQuarter
  );

  const [
    { capacityDataTableData, capacityMetricsChartData, isLoadingCapacityData },
  ] = useGetCapacityData(
    capacityCareLevel,
    capacityDistrict,
    capacityStartQuarter,
    capacityEndQuarter
  );

  const [
    {
      eligibilityDataTableData,
      eligibilityMetricsChartData,
      isLoadingEligibilityData,
    },
  ] = useGetEligibilityData(
    eligibilityDistrict,
    eligibilityStartQuarter,
    eligibilityEndQuarter
  );

  const [
    {
      optimalityDataTableData,
      optimalityMetricsChartData,
      isLoadingOptimalityData,
    },
  ] = useGetOptimalityData(
    optimalityCareLevel,
    optimalityDistrict,
    optimalityYear
  );

  const [
    {
      temperatureMonitoringDataTableData,
      temperatureMonitoringMetricsChartData,
      temperatureMonitoringReportingRatesData,
      isLoadingTemperatureMonitoringData,
    },
  ] = useGetTemperatureData(
    temperatureMonitoringYear,
    temperatureMonitoringDistrict
  );

  const [{ quarters }] = useGetQuarters();

  // -----------------------------------------------------------------------
  // Eligibility  Filters
  // -----------------------------------------------------------------------

  const eligibilityStartQuarterFilter = years.map((year) => (
    <>
      <optgroup label={year}></optgroup>
      {quarters &&
        quarters
          .filter(
            (quarter) => quarter.value.substring(0, 4) === year.toString()
          )
          .map((quarter) => (
            <option value={quarter.value}>{quarter.name}</option>
          ))}
    </>
  ));

  const eligibilityEndQuarterFilter = years.map((year) => (
    <>
      <optgroup label={year}></optgroup>
      {quarters &&
        quarters
          .filter(
            (quarter) => quarter.value.substring(0, 4) === year.toString()
          )
          .map((quarter) => (
            <option value={quarter.value}>{quarter.name}</option>
          ))}
    </>
  ));

  const eligibilityDistrictFilter =
    districts &&
    districts.map((district) => (
      <MenuItem
        value={district.name}
        key={district.name}
        className={classes.liItems}
      >
        {district.name}
      </MenuItem>
    ));

  // -----------------------------------------------------------------------
  // Functionality  Filters
  // -----------------------------------------------------------------------
  const functionalityCareLevelFilter = CARE_LEVELS.map((careLevel) => (
    <MenuItem value={careLevel} key={careLevel} className={classes.liItems}>
      {careLevel}
    </MenuItem>
  ));

  const functionalityStartYearFilter = years.map((year) => (
    <>
      <optgroup label={year}></optgroup>
      {quarters &&
        quarters
          .filter(
            (quarter) => quarter.value.substring(0, 4) === year.toString()
          )
          .map((quarter) => (
            <option value={quarter.value}>{quarter.name}</option>
          ))}
    </>
  ));

  const functionalityEndYearFilter = years.map((year) => (
    <>
      <optgroup label={year}></optgroup>
      {quarters &&
        quarters
          .filter(
            (quarter) => quarter.value.substring(0, 4) === year.toString()
          )
          .map((quarter) => (
            <option value={quarter.value}>{quarter.name}</option>
          ))}
    </>
  ));

  const functionalityDistrictFilter =
    districts &&
    districts.map((district) => (
      <MenuItem
        value={district.name}
        key={district.name}
        className={classes.liItems}
      >
        {district.name}
      </MenuItem>
    ));

  // -----------------------------------------------------------------------
  // Capacity  Filters
  // -----------------------------------------------------------------------
  const capacityCareLevelFilter = CARE_LEVELS.map((careLevel) => (
    <MenuItem value={careLevel} key={careLevel} className={classes.liItems}>
      {careLevel}
    </MenuItem>
  ));

  const capacityStartQuarterFilter = years.map((year) => (
    <>
      <optgroup label={year}></optgroup>
      {quarters &&
        quarters
          .filter(
            (quarter) => quarter.value.substring(0, 4) === year.toString()
          )
          .map((quarter) => (
            <option value={quarter.value}>{quarter.name}</option>
          ))}
    </>
  ));

  const capacityEndQuarterFilter = years.map((year) => (
    <>
      <optgroup label={year}></optgroup>
      {quarters &&
        quarters
          .filter(
            (quarter) => quarter.value.substring(0, 4) === year.toString()
          )
          .map((quarter) => (
            <option value={quarter.value}>{quarter.name}</option>
          ))}
    </>
  ));

  const capacityDistrictFilter =
    districts &&
    districts.map((district) => (
      <MenuItem
        value={district.name}
        key={district.name}
        className={classes.liItems}
      >
        {district.name}
      </MenuItem>
    ));

  // -----------------------------------------------------------------------
  // Optimality  Filters
  // -----------------------------------------------------------------------
  const optimalityYearFilter = years.map((year) => (
    <MenuItem value={year} key={year} className={classes.liItems}>
      {year}
    </MenuItem>
  ));

  const optimalityDistrictFilter =
    districts &&
    districts.map((district) => (
      <MenuItem
        value={district.name}
        key={district.name}
        className={classes.liItems}
      >
        {district.name}
      </MenuItem>
    ));

  const optimalityCareLevelFilter = CARE_LEVELS.map((careLevel) => (
    <MenuItem value={careLevel} key={careLevel} className={classes.liItems}>
      {careLevel}
    </MenuItem>
  ));

  // -----------------------------------------------------------------------
  // Temperature Monitoring  Filters
  // -----------------------------------------------------------------------
  const temperatureMonitoringYearFilter = years.map((year) => (
    <MenuItem value={year} key={year} className={classes.liItems}>
      {year}
    </MenuItem>
  ));

  const temperatureMonitoringDistrictFilter =
    districts &&
    districts.map((district) => (
      <MenuItem
        value={district.name}
        key={district.name}
        className={classes.liItems}
      >
        {district.name}
      </MenuItem>
    ));
  //----------------------------------------------------------------------
  //  Data Object
  // ---------------------------------------------------------------------
  const data = {
    eligibility: {
      eligibilityDataTableData:
        eligibilityDataTableData && eligibilityDataTableData,
      eligibilityMetricsChartData:
        eligibilityMetricsChartData && eligibilityMetricsChartData,
      isLoading: isLoadingEligibilityData,
      district: eligibilityDistrict,
      startQuarter: eligibilityStartQuarter,
      endQuarter: eligibilityEndQuarter,
    },
    functionality: {
      functionalityDataTableData:
        functionalityDataTableData && functionalityDataTableData,
      functionalityMetricsChartData:
        functionalityMetricsChartData && functionalityMetricsChartData,
      isLoading: isLoadingFunctionalityData,
      district: functionalityDistrict,
      careLevel: functionalityCareLevel,
      startQuarter: functionalityStartQuarter,
      endQuarter: functionalityEndQuarter,
    },
    capacity: {
      capacityDataTableData: capacityDataTableData && capacityDataTableData,
      capacityMetricsChartData:
        capacityMetricsChartData && capacityMetricsChartData,
      isLoading: isLoadingCapacityData,
      district: capacityDistrict,
      careLevel: capacityCareLevel,
      startQuarter: capacityStartQuarter,
      endQuarter: capacityEndQuarter,
    },
    optimality: {
      optimalityDataTableData:
        optimalityDataTableData && optimalityDataTableData,
      optimalityMetricsChartData:
        optimalityMetricsChartData && optimalityMetricsChartData,
      isLoading: isLoadingOptimalityData,
      district: optimalityDistrict,
      careLevel: optimalityCareLevel,
      year: optimalityYear,
    },
    temperatureMonitoring: {
      temperatureMonitoringDataTableData:
        temperatureMonitoringDataTableData &&
        temperatureMonitoringDataTableData,
      temperatureMonitoringMetricsChartData:
        temperatureMonitoringMetricsChartData &&
        temperatureMonitoringMetricsChartData,
      temperatureMonitoringReportingRatesData:
        temperatureMonitoringReportingRatesData &&
        temperatureMonitoringReportingRatesData,
      district: temperatureMonitoringDistrict,
      year: temperatureMonitoringYear,
      isLoading: isLoadingTemperatureMonitoringData,
    },
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
                    style: { backgroundColor: "#6F85FC" },
                  }}
                >
                  <TabStyle
                    {...a11yProps(0)}
                    label={
                      <HtmlTooltip
                        title={
                          <React.Fragment>
                            <Typography color="inherit">
                              <b>
                                {
                                  "Actual number of facilities that carry out immunization services"
                                }
                              </b>
                            </Typography>
                          </React.Fragment>
                        }
                        enterDelay={500}
                        leaveDelay={200}
                      >
                        <span>Eligible Facilities</span>
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
                              <b>{"Text goes here"}</b>
                            </Typography>
                          </React.Fragment>
                        }
                        enterDelay={500}
                        leaveDelay={200}
                      >
                        <span>Functionality</span>
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
                              <b>{"Text goes here"}</b>
                            </Typography>
                          </React.Fragment>
                        }
                        enterDelay={500}
                        leaveDelay={200}
                      >
                        <span>Capacity (L)</span>
                      </HtmlTooltip>
                    }
                  />
                  <TabStyle
                    {...a11yProps(3)}
                    label={
                      <HtmlTooltip
                        title={
                          <React.Fragment>
                            <Typography color="inherit">
                              <b>{"Text goes here"}</b>
                            </Typography>
                          </React.Fragment>
                        }
                        enterDelay={500}
                        leaveDelay={200}
                      >
                        <span>Optimality</span>
                      </HtmlTooltip>
                    }
                  />
                  <TabStyle
                    {...a11yProps(4)}
                    label={
                      <HtmlTooltip
                        title={
                          <React.Fragment>
                            <Typography color="inherit">
                              <b>{"Text goes here"}</b>
                            </Typography>
                          </React.Fragment>
                        }
                        enterDelay={500}
                        leaveDelay={200}
                      >
                        <span>Temperature Monitoring</span>
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
                    className={classes.districtSelectMargin}
                    variant="outlined"
                    margin="dense"
                  >
                    <InputLabel
                      htmlFor="EF_startQuarter"
                      className={classes.selectorLables2}
                    >
                      Start Quarter
                    </InputLabel>
                    <Select
                      native
                      className={classes.selector_background}
                      id="EF_QuarterYear_selector"
                      value={eligibilityStartQuarter}
                      onChange={(event) =>
                        setEligibilityStartQuarter(event.target.value)
                      }
                      input={<BootstrapInput />}
                    >
                      {eligibilityStartQuarterFilter}
                    </Select>
                  </FormControl>
                  <FormControl
                    className={classes.districtSelectMargin}
                    variant="outlined"
                    margin="dense"
                  >
                    <InputLabel
                      htmlFor="EF_endQuarter"
                      className={classes.selectorLables2}
                    >
                      End Quarter
                    </InputLabel>
                    <Select
                      native
                      className={classes.selector_background}
                      id="EF_StartYear_selector"
                      value={eligibilityEndQuarter}
                      onChange={(event) =>
                        setEligibilityEndQuarter(event.target.value)
                      }
                      input={<BootstrapInput />}
                    >
                      {eligibilityEndQuarterFilter}
                    </Select>
                  </FormControl>
                  <FormControl
                    className={classes.districtSelectMargin}
                    variant="outlined"
                    margin="dense"
                  >
                    <InputLabel
                      htmlFor="District"
                      className={classes.selectorLables2}
                    >
                      District
                    </InputLabel>
                    <Select
                      className={classes.selector_background}
                      id="EF_district_selector"
                      value={eligibilityDistrict}
                      onChange={(event) =>
                        setEligibilityDistrict(event.target.value)
                      }
                      input={<BootstrapInput />}
                      renderValue={(selected) => "National"}
                    >
                      {eligibilityDistrictFilter}
                    </Select>
                  </FormControl>
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <div className={classes.filters2}>
                  <FormControl
                    className={classes.districtSelectMargin}
                    variant="outlined"
                    margin="dense"
                  >
                    <InputLabel
                      htmlFor="startYear"
                      className={classes.selectorLables2}
                    >
                      Start Quarter
                    </InputLabel>
                    <Select
                      native
                      className={classes.selector_background}
                      id="Func_startYear_selector"
                      value={functionalityStartQuarter}
                      onChange={(event) =>
                        setFunctionalityStartQuarter(event.target.value)
                      }
                      input={<BootstrapInput />}
                    >
                      {functionalityStartYearFilter}
                    </Select>
                  </FormControl>
                  <FormControl
                    className={classes.districtSelectMargin}
                    variant="outlined"
                    margin="dense"
                  >
                    <InputLabel
                      htmlFor="endYear"
                      className={classes.selectorLables2}
                    >
                      End Quarter
                    </InputLabel>
                    <Select
                      native
                      className={classes.selector_background}
                      id="Func_endYear_selector"
                      value={functionalityEndQuarter}
                      onChange={(event) =>
                        setFunctionalityEndQuarter(event.target.value)
                      }
                      input={<BootstrapInput />}
                    >
                      {functionalityEndYearFilter}
                    </Select>
                  </FormControl>
                  <FormControl
                    className={classes.formControl}
                    variant="outlined"
                    margin="dense"
                  >
                    <InputLabel
                      htmlFor="District"
                      className={classes.selectorLables}
                    >
                      District
                    </InputLabel>
                    <Select
                      renderValue={(selected) => "National"}
                      className={classes.selector_background}
                      value={functionalityDistrict}
                      onChange={(event) =>
                        setFunctionalityDistrict(event.target.value)
                      }
                      inputProps={{
                        name: "Func_district_selector",
                        id: "Func_district_selector",
                      }}
                    >
                      {functionalityDistrictFilter}
                    </Select>
                  </FormControl>
                  <FormControl
                    className={classes.formControl}
                    variant="outlined"
                    margin="dense"
                  >
                    <InputLabel
                      htmlFor="vaccine"
                      className={classes.selectorLables}
                    >
                      Level of Care
                    </InputLabel>
                    <Select
                      className={classes.selector_background}
                      value={functionalityCareLevel}
                      onChange={(event) =>
                        setFunctionalityCareLevel(event.target.value)
                      }
                      inputProps={{
                        name: "Func_careLevel_selector",
                        id: "Func_careLevel_selector",
                      }}
                    >
                      {functionalityCareLevelFilter}
                    </Select>
                  </FormControl>
                </div>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <div className={classes.filters2}>
                  <FormControl
                    className={classes.districtSelectMargin}
                    variant="outlined"
                    margin="dense"
                  >
                    <InputLabel
                      htmlFor="startQuarter"
                      className={classes.selectorLables2}
                    >
                      Start Quarter
                    </InputLabel>
                    <Select
                      native
                      className={classes.selector_background}
                      id="Cap_startQuarter_selector"
                      value={capacityStartQuarter}
                      onChange={(event) =>
                        setCapacityStartQuarter(event.target.value)
                      }
                      input={<BootstrapInput />}
                    >
                      {capacityStartQuarterFilter}
                    </Select>
                  </FormControl>
                  <FormControl
                    className={classes.districtSelectMargin}
                    variant="outlined"
                    margin="dense"
                  >
                    <InputLabel
                      htmlFor="endQuarter"
                      className={classes.selectorLables2}
                    >
                      End Quarter
                    </InputLabel>
                    <Select
                      native
                      className={classes.selector_background}
                      id="Cap_endQuarter_selector"
                      value={capacityEndQuarter}
                      onChange={(event) =>
                        setCapacityEndQuarter(event.target.value)
                      }
                      input={<BootstrapInput />}
                    >
                      {capacityEndQuarterFilter}
                    </Select>
                  </FormControl>
                  <FormControl
                    className={classes.formControl}
                    variant="outlined"
                    margin="dense"
                  >
                    <InputLabel
                      htmlFor="District"
                      className={classes.selectorLables}
                    >
                      District
                    </InputLabel>
                    <Select
                      renderValue={(selected) => "National"}
                      className={classes.selector_background}
                      value={capacityDistrict}
                      onChange={(event) =>
                        setCapacityDistrict(event.target.value)
                      }
                      inputProps={{
                        name: "Cap_district_selector",
                        id: "Cap_district_selector",
                      }}
                    >
                      {capacityDistrictFilter}
                    </Select>
                  </FormControl>
                  <FormControl
                    className={classes.formControl}
                    variant="outlined"
                    margin="dense"
                  >
                    <InputLabel
                      htmlFor="vaccine"
                      className={classes.selectorLables}
                    >
                      Level of Care
                    </InputLabel>
                    <Select
                      className={classes.selector_background}
                      value={capacityCareLevel}
                      onChange={(event) =>
                        setCapacityCareLevel(event.target.value)
                      }
                      inputProps={{
                        name: "Cap_careLevel_selector",
                        id: "Cap_careLevel_selector",
                      }}
                    >
                      {capacityCareLevelFilter}
                    </Select>
                  </FormControl>
                </div>
              </TabPanel>
              <TabPanel value={value} index={3}>
                <div className={classes.filters2}>
                  <FormControl
                    className={classes.formControl}
                    variant="outlined"
                    margin="dense"
                  >
                    <InputLabel
                      htmlFor="startYear"
                      className={classes.selectorLables}
                    >
                      Year
                    </InputLabel>
                    <Select
                      className={classes.selector_background}
                      value={optimalityYear}
                      onChange={(event) =>
                        setOptimalityYear(event.target.value)
                      }
                      inputProps={{
                        id: "OP_year_selector",
                        name: "OP_year_selector",
                      }}
                    >
                      {optimalityYearFilter}
                    </Select>
                  </FormControl>
                  <FormControl
                    className={classes.formControl}
                    variant="outlined"
                    margin="dense"
                  >
                    <InputLabel
                      htmlFor="District"
                      className={classes.selectorLables}
                    >
                      District
                    </InputLabel>
                    <Select
                      renderValue={(selected) => "National"}
                      className={classes.selector_background}
                      value={optimalityDistrict}
                      onChange={(event) =>
                        setOptimalityDistrict(event.target.value)
                      }
                      inputProps={{
                        name: "Cap_district_selector",
                        id: "Cap_district_selector",
                      }}
                    >
                      {optimalityDistrictFilter}
                    </Select>
                  </FormControl>
                  <FormControl
                    className={classes.formControl}
                    variant="outlined"
                    margin="dense"
                  >
                    <InputLabel
                      htmlFor="vaccine"
                      className={classes.selectorLables}
                    >
                      Level of Care
                    </InputLabel>
                    <Select
                      className={classes.selector_background}
                      value={optimalityCareLevel}
                      onChange={(event) =>
                        setOptimalityCareLevel(event.target.value)
                      }
                      inputProps={{
                        name: "Cap_careLevel_selector",
                        id: "Cap_careLevel_selector",
                      }}
                    >
                      {optimalityCareLevelFilter}
                    </Select>
                  </FormControl>
                </div>
              </TabPanel>
              <TabPanel value={value} index={4}>
                <div className={classes.filters2}>
                  <FormControl
                    className={classes.formControl}
                    variant="outlined"
                    margin="dense"
                  >
                    <InputLabel
                      htmlFor="year"
                      className={classes.selectorLables}
                    >
                      Year
                    </InputLabel>
                    <Select
                      className={classes.selector_background}
                      value={temperatureMonitoringYear}
                      onChange={(event) =>
                        setTemperatureMonitoringYear(event.target.value)
                      }
                      inputProps={{
                        id: "TM_year_selector",
                        name: "TM_year_selector",
                      }}
                    >
                      {temperatureMonitoringYearFilter}
                    </Select>
                  </FormControl>
                  <FormControl
                    className={classes.formControl}
                    variant="outlined"
                    margin="dense"
                  >
                    <InputLabel
                      htmlFor="District"
                      className={classes.selectorLables}
                    >
                      District
                    </InputLabel>
                    <Select
                      renderValue={(selected) => "National"}
                      className={classes.selector_background}
                      value={temperatureMonitoringDistrict}
                      onChange={(event) =>
                        setTemperatureMonitoringDistrict(event.target.value)
                      }
                      inputProps={{
                        name: "TM_district_selector",
                        id: "TM_district_selector",
                      }}
                    >
                      {temperatureMonitoringDistrictFilter}
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
            <ColdChain data={data.eligibility} parentTab={"eligibility"} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ColdChain data={data.functionality} parentTab={"functionality"} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ColdChain data={data.capacity} parentTab={"capacity"} />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <ColdChain data={data.optimality} parentTab={"optimality"} />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <ColdChain
              data={data.temperatureMonitoring}
              parentTab={"temperatureMonitoring"}
            />
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  );
}
