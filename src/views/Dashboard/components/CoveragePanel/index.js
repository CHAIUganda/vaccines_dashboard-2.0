import React, { useState } from "react";
import PropTypes from "prop-types";

// Material components
import { Grid } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
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
import CoverageByYear from "./components/CoverageByYear/index";
import CoverageByMonth from "./components/CoverageByMonth/index";
import DropoutRate from "./components/DropoutRate/index";
import RedCategorisation from "./components/RedCategorisation/index";

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
      id={`keymetrics-tabpanel-${index}`}
      aria-labelledby={`keymetrics-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={1}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `keymetrics-tab-${index}`,
    "aria-controls": `keymetrics-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  indicator: {
    backgroundColor: "#F8E658"
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    float: "right"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
    maxWidth: 120
  },
  filters: {
    display: "flex",

    float: "right"
  },
  title: {
    float: "left",
    color: "#28354A",
    fontSize: 20
  },
  appBar: {
    backgroundColor: "white",
    borderRadius: "10px"
  },
  tabsDiv: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    fontFamily: "Open Sans",
    width: 640,
    paddingBottom: 1
  },
  tabs: {
    padding: "0rem",
    color: "#484848",
    backgroundColor: "white",
    fontFamily: "Open Sans",
    fontSize: "10rem",
    border: "1px solid #3540520D !important",
    borderRadius: "5px"
  },
  selectorLables: {
    position: "inherit",
    color: "#28354A",
    fontSize: 20,
    marginLeft: "-15px"
  }
}));

const TabStyle = withStyles(theme => ({
  root: {
    textTransform: "none",
    fontWeight: theme.typography.fontWeightBold,
    "&:hover": {
      backgroundColor: "#F8E658",
      color: "#28354A",
      opacity: 1
    },
    "&$selected": {
      backgroundColor: "#F8E658",
      color: "#28354A",
      fontWeight: theme.typography.fontWeightMedium
    }
  },
  selected: {}
}))(props => <Tab {...props} />);

