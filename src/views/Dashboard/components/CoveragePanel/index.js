import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

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
import NativeSelect from "@material-ui/core/NativeSelect";
import MenuItem from "@material-ui/core/MenuItem";

// Data Fetcher
import {
  useVaccineDosesForRedCategory,
  useVaccineDosesForCoverageByMonth,
  useVaccineDosesForCoverageByYear,
  useVaccineDosesForDropoutRate,
  useGetDistricts
} from "../../../../helpers/apiDataFetcher";

// Import coverage components
import Coverage from "./components/Coverage/index";

// Import common styles
import { useStyles } from "../styles";

// Variables
const date = new Date(),
  years = [],
  year = date.getFullYear();

// Get last 5 years from now
for (let i = year; i > year - 5; i--) {
  years.push(i);
}

const VACCINES = [
  "ALL",
  "HPV",
  "DPT",
  "PCV",
  "IPV",
  "OPV",
  "BCG",
  "MEASLES",
  "TT"
];
const DOSES = ["Dose 1", "Dose 2", "Dose 3"];
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
    "aria-controls": `coverage-panel-keymetrics-tabpanel-${index}`
  };
}

const TabStyle = withStyles(theme => ({
  root: {
    textTransform: "none",
    fontWeight: theme.typography.fontWeightBold,
    fontSize: 12,
    color: "#28354A",
    "&:hover": {
      backgroundColor: "#F8E658",
      color: "#28354A",
      opacity: 1
    },
    "&$selected": {
      backgroundColor: "#F8E658",
      color: "#28354A",
      fontWeight: theme.typography.fontWeightMedium,
      fontSize: 12
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
    fontSize: 16,
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

export function CoveragePanel() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [endYear, setEndYear] = useState(years.slice(-4)[0]);
  const [district, setDistrict] = useState("National");

  // -----------------------------------------------------------------------
  // Coverage By Month state data
  // -----------------------------------------------------------------------
  const [coverageByMonthStartYear, setCoverageByMonthStartYear] = useState(
    years[1]
  );

  const [coverageByMonthVaccine, setCoverageByMonthVaccine] = useState(
    VACCINES[0]
  );

  const [coverageByMonthDose, setCoverageByMonthDose] = useState(DOSES[2]);

  const [coverageByMonthDistrict, setCoverageByMonthDistrict] = useState([
    "National"
  ]);

  const [
    coverageByMonthDistrictChipData,
    setcoverageByMonthDistrictChipData
  ] = useState(coverageByMonthDistrict);

  // -----------------------------------------------------------------------
  // Coverage By Year state data
  // -----------------------------------------------------------------------

  const [coverageByYearStartYear, setCoverageByYearStartYear] = useState(
    years[1]
  );

  const [coverageByYearEndYear, setCoverageByYearEndYear] = useState(years[1]);

  const [coverageByYearVaccine, setCoverageByYearVaccine] = useState(
    VACCINES[0]
  );

  const [coverageByYearDistrict, setCoverageByYearDistrict] = useState([
    "National"
  ]);

  const [coverageByYearDose, setCoverageByYearDose] = useState(DOSES[2]);

  const [
    coverageByYearDistrictChipData,
    setCoverageByYearDistrictChipData
  ] = useState(coverageByYearDistrict);

  // -----------------------------------------------------------------------
  // Dropout Rate state data
  // -----------------------------------------------------------------------

  const [coverageDropoutRateYear, setCoverageDropoutrateYear] = useState(
    years[1]
  );
  const [coverageDropoutRateVaccine, setCoverageDropoutrateVaccine] = useState(
    VACCINES[0]
  );

  const [
    coverageDropoutRateDistrict,
    setCoverageDropoutrateDistrict
  ] = useState(["National"]);

  const [coverageDropoutRateDose, setCoverageDropoutRateDose] = useState(
    DOSES[2]
  );

  const [
    coverageDropoutrateDistrictChipData,
    setCoverageDropoutrateDistrictChipData
  ] = useState(coverageDropoutRateDistrict);

  // -----------------------------------------------------------------------
  // Redcategory state data
  // -----------------------------------------------------------------------
  const [coverageRedCategoryYear, setCoverageRedCategoryYear] = useState(
    years[1]
  );

  const [coverageRedCategoryVaccine, setCoverageRedCategoryVaccine] = useState(
    VACCINES[2]
  );

  const [coverageRedCategoryDose, setCoverageRedCategoryDose] = useState(
    DOSES[2]
  );

  const [
    coverageRedCategoryDistrict,
    setCoverageRedCategoryDistrict
  ] = useState(["National"]);

  // Fetch data
  const [
    {
      vaccineDosesForCoverageRedCategory,
      vaccineDosesForCoverageRedCategoryMap,
      isLoadingRedCategory
    }
  ] = useVaccineDosesForRedCategory(
    endYear,
    coverageRedCategoryYear,
    coverageRedCategoryDose,
    coverageRedCategoryVaccine,
    coverageRedCategoryDistrict
  );

  // -----------------------------------------------------------------------
  // Fetch Coverage by month data
  // -----------------------------------------------------------------------

  const [
    {
      vaccineDosesForCoverageByMonth,
      vaccineDosesForCoverageByMonthMap,
      isLoadingCoverageByMonth
    }
  ] = useVaccineDosesForCoverageByMonth(
    endYear,
    coverageByMonthStartYear,
    coverageByMonthDose,
    coverageByMonthVaccine,
    coverageByMonthDistrict
  );

  // -----------------------------------------------------------------------
  // Fetch Coverage by year data
  // -----------------------------------------------------------------------

  const [
    { vaccineDosesForCoverageByYear, isLoadingCoverageByYear }
  ] = useVaccineDosesForCoverageByYear(
    coverageByYearEndYear,
    coverageByYearStartYear,
    coverageByYearDose,
    coverageByYearVaccine,
    coverageByYearDistrict
  );

  // -----------------------------------------------------------------------
  // Fetch Dropout rate data
  // -----------------------------------------------------------------------

  const [
    {
      vaccineDosesForCoverageDropoutRate,
      vaccineDosesForCoverageDropoutRateMap,
      isLoadingDropoutRate
    }
  ] = useVaccineDosesForDropoutRate(
    endYear,
    coverageDropoutRateYear,
    coverageDropoutRateDose,
    coverageDropoutRateVaccine,
    coverageDropoutRateDistrict
  );

  // -----------------------------------------------------------------------
  // Fetch Districts
  // -----------------------------------------------------------------------
  const [{ districts }] = useGetDistricts(district);

  const data = {
    coverageByMonth: {
      vacineDataForMap:
        vaccineDosesForCoverageByMonthMap && vaccineDosesForCoverageByMonthMap,
      vaccineDosesForChart:
        vaccineDosesForCoverageByMonth && vaccineDosesForCoverageByMonth,
      vaccineName: coverageByMonthVaccine && coverageByMonthVaccine,
      dose: coverageByMonthDose && coverageByMonthDose,
      isLoading: isLoadingCoverageByMonth && isLoadingCoverageByMonth,
      startYear: coverageByMonthStartYear,
      endYear: endYear,
      district: coverageByMonthDistrict && coverageByMonthDistrict
    },
    coverageByYear: {
      vacineData:
        vaccineDosesForCoverageByYear && vaccineDosesForCoverageByYear,
      startYear: coverageByYearStartYear,
      endYear: coverageByYearEndYear,
      isLoading: isLoadingCoverageByYear && isLoadingCoverageByYear,
      vaccineName: coverageByYearVaccine,
      district: coverageByYearDistrict && coverageByYearDistrict
    },
    dropoutRate: {
      vacineDataForMap:
        vaccineDosesForCoverageDropoutRateMap &&
        vaccineDosesForCoverageDropoutRateMap,
      vaccineDosesForChart:
        vaccineDosesForCoverageDropoutRate &&
        vaccineDosesForCoverageDropoutRate,
      vaccineName: coverageDropoutRateVaccine && coverageDropoutRateVaccine,
      dose: coverageDropoutRateDose && coverageDropoutRateDose,
      isLoading: isLoadingDropoutRate && isLoadingDropoutRate,
      startYear: coverageDropoutRateYear,
      endYear: endYear,
      district: coverageDropoutRateDistrict && coverageDropoutRateDistrict
    },
    redCategorisation: {
      vacineDataForMap:
        vaccineDosesForCoverageRedCategoryMap &&
        vaccineDosesForCoverageRedCategoryMap,
      vaccineDosesForChart:
        vaccineDosesForCoverageRedCategory &&
        vaccineDosesForCoverageRedCategory,
      vaccineName: coverageRedCategoryVaccine && coverageRedCategoryVaccine,
      dose: coverageRedCategoryDose && coverageRedCategoryDose,
      isLoading: isLoadingRedCategory && isLoadingRedCategory,
      startYear: coverageRedCategoryYear,
      endYear: endYear,
      // Set district to an empty array since we dont filter by district under red category
      district: []
    }
  };

  // -----------------------------------------------------------------------
  // Coverage By Month Filters
  // -----------------------------------------------------------------------

  const coverageByMonthYearFilter = years.map(year => (
    <MenuItem value={year} key={year}>
      {year}
    </MenuItem>
  ));

  const coverageByMonthVaccinesFilter = VACCINES.map(vaccine => (
    <MenuItem value={vaccine} key={vaccine}>
      {vaccine}
    </MenuItem>
  ));

  const coverageByMonthDoseFilter = DOSES.map(dose => (
    <MenuItem value={dose} key={dose}>
      {dose}
    </MenuItem>
  ));

  const coverageByMonthDistrictFilter =
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
  // Coverage By Year Filters
  // -----------------------------------------------------------------------

  const coverageByYearStartYearFilter = years.map(year => (
    <MenuItem value={year} key={year}>
      {year}
    </MenuItem>
  ));

  const coverageByYearEndYearFilter = years.map(year => (
    <MenuItem value={year} key={year}>
      {year}
    </MenuItem>
  ));

  const coverageByYearVaccinesFilter = VACCINES.map(vaccine => (
    <MenuItem value={vaccine} key={vaccine}>
      {vaccine}
    </MenuItem>
  ));

  const coverageByYearDistrictFilter =
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
  // Dropout Rate filters
  // -----------------------------------------------------------------------

  const coverageDropoutRateYearFilter = years.map(year => (
    <MenuItem value={year} key={year}>
      {year}
    </MenuItem>
  ));

  const coverageDropoutRateVaccinesFilter = VACCINES.map(vaccine => (
    <MenuItem value={vaccine} key={vaccine}>
      {vaccine}
    </MenuItem>
  ));

  const coverageDropoutRateDistrictFilter =
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
  // Redcategory filters
  // -----------------------------------------------------------------------

  const redcategoryYearFilter = years.map(year => (
    <MenuItem value={year} key={year}>
      {year}
    </MenuItem>
  ));

  const redcategoryVaccinesFilter = VACCINES.map(vaccine => (
    <MenuItem value={vaccine} key={vaccine}>
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
      setcoverageByMonthDistrictChipData(event.target.value);
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
        coverageByMonthDistrict.filter(chip => chip !== chipToDelete)
      );
      setcoverageByMonthDistrictChipData(
        coverageByMonthDistrict.filter(chip => chip !== chipToDelete)
      );
    } else if (tab === "Coverage (By Year)") {
      setCoverageByYearDistrict(
        coverageByYearDistrict.filter(chip => chip !== chipToDelete)
      );
      setCoverageByYearDistrictChipData(
        coverageByYearDistrict.filter(chip => chip !== chipToDelete)
      );
    } else {
      setCoverageDropoutrateDistrict(
        coverageDropoutRateDistrict.filter(chip => chip !== chipToDelete)
      );
      setCoverageDropoutrateDistrictChipData(
        coverageDropoutRateDistrict.filter(chip => chip !== chipToDelete)
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
                      style: { backgroundColor: "#F8E658" }
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
                                <b>
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
                                <b>
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
                    <TabStyle {...a11yProps(3)} label="Red Categorisation" />
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
                        onChange={event =>
                          setCoverageByMonthStartYear(event.target.value)
                        }
                        inputProps={{
                          name: "CM_year_selector",
                          id: "CM_year_selector"
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
                        onChange={event =>
                          setCoverageByMonthVaccine(event.target.value)
                        }
                        inputProps={{
                          name: "CM_vaccine_selector",
                          id: "CM_vaccine_selector"
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
                        onChange={event =>
                          setCoverageByMonthDose(event.target.value)
                        }
                        inputProps={{
                          name: "CM_dose_selector",
                          id: "CM_dose_selector"
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
                        onChange={event =>
                          handleChangeDistrict(event, "Coverage (By Month)")
                        }
                        multiple
                        input={<BootstrapInput />}
                        renderValue={selected => "National"}
                      >
                        {coverageByMonthDistrictFilter}
                      </Select>
                    </FormControl>
                  </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <div className={classes.filters2}>
                    <FormControl className={classes.selectMargin}>
                      <InputLabel
                        htmlFor="CY_startYear"
                        className={classes.selectorLables2}
                        style={{ minWidth: 120 }}
                      >
                        Start Year
                      </InputLabel>
                      <NativeSelect
                        id={"CY_start_year_selector"}
                        value={coverageByYearStartYear}
                        onChange={event =>
                          setCoverageByYearStartYear(event.target.value)
                        }
                        input={<BootstrapInput />}
                        style={{ minWidth: 120 }}
                      >
                        {coverageByYearStartYearFilter}
                      </NativeSelect>
                    </FormControl>
                    <FormControl className={classes.selectMargin}>
                      <InputLabel
                        htmlFor="CY_endYear"
                        className={classes.selectorLables2}
                        style={{ minWidth: 120 }}
                      >
                        End Year
                      </InputLabel>
                      <NativeSelect
                        id={"CY_end_year_selector"}
                        value={coverageByYearEndYear}
                        onChange={event =>
                          setCoverageByYearEndYear(event.target.value)
                        }
                        input={<BootstrapInput />}
                        style={{ minWidth: 120 }}
                      >
                        {coverageByYearEndYearFilter}
                      </NativeSelect>
                    </FormControl>
                    <FormControl className={classes.selectMargin}>
                      <InputLabel
                        htmlFor="CY_Vaccine"
                        className={classes.selectorLables2}
                      >
                        Vaccine
                      </InputLabel>
                      <NativeSelect
                        id={"CY_vaccine_selector"}
                        value={coverageByYearVaccine}
                        onChange={event =>
                          setCoverageByYearVaccine(event.target.value)
                        }
                        input={<BootstrapInput />}
                      >
                        {coverageByYearVaccinesFilter}
                      </NativeSelect>
                    </FormControl>

                    <FormControl className={classes.selectMargin}>
                      <InputLabel
                        htmlFor="District"
                        className={classes.selectorLables2}
                      >
                        District
                      </InputLabel>
                      <Select
                        displayEmpty
                        id={"CY_district_selector"}
                        input={<BootstrapInput />}
                        value={coverageByYearDistrict}
                        onChange={event =>
                          handleChangeDistrict(event, "Coverage (By Year)")
                        }
                        multiple
                        renderValue={selected => "National"}
                      >
                        {coverageByYearDistrictFilter}
                      </Select>
                    </FormControl>
                  </div>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <div className={classes.filters2}>
                    <FormControl className={classes.selectMargin}>
                      <InputLabel
                        htmlFor="startYears"
                        className={classes.selectorLables2}
                      >
                        Year
                      </InputLabel>
                      <NativeSelect
                        id={"DR_start_year_selector"}
                        value={coverageDropoutRateYear}
                        onChange={event =>
                          setCoverageDropoutrateYear(event.target.value)
                        }
                        input={<BootstrapInput />}
                      >
                        {coverageDropoutRateYearFilter}
                      </NativeSelect>
                    </FormControl>
                    <FormControl className={classes.selectMargin}>
                      <InputLabel
                        htmlFor="Vaccine"
                        className={classes.selectorLables2}
                      >
                        Vaccine
                      </InputLabel>
                      <NativeSelect
                        id={"DR_vaccine_selector"}
                        value={coverageDropoutRateVaccine}
                        onChange={event =>
                          setCoverageDropoutrateVaccine(event.target.value)
                        }
                        input={<BootstrapInput />}
                      >
                        {coverageDropoutRateVaccinesFilter}
                      </NativeSelect>
                    </FormControl>

                    <FormControl className={classes.selectMargin}>
                      <InputLabel
                        htmlFor="District"
                        className={classes.selectorLables2}
                      >
                        District
                      </InputLabel>
                      <Select
                        displayEmpty
                        id={"DR_district_selector"}
                        input={<BootstrapInput />}
                        value={coverageDropoutRateDistrict}
                        onChange={event =>
                          handleChangeDistrict(event, "Dropout Rate")
                        }
                        multiple
                        renderValue={selected => "National"}
                      >
                        {coverageDropoutRateDistrictFilter}
                      </Select>
                    </FormControl>
                  </div>
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <div className={classes.filters2}>
                    <FormControl className={classes.selectMargin}>
                      <InputLabel
                        htmlFor="startYears"
                        className={classes.selectorLables2}
                      >
                        Year
                      </InputLabel>
                      <NativeSelect
                        id={"RC_start_year_selector"}
                        value={coverageRedCategoryYear}
                        onChange={event =>
                          setCoverageRedCategoryYear(event.target.value)
                        }
                        input={<BootstrapInput />}
                      >
                        {redcategoryYearFilter}
                      </NativeSelect>
                    </FormControl>
                    <FormControl className={classes.selectMargin}>
                      <InputLabel
                        htmlFor="Vaccine"
                        className={classes.selectorLables2}
                      >
                        Vaccine
                      </InputLabel>
                      <NativeSelect
                        id={"RC_vaccine_selector"}
                        value={coverageRedCategoryVaccine}
                        onChange={event =>
                          setCoverageRedCategoryVaccine(event.target.value)
                        }
                        input={<BootstrapInput />}
                      >
                        {redcategoryVaccinesFilter}
                      </NativeSelect>
                    </FormControl>
                  </div>
                </TabPanel>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TabPanel value={value} index={0}>
            <Grid item xs={12}>
              <Paper className={classes.paper} elevation={0}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    {coverageByMonthDistrictChipData
                      .filter(a => a !== "National")
                      .map(function(district) {
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
            <Coverage
              vacineDataForMap={
                vaccineDosesForCoverageByMonthMap &&
                vaccineDosesForCoverageByMonthMap
              }
              vaccineDosesForChart={
                vaccineDosesForCoverageByMonth && vaccineDosesForCoverageByMonth
              }
              vaccineName={coverageByMonthVaccine && coverageByMonthVaccine}
              dose={coverageByMonthDose && coverageByMonthDose}
              isLoading={isLoadingCoverageByMonth && isLoadingCoverageByMonth}
              startYear={coverageByMonthStartYear}
              endYear={endYear}
              district={coverageByMonthDistrict && coverageByMonthDistrict}
              data={data.coverageByMonth}
              parentTab={"monthlyCoverage"}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid item xs={12}>
              <Paper className={classes.paper} elevation={0}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    {coverageByYearDistrictChipData
                      .filter(a => a !== "National")
                      .map(function(district) {
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
            <Coverage data={data.coverageByYear} parentTab={"yearlyCoverage"} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Grid item xs={12}>
              <Paper className={classes.paper} elevation={0}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    {coverageDropoutrateDistrictChipData
                      .filter(a => a !== "National")
                      .map(function(district) {
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
            <Coverage data={data.dropoutRate} parentTab={"dropoutRate"} />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Coverage
              data={data.redCategorisation}
              parentTab={"redcategorisation"}
            />
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};
