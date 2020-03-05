import React, { useState } from "react";

// Material components
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
  useGetQuarters
} from "../../../../helpers/apiDataFetcher";

// Import common component for ColdChain components
import EligibilityFunctionalityCapacity from "./components/EligibilityFunctionalityCapacity/index";

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

const HALF_YEARS = [1, 2];

const CARE_LEVELS = [
  "District Store",

  "Public HCIV",

  "Public HCII",

  "Public HCIII",

  "NGO Hospital",

  "Public Hospital",

  "NGO HCIII"
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
    "aria-controls": `cold-chain-panel-keymetrics-tabpanel-${index}`
  };
}

const TabStyle = withStyles(theme => ({
  root: {
    textTransform: "none",
    fontWeight: theme.typography.fontWeightBold,
    fontSize: "medium",
    color: "#28354A",
    "&:hover": {
      backgroundColor: "#6F85FC",
      color: "white",
      opacity: 1
    },
    "&$selected": {
      backgroundColor: "#6F85FC",
      color: "white",
      fontWeight: theme.typography.fontWeightMedium,
      fontSize: "medium"
    }
  },
  selected: {}
}))(props => <Tab {...props} />);

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9"
  }
}))(Tooltip);

const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: "medium",
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
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
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

  const [eligibilityCareLevel, setEligiblityCareLevel] = useState(
    CARE_LEVELS[0]
  );

  const [eligibilityStartQuarter, setEligibilityStartQuarter] = useState(
    `${year - 1}_1`
  );

  const [eligibilityEndQuarter, setEligibilityEndQuarter] = useState(
    `${year - 1}_4`
  );

  // Functionality

  const [functionalityDistrict, setFunctionalityDistrict] = useState(
    "national"
  );
  const [functionalityCareLevel, setFunctionalityCareLevel] = useState(
    CARE_LEVELS[0]
  );

  const [functionalityStartYear, setFunctionalityStartYear] = useState(
    `${year - 1}_${HALF_YEARS[0]}`
  );

  const [functionalityEndYear, setFunctionalityEndYear] = useState(
    `${year - 1}_${HALF_YEARS[1]}`
  );

  // Capacity
  const [capacityDistrict, setCapacityDistrict] = useState("national");
  const [capacityCareLevel, setCapacityCareLevel] = useState(CARE_LEVELS[0]);

  const [capacityStartYear, setCapacityStartYear] = useState(
    `${year - 1}_${HALF_YEARS[0]}`
  );

  const [capacityEndYear, setCapacityEndYear] = useState(
    `${year - 1}_${HALF_YEARS[1]}`
  );

  // Eligibility

  // -----------------------------------------------------------------------
  // Fetch Data
  // -----------------------------------------------------------------------

  const [
    {
      functionalityDataTableData,
      functionalityMetricsChartData,
      isLoadingFunctionalityData
    }
  ] = useGetFunctionalityData(
    functionalityCareLevel,
    functionalityDistrict,
    functionalityStartYear,
    functionalityEndYear
  );

  const [
    { capacityDataTableData, capacityMetricsChartData, isLoadingCapacityData }
  ] = useGetCapacityData(
    capacityCareLevel,
    capacityDistrict,
    capacityStartYear,
    capacityEndYear
  );

  const [
    {
      eligibilityDataTableData,
      eligibilityMetricsChartData,
      isLoadingEligibilityData
    }
  ] = useGetEligibilityData(
    capacityCareLevel,
    capacityDistrict,
    capacityStartYear,
    capacityEndYear
  );

  const [{ quarters }] = useGetQuarters();

  // -----------------------------------------------------------------------
  // Eligibility  Filters
  // -----------------------------------------------------------------------
  const eligibilityCareLevelFilter = CARE_LEVELS.map(careLevel => (
    <MenuItem value={careLevel} key={careLevel}>
      {careLevel}
    </MenuItem>
  ));

  const eligibilityStartQuarterFilter = years.map(year => (
    <>
      <optgroup label={year}></optgroup>
      {quarters &&
        quarters
          .filter(quarter => quarter.value.substring(0, 4) === year.toString())
          .map(quarter => (
            <option value={quarter.value}>{quarter.name}</option>
          ))}
    </>
  ));

  const eligibilityEndQuarterFilter = years.map(year => (
    <>
      <optgroup label={year}></optgroup>
      {quarters &&
        quarters
          .filter(quarter => quarter.value.substring(0, 4) === year.toString())
          .map(quarter => (
            <option value={quarter.value}>{quarter.name}</option>
          ))}
      ))
    </>
  ));

  const eligibilityDistrictFilter =
    districts &&
    districts.map(district => (
      <MenuItem
        value={district.name}
        key={district.name}
        style={{ fontSize: "large" }}
      >
        {district.name}
      </MenuItem>
    ));

  // -----------------------------------------------------------------------
  // Functionality  Filters
  // -----------------------------------------------------------------------
  const functionalityCareLevelFilter = CARE_LEVELS.map(careLevel => (
    <MenuItem value={careLevel} key={careLevel}>
      {careLevel}
    </MenuItem>
  ));

  const functionalityStartYearFilter = years.map(year => (
    <>
      <optgroup label={year}></optgroup>
      {quarters &&
        quarters
          .filter(quarter => quarter.value.substring(0, 4) === year.toString())
          .map(quarter => (
            <option value={quarter.value}>{quarter.name}</option>
          ))}
    </>
  ));

  const functionalityEndYearFilter = years.map(year => (
    <>
      <optgroup label={year}></optgroup>
      {quarters &&
        quarters
          .filter(quarter => quarter.value.substring(0, 4) === year.toString())
          .map(quarter => (
            <option value={quarter.value}>{quarter.name}</option>
          ))}
      ))
    </>
  ));

  const functionalityDistrictFilter =
    districts &&
    districts.map(district => (
      <MenuItem
        value={district.name}
        key={district.name}
        style={{ fontSize: "large" }}
      >
        {district.name}
      </MenuItem>
    ));

  // -----------------------------------------------------------------------
  // Capacity  Filters
  // -----------------------------------------------------------------------
  const capacityCareLevelFilter = CARE_LEVELS.map(careLevel => (
    <MenuItem value={careLevel} key={careLevel}>
      {careLevel}
    </MenuItem>
  ));

  const capacityStartYearFilter = years
    .filter(year => year !== 2020)
    .map(year => (
      <>
        <optgroup label={year}></optgroup>
        {HALF_YEARS.map(halfYear => (
          <option value={`${year}_${halfYear}`}>
            {`${year} - Half ${halfYear}`}
          </option>
        ))}
      </>
    ));

  const capacityEndYearFilter = years
    .filter(year => year !== 2020)
    .map(year => (
      <>
        <optgroup label={year}></optgroup>
        {HALF_YEARS.map(halfYear => (
          <option value={`${year}_${halfYear}`}>
            {`${year} - Half ${halfYear}`}
          </option>
        ))}
      </>
    ));

  const capacityDistrictFilter =
    districts &&
    districts.map(district => (
      <MenuItem
        value={district.name}
        key={district.name}
        style={{ fontSize: "large" }}
      >
        {district.name}
      </MenuItem>
    ));

  const data = {
    eligibility: {
      eligibilityDataTableData:
        eligibilityDataTableData && eligibilityDataTableData,
      eligibilityMetricsChartData:
        eligibilityMetricsChartData && eligibilityMetricsChartData,
      isLoading: isLoadingEligibilityData,
      district: eligibilityDistrict,
      careLevel: eligibilityCareLevel,
      startQuarter: eligibilityStartQuarter,
      endQuarter: eligibilityEndQuarter
    },
    functionality: {
      functionalityDataTableData:
        functionalityDataTableData && functionalityDataTableData,
      functionalityMetricsChartData:
        functionalityMetricsChartData && functionalityMetricsChartData,
      isLoading: isLoadingFunctionalityData,
      district: functionalityDistrict,
      careLevel: functionalityCareLevel,
      startYearHalf: functionalityStartYear,
      endYearHalf: functionalityEndYear
    },
    capacity: {
      capacityDataTableData: capacityDataTableData && capacityDataTableData,
      capacityMetricsChartData:
        capacityMetricsChartData && capacityMetricsChartData,
      isLoading: isLoadingCapacityData,
      district: capacityDistrict,
      careLevel: capacityCareLevel,
      startYearHalf: capacityStartYear,
      endYearHalf: capacityEndYear
    },
    optimality: {},
    temperatureMonitoring: {}
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
      <Grid container spacing={3}>
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
                      style: { backgroundColor: "#6F85FC" }
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
                      className={classes.formControl}
                      variant="outlined"
                      margin="dense"
                    >
                      <InputLabel
                        htmlFor="startYears"
                        className={classes.selectorLables}
                      >
                        Start Year
                      </InputLabel>
                      <Select
                        className={classes.selector_background}
                        value={eligibilityStartQuarter}
                        onChange={event =>
                          setEligibilityStartQuarter(event.target.value)
                        }
                        inputProps={{
                          name: "EF_StartYear_selector",
                          id: "EF_StartYear_selector"
                        }}
                      >
                        {eligibilityStartQuarterFilter}
                      </Select>
                    </FormControl>
                    <FormControl
                      className={classes.formControl}
                      variant="outlined"
                      margin="dense"
                    >
                      <InputLabel
                        htmlFor="startYears"
                        className={classes.selectorLables}
                      >
                        End Year
                      </InputLabel>
                      <Select
                        className={classes.selector_background}
                        value={eligibilityEndQuarter}
                        onChange={event =>
                          setEligibilityEndQuarter(event.target.value)
                        }
                        inputProps={{
                          name: "EF_StartYear_selector",
                          id: "EF_StartYear_selector"
                        }}
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
                        value={eligibilityDistrict}
                        onChange={event =>
                          setEligibilityDistrict(event.target.value)
                        }
                        inputProps={{
                          name: "EF_district_selector",
                          id: "EF_district_selector"
                        }}
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
                        Start Year
                      </InputLabel>
                      <Select
                        native
                        className={classes.selector_background}
                        id="Func_startYear_selector"
                        value={functionalityStartYear}
                        onChange={event =>
                          setFunctionalityStartYear(event.target.value)
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
                        End Year
                      </InputLabel>
                      <Select
                        native
                        className={classes.selector_background}
                        id="Func_endYear_selector"
                        value={functionalityEndYear}
                        onChange={event =>
                          setFunctionalityEndYear(event.target.value)
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
                        className={classes.selector_background}
                        value={functionalityDistrict}
                        onChange={event =>
                          setFunctionalityDistrict(event.target.value)
                        }
                        inputProps={{
                          name: "Func_district_selector",
                          id: "Func_district_selector"
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
                        onChange={event =>
                          setFunctionalityCareLevel(event.target.value)
                        }
                        inputProps={{
                          name: "Func_careLevel_selector",
                          id: "Func_careLevel_selector"
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
                        htmlFor="startYear"
                        className={classes.selectorLables2}
                      >
                        Start Year
                      </InputLabel>
                      <Select
                        native
                        className={classes.selector_background}
                        id="Cap_startYear_selector"
                        value={capacityStartYear}
                        onChange={event =>
                          setCapacityStartYear(event.target.value)
                        }
                        input={<BootstrapInput />}
                      >
                        {capacityStartYearFilter}
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
                        End Year
                      </InputLabel>
                      <Select
                        native
                        className={classes.selector_background}
                        id="Cap_endYear_selector"
                        value={capacityEndYear}
                        onChange={event =>
                          setCapacityEndYear(event.target.value)
                        }
                        input={<BootstrapInput />}
                      >
                        {capacityEndYearFilter}
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
                        className={classes.selector_background}
                        value={capacityDistrict}
                        onChange={event =>
                          setCapacityDistrict(event.target.value)
                        }
                        inputProps={{
                          name: "Cap_district_selector",
                          id: "Cap_district_selector"
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
                        onChange={event =>
                          setCapacityCareLevel(event.target.value)
                        }
                        inputProps={{
                          name: "Cap_careLevel_selector",
                          id: "Cap_careLevel_selector"
                        }}
                      >
                        {capacityCareLevelFilter}
                      </Select>
                    </FormControl>
                  </div>
                </TabPanel>
                <TabPanel value={value} index={3}>
                  Three
                </TabPanel>
                <TabPanel value={value} index={4}>
                  Four
                </TabPanel>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TabPanel value={value} index={0}>
            <EligibilityFunctionalityCapacity
              data={data.eligibility}
              parentTab={"eligibility"}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <EligibilityFunctionalityCapacity
              data={data.functionality}
              parentTab={"functionality"}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <EligibilityFunctionalityCapacity
              data={data.capacity}
              parentTab={"capacity"}
            />
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  );
}