export function CoveragePanel() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [endYear, setEndYear] = useState(years.slice(-4)[0]);
  const [district, setDistrict] = useState("National");
  const [dose, setDose] = useState(DOSES[2]);

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

  const [coverageByMonthDistrict, setCoverageByMonthDistrict] = useState(
    "National"
  );

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

  const [coverageByYearDistrict, setCoverageByYearDistrict] = useState(
    "National"
  );

  const [coverageByYearDose, setCoverageByYearDose] = useState(DOSES[2]);

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
  ] = useState("National");

  const [coverageDropoutRateDose, setCoverageDropoutRateDose] = useState(
    DOSES[2]
  );

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
  ] = useState("National");

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
      <MenuItem value={district.name} key={district.name}>
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
      <MenuItem value={district.name} key={district.name}>
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
      <MenuItem value={district.name} key={district.name}>
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

  const yearFilter = years.map(year => (
    <MenuItem value={year} key={year}>
      {year}
    </MenuItem>
  ));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" className={classes.title}>
          Key Metrics
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <div className={classes.tabsDiv}>
          <AppBar position="static" className={classes.appBar} elevation={0}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="Key metrics"
              className={classes.tabs}
              TabIndicatorProps={{ style: { backgroundColor: "#F8E658" } }}
            >
              <TabStyle {...a11yProps(0)} label="Coverage (By Month)" />
              <TabStyle {...a11yProps(1)} label="Coverage (By Year)" />
              <TabStyle {...a11yProps(2)} label="Dropout Rate" />
              <TabStyle {...a11yProps(3)} label="Red Categorisation" />
            </Tabs>
            <div className={classes.year}></div>
          </AppBar>
        </div>
      </Grid>
      <Grid item xs={6}>
        <TabPanel value={value} index={0}>
          <form className={classes.container} noValidate>
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
              <InputLabel htmlFor="Vaccine" className={classes.selectorLables}>
                {" "}
                Vaccine{" "}
              </InputLabel>
              <Select
                value={coverageByMonthVaccine}
                onChange={event =>
                  setCoverageByMonthVaccine(event.target.value)
                }
                inputProps={{
                  name: "CM_vaccine_name_selector",
                  id: "CM_vaccine_name_selector"
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
              <InputLabel htmlFor="Dose" className={classes.selectorLables}>
                {" "}
                Dose{" "}
              </InputLabel>
              <Select
                value={coverageByMonthDose}
                onChange={event => setCoverageByMonthDose(event.target.value)}
                inputProps={{
                  name: "CM_dose_selector",
                  id: "CM_dose_selector"
                }}
              >
                {coverageByMonthDoseFilter}
              </Select>
            </FormControl>
            <FormControl
              className={classes.formControl}
              variant="outlined"
              margin="dense"
            >
              <InputLabel htmlFor="District" className={classes.selectorLables}>
                {" "}
                District{" "}
              </InputLabel>
              <Select
                value={coverageByMonthDistrict}
                onChange={event =>
                  setCoverageByMonthDistrict(event.target.value)
                }
                inputProps={{
                  name: "CM_district_selector",
                  id: "CM_district_selector"
                }}
              >
                {coverageByMonthDistrictFilter}
              </Select>
            </FormControl>
          </form>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <form className={classes.container} noValidate>
            <FormControl
              className={classes.formControl}
              variant="outlined"
              margin="dense"
            >
              <InputLabel
                htmlFor="CY_startYear"
                className={classes.selectorLables}
              >
                {" "}
                Start Year{" "}
              </InputLabel>
              <Select
                value={coverageByYearStartYear}
                onChange={event =>
                  setCoverageByYearStartYear(event.target.value)
                }
                inputProps={{
                  name: "CY_start_year_selector",
                  id: "CY_start_year_selector"
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
                {" "}
                End Year{" "}
              </InputLabel>
              <Select
                value={coverageByYearEndYear}
                onChange={event => setCoverageByYearEndYear(event.target.value)}
                inputProps={{
                  name: "CY_end_year_selector",
                  id: "CY_end_year_selector"
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
                {" "}
                Vaccine{" "}
              </InputLabel>
              <Select
                value={coverageByYearVaccine}
                onChange={event => setCoverageByYearVaccine(event.target.value)}
                inputProps={{
                  name: "CY_vaccine_selector",
                  id: "CY_vaccine_selector"
                }}
              >
                {coverageByYearVaccinesFilter}
              </Select>
            </FormControl>

            <FormControl
              className={classes.formControl}
              variant="outlined"
              margin="dense"
            >
              <InputLabel htmlFor="District" className={classes.selectorLables}>
                {" "}
                District{" "}
              </InputLabel>
              <Select
                value={coverageByYearDistrict}
                onChange={event =>
                  setCoverageByYearDistrict(event.target.value)
                }
                inputProps={{
                  name: "CY_district_selector",
                  id: "CY_district_selector"
                }}
              >
                {coverageByYearDistrictFilter}
              </Select>
            </FormControl>
          </form>
        </TabPanel>

        <TabPanel value={value} index={2}>
          <form className={classes.container} noValidate>
            <FormControl
              className={classes.formControl}
              variant="outlined"
              margin="dense"
            >
              <InputLabel
                htmlFor="startYears"
                className={classes.selectorLables}
              >
                {" "}
                Year{" "}
              </InputLabel>
              <Select
                value={coverageDropoutRateYear}
                onChange={event =>
                  setCoverageDropoutrateYear(event.target.value)
                }
                inputProps={{
                  name: "DR_start_year_selector",
                  id: "DR_start_year_selector"
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
              <InputLabel htmlFor="Vaccine" className={classes.selectorLables}>
                {" "}
                Vaccine{" "}
              </InputLabel>
              <Select
                value={coverageDropoutRateVaccine}
                onChange={event =>
                  setCoverageDropoutrateVaccine(event.target.value)
                }
                inputProps={{
                  name: "DR_vaccine_selector",
                  id: "DR_vaccine_selector"
                }}
              >
                {coverageDropoutRateVaccinesFilter}
              </Select>
            </FormControl>

            <FormControl
              className={classes.formControl}
              variant="outlined"
              margin="dense"
            >
              <InputLabel htmlFor="District" className={classes.selectorLables}>
                {" "}
                District{" "}
              </InputLabel>
              <Select
                value={coverageDropoutRateDistrict}
                onChange={event =>
                  setCoverageDropoutrateDistrict(event.target.value)
                }
                inputProps={{
                  name: "DR_district_selector",
                  id: "DR_district_selector"
                }}
              >
                {coverageDropoutRateDistrictFilter}
              </Select>
            </FormControl>
          </form>
        </TabPanel>

        <TabPanel value={value} index={3}>
          <form className={classes.container} noValidate>
            <FormControl
              className={classes.formControl}
              variant="outlined"
              margin="dense"
            >
              <InputLabel
                htmlFor="startYears"
                className={classes.selectorLables}
              >
                {" "}
                Year{" "}
              </InputLabel>
              <Select
                value={coverageRedCategoryYear}
                onChange={event =>
                  setCoverageRedCategoryYear(event.target.value)
                }
                inputProps={{
                  name: "RC_start_year_selector",
                  id: "RC_start_year_selector"
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
              <InputLabel htmlFor="Vaccine" className={classes.selectorLables}>
                {" "}
                Vaccine{" "}
              </InputLabel>
              <Select
                value={coverageRedCategoryVaccine}
                onChange={event =>
                  setCoverageRedCategoryVaccine(event.target.value)
                }
                inputProps={{
                  name: "RC_vaccine_selector",
                  id: "RC_vaccine_selector"
                }}
              >
                {redcategoryVaccinesFilter}
              </Select>
            </FormControl>
          </form>
        </TabPanel>
      </Grid>
      <Grid item xs={12}>
        <Divider variant="middle" className={classes.divider} />
        <TabPanel value={value} index={0}>
          <CoverageByMonth
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
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CoverageByYear
            vacineData={
              vaccineDosesForCoverageByYear && vaccineDosesForCoverageByYear
            }
            startYear={coverageByYearStartYear}
            endYear={coverageByYearEndYear}
            isLoading={isLoadingCoverageByYear && isLoadingCoverageByYear}
            vaccineName={coverageByYearVaccine}
            district={coverageByYearDistrict && coverageByYearDistrict}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <DropoutRate
            vacineDataForMap={
              vaccineDosesForCoverageDropoutRateMap &&
              vaccineDosesForCoverageDropoutRateMap
            }
            vaccineDosesForChart={
              vaccineDosesForCoverageDropoutRate &&
              vaccineDosesForCoverageDropoutRate
            }
            vaccineName={
              coverageDropoutRateVaccine && coverageDropoutRateVaccine
            }
            dose={coverageDropoutRateDose && coverageDropoutRateDose}
            isLoading={isLoadingDropoutRate && isLoadingDropoutRate}
            startYear={coverageDropoutRateYear}
            endYear={endYear}
          />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <RedCategorisation
            vacineDataForMap={
              vaccineDosesForCoverageRedCategoryMap &&
              vaccineDosesForCoverageRedCategoryMap
            }
            vaccineDosesForChart={
              vaccineDosesForCoverageRedCategory &&
              vaccineDosesForCoverageRedCategory
            }
            vaccineName={
              coverageRedCategoryVaccine && coverageRedCategoryVaccine
            }
            dose={coverageRedCategoryDose && coverageRedCategoryDose}
            isLoading={isLoadingRedCategory && isLoadingRedCategory}
            startYear={coverageRedCategoryYear}
            endYear={endYear}
          />
        </TabPanel>
      </Grid>
    </Grid>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};
