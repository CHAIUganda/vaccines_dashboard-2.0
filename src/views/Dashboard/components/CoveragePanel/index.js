import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

// Bring in the global context
import { GlobalContext } from "../../../../context/GlobalState";

// Bring in our cold chain context
import { CoverageContext } from "../../../../context/Coverage/CoverageState";

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
import Chip from "@material-ui/core/Chip";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";

// Import coverage components
import Coverage from "./components/Coverage/index";

// Import common styles
import { useStyles } from "../styles";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`coverage-panel-keymetrics-tabpanel-${index}`}
      aria-labelledby={`coverage-panel-keymetrics-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `coverage-panel-keymetrics-tab-${index}`,
    "aria-controls": `coverage-panel-keymetrics-tabpanel-${index}`,
  };
}

const TabStyle = withStyles((theme) => ({
  root: {
    textTransform: "none",
    fontWeight: theme.typography.fontWeightBold,
    fontSize: 12,
    color: "#28354A",
    "&:hover": {
      backgroundColor: "#F8E658",
      color: "#28354A",
      opacity: 1,
    },
    "&$selected": {
      backgroundColor: "#F8E658",
      color: "#28354A",
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

export function CoveragePanel() {
  // Extract required global state variables
  const {
    districts,
    vaccines,
    getDistricts,
    getVaccines,
    currentYear,
  } = useContext(GlobalContext);

  // Extract required coverage state variables
  const {
    defaultVaccine,
    district,
    defaultDose,
    doses,
    coverageYears,
    getCoverageByMonthData,
    getCoverageByYearData,
    getDropoutRateData,
    getRedCategoryData,
  } = useContext(CoverageContext);

  useEffect(() => {
    getDistricts();
    getVaccines();
    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classes = useStyles();
  const [value, setValue] = useState(0);

  const VACCINES = [defaultVaccine, ...vaccines];

  // -----------------------------------------------------------------------
  // Coverage By Month state data
  // -----------------------------------------------------------------------
  const [coverageByMonthStartYear, setCoverageByMonthStartYear] = useState(
    currentYear
  );

  const [coverageByMonthVaccine, setCoverageByMonthVaccine] = useState(
    defaultVaccine
  );

  const [coverageByMonthDose, setCoverageByMonthDose] = useState(defaultDose);

  const [coverageByMonthDistrict, setCoverageByMonthDistrict] = useState(
    district
  );

  const [
    coverageByMonthDistrictChipData,
    setCoverageByMonthDistrictChipData,
  ] = useState(coverageByMonthDistrict);

  useEffect(() => {
    getCoverageByMonthData(
      currentYear,
      coverageByMonthStartYear,
      coverageByMonthDose,
      coverageByMonthVaccine,
      coverageByMonthDistrict
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    coverageByMonthStartYear,
    coverageByMonthDose,
    coverageByMonthVaccine,
    coverageByMonthDistrict,
  ]);

  // -----------------------------------------------------------------------
  // Coverage By Year state data
  // -----------------------------------------------------------------------

  const [coverageByYearStartYear, setCoverageByYearStartYear] = useState(
    currentYear
  );

  const [coverageByYearEndYear, setCoverageByYearEndYear] = useState(
    currentYear
  );

  const [coverageByYearVaccine, setCoverageByYearVaccine] = useState(
    defaultVaccine
  );

  const [coverageByYearDistrict, setCoverageByYearDistrict] = useState(
    district
  );

  const [
    coverageByYearDistrictChipData,
    setCoverageByYearDistrictChipData,
  ] = useState(coverageByYearDistrict);

  useEffect(() => {
    getCoverageByYearData(
      coverageByYearEndYear,
      coverageByYearStartYear,
      defaultDose,
      coverageByYearVaccine,
      coverageByYearDistrict
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    coverageByYearStartYear,
    coverageByYearEndYear,
    coverageByYearVaccine,
    coverageByYearDistrict,
  ]);

  // -----------------------------------------------------------------------
  // Dropout Rate state data
  // -----------------------------------------------------------------------

  const [coverageDropoutRateYear, setCoverageDropoutrateYear] = useState(
    currentYear
  );
  const [coverageDropoutRateVaccine, setCoverageDropoutrateVaccine] = useState(
    defaultVaccine
  );

  const [
    coverageDropoutRateDistrict,
    setCoverageDropoutrateDistrict,
  ] = useState(district);

  const [
    coverageDropoutrateDistrictChipData,
    setCoverageDropoutrateDistrictChipData,
  ] = useState(coverageDropoutRateDistrict);

  useEffect(() => {
    getDropoutRateData(
      currentYear,
      coverageDropoutRateYear,
      defaultDose,
      coverageDropoutRateVaccine,
      coverageDropoutRateDistrict
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    coverageDropoutRateYear,
    defaultDose,
    coverageDropoutRateVaccine,
    coverageDropoutRateDistrict,
  ]);

  // -----------------------------------------------------------------------
  // Redcategory state data
  // -----------------------------------------------------------------------
  const [coverageRedCategoryYear, setCoverageRedCategoryYear] = useState(
    currentYear
  );

  const [coverageRedCategoryVaccine, setCoverageRedCategoryVaccine] = useState(
    "PENTA"
  );

  useEffect(() => {
    getRedCategoryData(
      currentYear,
      coverageRedCategoryYear,
      defaultDose,
      coverageRedCategoryVaccine,
      district
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coverageRedCategoryVaccine, coverageRedCategoryYear]);

  // -----------------------------------------------------------------------
  // Coverage By Month Filters
  // -----------------------------------------------------------------------
  const coverageByMonthYearFilter = coverageYears.map((year) => (
    <MenuItem value={year} key={year} className={classes.liItems}>
      {year}
    </MenuItem>
  ));

  const coverageByMonthVaccinesFilter = VACCINES.map((vaccine) => (
    <MenuItem value={vaccine} key={vaccine} className={classes.liItems}>
      {vaccine}
    </MenuItem>
  ));

  const coverageByMonthDoseFilter = doses.map((dose) => (
    <MenuItem value={dose} key={dose} className={classes.liItems}>
      {dose}
    </MenuItem>
  ));

  const coverageByMonthDistrictFilter = districts.map((district) => (
    <MenuItem
      value={district.name}
      key={district.name}
      className={classes.liItems}
    >
      {district.name}
    </MenuItem>
  ));

  // -----------------------------------------------------------------------
  // Coverage By Year Filters
  // -----------------------------------------------------------------------

  const coverageByYearStartYearFilter = coverageYears.map((year) => (
    <MenuItem value={year} key={year} className={classes.liItems}>
      {year}
    </MenuItem>
  ));

  const coverageByYearEndYearFilter = coverageYears.map((year) => (
    <MenuItem value={year} key={year} className={classes.liItems}>
      {year}
    </MenuItem>
  ));

  const coverageByYearVaccinesFilter = VACCINES.map((vaccine) => (
    <MenuItem value={vaccine} key={vaccine} className={classes.liItems}>
      {vaccine}
    </MenuItem>
  ));

  const coverageByYearDistrictFilter = districts.map((district) => (
    <MenuItem
      value={district.name}
      key={district.name}
      className={classes.liItems}
    >
      {district.name}
    </MenuItem>
  ));

  // -----------------------------------------------------------------------
  // Dropout Rate filters
  // -----------------------------------------------------------------------

  const coverageDropoutRateYearFilter = coverageYears.map((year) => (
    <MenuItem value={year} key={year} className={classes.liItems}>
      {year}
    </MenuItem>
  ));

  const coverageDropoutRateVaccinesFilter = VACCINES.map((vaccine) => (
    <MenuItem value={vaccine} key={vaccine} className={classes.liItems}>
      {vaccine}
    </MenuItem>
  ));

  const coverageDropoutRateDistrictFilter = districts.map((district) => (
    <MenuItem
      value={district.name}
      key={district.name}
      className={classes.liItems}
    >
      {district.name}
    </MenuItem>
  ));

  // -----------------------------------------------------------------------
  // Redcategory filters
  // -----------------------------------------------------------------------

  const redcategoryYearFilter = coverageYears.map((year) => (
    <MenuItem value={year} key={year} className={classes.liItems}>
      {year}
    </MenuItem>
  ));

  const redcategoryVaccinesFilter = VACCINES.map((vaccine) => (
    <MenuItem value={vaccine} key={vaccine} className={classes.liItems}>
      {vaccine}
    </MenuItem>
  ));

  // -----------------------------------------------------------------------

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeDistrict = (event, tab) => {
    if (tab === "Coverage (By Month)") {
      setCoverageByMonthDistrict(event.target.value);
      setCoverageByMonthDistrictChipData(event.target.value);
    } else if (tab === "Coverage (By Year)") {
      setCoverageByYearDistrict(event.target.value);
      setCoverageByYearDistrictChipData(event.target.value);
    } else {
      setCoverageDropoutrateDistrict(event.target.value);
      setCoverageDropoutrateDistrictChipData(event.target.value);
    }
  };

  // Chip stuff
  const handleDeleteChip = (chipToDelete, tab) => () => {
    if (tab === "Coverage (By Month)") {
      setCoverageByMonthDistrict(
        coverageByMonthDistrict.filter((chip) => chip !== chipToDelete)
      );
      setCoverageByMonthDistrictChipData(
        coverageByMonthDistrict.filter((chip) => chip !== chipToDelete)
      );
    } else if (tab === "Coverage (By Year)") {
      setCoverageByYearDistrict(
        coverageByYearDistrict.filter((chip) => chip !== chipToDelete)
      );
      setCoverageByYearDistrictChipData(
        coverageByYearDistrict.filter((chip) => chip !== chipToDelete)
      );
    } else {
      setCoverageDropoutrateDistrict(
        coverageDropoutRateDistrict.filter((chip) => chip !== chipToDelete)
      );
      setCoverageDropoutrateDistrictChipData(
        coverageDropoutRateDistrict.filter((chip) => chip !== chipToDelete)
      );
    }
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
                  aria-label="Coverage Key metrics"
                  className={classes.tabs}
                  TabIndicatorProps={{
                    style: { backgroundColor: "#F8E658" },
                  }}
                >
                  <TabStyle
                    {...a11yProps(0)}
                    label={
                      <HtmlTooltip
                        title={
                          <React.Fragment>
                            <Typography color="inherit">
                              <b className={classes.toolTip}>
                                {
                                  "Actual number of children immunized / projected number to be immunized expressed as a percentage"
                                }
                              </b>
                            </Typography>
                          </React.Fragment>
                        }
                        enterDelay={500}
                        leaveDelay={200}
                      >
                        <span>Coverage (By Month)</span>
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
                              <b className={classes.toolTip}>
                                {
                                  "Actual number of children immunized / projected number to be immunized expressed as a percentage"
                                }
                              </b>
                            </Typography>
                          </React.Fragment>
                        }
                        enterDelay={500}
                        leaveDelay={200}
                      >
                        <span>Coverage (By Year)</span>
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
                              <b className={classes.toolTip}>
                                {
                                  "Percentage of children that did not receive the last dose of scheduled vaccines (E.g total DPT3 = total DPT1 numbers)"
                                }
                              </b>
                            </Typography>
                          </React.Fragment>
                        }
                        enterDelay={500}
                        leaveDelay={200}
                      >
                        <span>Dropout Rate</span>
                      </HtmlTooltip>
                    }
                  />
                  <TabStyle {...a11yProps(3)} label="Red Categorization" />
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
                      Year
                    </InputLabel>
                    <Select
                      className={classes.selector_background}
                      value={coverageByMonthStartYear}
                      onChange={(event) =>
                        setCoverageByMonthStartYear(event.target.value)
                      }
                      inputProps={{
                        name: "CM_year_selector",
                        id: "CM_year_selector",
                      }}
                    >
                      {coverageByMonthYearFilter}
                    </Select>
                  </FormControl>
                  <FormControl
                    className={classes.formControl}
                    variant="outlined"
                    margin="dense"
                  >
                    <InputLabel
                      htmlFor="Vaccine"
                      className={classes.selectorLables}
                    >
                      Vaccine
                    </InputLabel>
                    <Select
                      className={classes.selector_background}
                      value={coverageByMonthVaccine}
                      onChange={(event) =>
                        setCoverageByMonthVaccine(event.target.value)
                      }
                      inputProps={{
                        name: "CM_vaccine_selector",
                        id: "CM_vaccine_selector",
                      }}
                    >
                      {coverageByMonthVaccinesFilter}
                    </Select>
                  </FormControl>
                  <FormControl
                    className={classes.formControl}
                    variant="outlined"
                    margin="dense"
                  >
                    <InputLabel
                      htmlFor="Dose"
                      className={classes.selectorLables}
                    >
                      Dose
                    </InputLabel>
                    <Select
                      className={classes.selector_background}
                      value={coverageByMonthDose}
                      onChange={(event) =>
                        setCoverageByMonthDose(event.target.value)
                      }
                      inputProps={{
                        name: "CM_dose_selector",
                        id: "CM_dose_selector",
                      }}
                    >
                      {coverageByMonthDoseFilter}
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
                      displayEmpty
                      id={"CM_district_selector"}
                      value={coverageByMonthDistrict}
                      onChange={(event) =>
                        handleChangeDistrict(event, "Coverage (By Month)")
                      }
                      multiple
                      input={<BootstrapInput />}
                      renderValue={(selected) => "National"}
                    >
                      {coverageByMonthDistrictFilter}
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
                      htmlFor="CY_startYear"
                      className={classes.selectorLables}
                    >
                      Start Year
                    </InputLabel>
                    <Select
                      className={classes.selector_background}
                      value={coverageByYearStartYear}
                      onChange={(event) =>
                        setCoverageByYearStartYear(event.target.value)
                      }
                      inputProps={{
                        id: "CY_start_year_selector",
                        name: "CY_start_year_selector",
                      }}
                    >
                      {coverageByYearStartYearFilter}
                    </Select>
                  </FormControl>
                  <FormControl
                    className={classes.formControl}
                    variant="outlined"
                    margin="dense"
                  >
                    <InputLabel
                      htmlFor="CY_endYear"
                      className={classes.selectorLables}
                    >
                      End Year
                    </InputLabel>
                    <Select
                      className={classes.selector_background}
                      value={coverageByYearEndYear}
                      onChange={(event) =>
                        setCoverageByYearEndYear(event.target.value)
                      }
                      inputProps={{
                        id: "CY_end_year_selector",
                        name: "CY_end_year_selector",
                      }}
                    >
                      {coverageByYearEndYearFilter}
                    </Select>
                  </FormControl>
                  <FormControl
                    className={classes.formControl}
                    variant="outlined"
                    margin="dense"
                  >
                    <InputLabel
                      htmlFor="CY_Vaccine"
                      className={classes.selectorLables}
                    >
                      Vaccine
                    </InputLabel>
                    <Select
                      className={classes.selector_background}
                      value={coverageByYearVaccine}
                      onChange={(event) =>
                        setCoverageByYearVaccine(event.target.value)
                      }
                      inputProps={{
                        id: "CY_vaccine_selector",
                        name: "CY_vaccine_selector",
                      }}
                    >
                      {coverageByYearVaccinesFilter}
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
                      displayEmpty
                      id={"CY_district_selector"}
                      input={<BootstrapInput />}
                      value={coverageByYearDistrict}
                      onChange={(event) =>
                        handleChangeDistrict(event, "Coverage (By Year)")
                      }
                      multiple
                      renderValue={(selected) => "National"}
                    >
                      {coverageByYearDistrictFilter}
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
                      htmlFor="startYears"
                      className={classes.selectorLables}
                    >
                      Year
                    </InputLabel>
                    <Select
                      className={classes.selector_background}
                      value={coverageDropoutRateYear}
                      onChange={(event) =>
                        setCoverageDropoutrateYear(event.target.value)
                      }
                      inputProps={{
                        id: "DR_start_year_selector",
                        name: "DR_start_year_selector",
                      }}
                    >
                      {coverageDropoutRateYearFilter}
                    </Select>
                  </FormControl>
                  <FormControl
                    className={classes.formControl}
                    variant="outlined"
                    margin="dense"
                  >
                    <InputLabel
                      htmlFor="Vaccine"
                      className={classes.selectorLables}
                    >
                      Vaccine
                    </InputLabel>
                    <Select
                      className={classes.selector_background}
                      id={"DR_vaccine_selector"}
                      value={coverageDropoutRateVaccine}
                      onChange={(event) =>
                        setCoverageDropoutrateVaccine(event.target.value)
                      }
                      inputProps={{
                        id: "DR_vaccine_selector",
                        name: "DR_vaccine_selector",
                      }}
                    >
                      {coverageDropoutRateVaccinesFilter}
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
                      displayEmpty
                      id={"DR_district_selector"}
                      input={<BootstrapInput />}
                      value={coverageDropoutRateDistrict}
                      onChange={(event) =>
                        handleChangeDistrict(event, "Dropout Rate")
                      }
                      multiple
                      renderValue={(selected) => "National"}
                    >
                      {coverageDropoutRateDistrictFilter}
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
                      htmlFor="startYears"
                      className={classes.selectorLables}
                    >
                      Year
                    </InputLabel>
                    <Select
                      className={classes.selector_background}
                      value={coverageRedCategoryYear}
                      onChange={(event) =>
                        setCoverageRedCategoryYear(event.target.value)
                      }
                      inputProps={{
                        id: "RC_start_year_selector",
                        name: "RC_start_year_selector",
                      }}
                    >
                      {redcategoryYearFilter}
                    </Select>
                  </FormControl>
                  <FormControl
                    className={classes.formControl}
                    variant="outlined"
                    margin="dense"
                  >
                    <InputLabel
                      htmlFor="Vaccine"
                      className={classes.selectorLables}
                    >
                      Vaccine
                    </InputLabel>
                    <Select
                      className={classes.selector_background}
                      value={coverageRedCategoryVaccine}
                      onChange={(event) =>
                        setCoverageRedCategoryVaccine(event.target.value)
                      }
                      inputProps={{
                        id: "RC_vaccine_selector",
                        name: "RC_vaccine_selector",
                      }}
                    >
                      {redcategoryVaccinesFilter}
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
            <Grid item xs={12}>
              <Paper
                className={classes.paper}
                elevation={0}
                style={{ padding: 0 }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} className={classes.chipPadding}>
                    {coverageByMonthDistrictChipData
                      .filter((a) => a !== "National")
                      .map(function (district) {
                        return (
                          <Chip
                            key={district}
                            label={district}
                            className={classes.chip}
                            onDelete={handleDeleteChip(
                              district,
                              "Coverage (By Month)"
                            )}
                          />
                        );
                      })}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Coverage parentTab={"monthlyCoverage"} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid item xs={12}>
              <Paper
                className={classes.paper}
                elevation={0}
                style={{ padding: 0 }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} className={classes.chipPadding}>
                    {coverageByYearDistrictChipData
                      .filter((a) => a !== "National")
                      .map(function (district) {
                        return (
                          <Chip
                            key={district}
                            label={district}
                            className={classes.chip}
                            onDelete={handleDeleteChip(
                              district,
                              "Coverage (By Year)"
                            )}
                          />
                        );
                      })}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Coverage parentTab={"yearlyCoverage"} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Grid item xs={12}>
              <Paper
                className={classes.paper}
                elevation={0}
                style={{ padding: 0 }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} className={classes.chipPadding}>
                    {coverageDropoutrateDistrictChipData
                      .filter((a) => a !== "National")
                      .map(function (district) {
                        return (
                          <Chip
                            key={district}
                            label={district}
                            className={classes.chip}
                            onDelete={handleDeleteChip(
                              district,
                              "Dropout Rate"
                            )}
                          />
                        );
                      })}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Coverage parentTab={"dropoutRate"} />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Coverage parentTab={"redcategorisation"} />
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
