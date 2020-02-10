import React, { useState } from "react";

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
import Input from "@material-ui/core/Input";

// Data Fetcher
import {
  useGetDistricts,
  useGetMonths,
  useGetDistrictStockLevels,
  useGetRefillRateData,
  useGetUptakeRateData,
  useGetDistrictStockTrendData
} from "../../../../helpers/apiDataFetcher";

// Import Stockmanaggement components
import DistrictsStockLevels from "./components/DistrictsStockLevels/index";
import RefillRate from "./components/RefillRate/index";
import UptakeRate from "./components/UptakeRate/index";
// import DistrictStockTrends from "./components/DistrictStockTrends";

// Variables
const date = new Date(),
  years = [],
  year = date.getFullYear();

// Get last 5 years from now
for (let i = year; i > year - 5; i--) {
  years.push(i);
}

// Get last year
const lastYear = new Date().getFullYear() - 1;

const VACCINES = [
  "HPV",
  "DPT",
  "PENTA",
  "PCV",
  "IPV",
  "OPV",
  "BCG",
  "MEASLES",
  "TT"
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`stock-management-keymetrics-tabpanel-${index}`}
      aria-labelledby={`stock-management-keymetrics-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={1}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `stock-management-keymetrics-tab-${index}`,
    "aria-controls": `stock-management-keymetrics-tabpanel-${index}`
  };
}

const TabStyle = withStyles(theme => ({
  root: {
    textTransform: "none",
    fontWeight: theme.typography.fontWeightBold,
    "&:hover": {
      backgroundColor: "#FC6F6F",
      color: "#28354A",
      opacity: 1
    },
    "&$selected": {
      backgroundColor: "#FC6F6F",
      color: "#28354A",
      fontWeight: theme.typography.fontWeightMedium
    }
  },
  selected: {}
}))(props => <Tab {...props} />);

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
    minWidth: 150,
    maxWidth: 200
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

export function StockManagementPanel() {
  // -----------------------------------------------------------------------
  // Fetch Months
  // -----------------------------------------------------------------------
  // We need these first sp we fetch them on component load
  const [{ monthsData }] = useGetMonths();

  let groupedMonths;

  if (monthsData && monthsData) {
    function groupBy(objectArray, property) {
      return objectArray.reduce((acc, obj) => {
        let key = obj[property];
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
      }, {});
    }

    const groupedData = groupBy(monthsData, "year");
    groupedMonths = groupedData;
  }

  const classes = useStyles();
  const [value, setValue] = useState(0);

  const [district, setDistrict] = useState("Abim District");

  // -----------------------------------------------------------------------
  // District Stock Levels  state data
  // -------------------------------------------------------------------------

  const [
    districtStockLevelsEndMonth,
    setDistrictStockLevelsEndMonth
  ] = useState("Jun 2019");

  const [
    districtStockLevelsStartMonth,
    setDistrictStockLevelsStartMonth
  ] = useState("Jan 2019");

  const [districtStockLevelsVaccine, setDistrictStockLevelsVaccine] = useState(
    "PENTA"
  );

  // -----------------------------------------------------------------------
  // Refill Rate  state data
  // -------------------------------------------------------------------------

  const [refillRateStartMonth, setRefillRateStartMonth] = useState("Jan 2019");
  const [refillRateEndMonth, setRefillRateEndMonth] = useState("Jun 2019");
  const [refillRateVaccine, setRefillRateVaccine] = useState("PENTA");
  const [refillRateDistrict, setRefillRateDistrict] = useState("Abim District");

  // -----------------------------------------------------------------------
  // Uptake Rate  state data
  // -------------------------------------------------------------------------

  const [uptakeRateStartMonth, setUptakeRateStartMonth] = useState("Jan 2019");
  const [uptakeRateEndMonth, setUptakeRateEndMonth] = useState("Jun 2019");
  const [uptakeRateVaccine, setUptakeRateVaccine] = useState("PENTA");
  const [uptakeRateDistrict, setUptakeRateDistrict] = useState("National");

  // -----------------------------------------------------------------------
  // District Stock Trends state data
  // -------------------------------------------------------------------------

  const [
    districtStockTrendStartMonth,
    setDistrictStockTrendStartMonth
  ] = useState("Jan 2019");
  const [districtStockTrendEndMonth, setDistrictStockTrendEndMonth] = useState(
    "Jun 2019"
  );
  const [districtStockTrendVaccine, setDistrictStockTrendVaccine] = useState(
    "PENTA"
  );
  const [districtStockTrendDistrict, setDistrictStockTrendDistrict] = useState(
    "National"
  );

  // -----------------------------------------------------------------------
  // Fetch Districts
  // -----------------------------------------------------------------------
  const [{ districts, isLoadingDistricts }] = useGetDistricts("ALL");

  // -----------------------------------------------------------------------
  // Fetch Districts Stock Levels Data
  // -----------------------------------------------------------------------
  const [
    { atHandStockByDistrictStockLevels, isLoadingDistrictStockLevels }
  ] = useGetDistrictStockLevels(
    "",
    districtStockLevelsEndMonth,
    districtStockLevelsStartMonth,
    districtStockLevelsVaccine
  );

  // -----------------------------------------------------------------------
  // Fetch Refill Rate Data
  // -----------------------------------------------------------------------

  const [
    {
      stockByDistrictVaccineRefillData,
      atHandStockByDistrictRefillData,
      isLoadingRefillRateData
    }
  ] = useGetRefillRateData(
    refillRateDistrict,
    refillRateEndMonth,
    refillRateStartMonth,
    refillRateVaccine
  );

  // -----------------------------------------------------------------------
  // Fetch Uptake Rate Data
  // -----------------------------------------------------------------------

  const [
    {
      stockByDistrictVaccineUptakeData,
      atHandStockByDistrictUptakeData,
      isLoadingUptakeRateData
    }
  ] = useGetUptakeRateData(
    uptakeRateDistrict,
    uptakeRateEndMonth,
    uptakeRateStartMonth,
    uptakeRateVaccine
  );

  // -----------------------------------------------------------------------
  // Fetch District Stock Trends Data
  // -----------------------------------------------------------------------

  const [
    {
      stockByDistrictVaccineStockTrendData,
      atHandStockByDistrictStockTrendData,
      isLoadingStockTrendData
    }
  ] = useGetDistrictStockTrendData(
    districtStockTrendDistrict,
    districtStockTrendEndMonth,
    districtStockTrendStartMonth,
    districtStockTrendVaccine
  );

  // -----------------------------------------------------------------------
  // District Stock levels Filters
  // -----------------------------------------------------------------------
  const districtStockLevelsVaccinesFilter = VACCINES.map(vaccine => (
    <MenuItem value={vaccine} key={vaccine}>
      {vaccine}
    </MenuItem>
  ));

  const districtStockLevelsEndMonthFilter =
    groupedMonths &&
    Object.keys(groupedMonths)
      .filter(year => year !== "2020")
      .map(year => (
        <>
          {" "}
          <optgroup label={year}></optgroup>
          {Object.values(groupedMonths[year]).map(y => (
            <>
              <option value={y.name}>{y.name}</option>
            </>
          ))}
        </>
      ));

  // -----------------------------------------------------------------------
  // Refill Rate data filters
  // -----------------------------------------------------------------------

  const refillRateDataStartMonthFilter =
    groupedMonths &&
    Object.keys(groupedMonths)
      .filter(year => year !== "2020")
      .map(year => (
        <>
          {" "}
          <optgroup label={year}></optgroup>
          {Object.values(groupedMonths[year]).map(y => (
            <>
              <option value={y.name}>{y.name}</option>
            </>
          ))}
        </>
      ));

  const refillRateEndMonthFilter =
    groupedMonths &&
    Object.keys(groupedMonths)
      .filter(year => year === lastYear.toString())
      .map(year => (
        <>
          {" "}
          <optgroup label={year}></optgroup>
          {Object.values(groupedMonths[year]).map(y => (
            <>
              <option value={y.name}>{y.name}</option>
            </>
          ))}
        </>
      ));

  const refillRateDataVaccinesFilter = VACCINES.map(vaccine => (
    <MenuItem value={vaccine} key={vaccine}>
      {vaccine}
    </MenuItem>
  ));

  const refillRateDataDistrictsFilter =
    districts &&
    districts.map(district => (
      <MenuItem value={district.name} key={district.name}>
        {district.name}
      </MenuItem>
    ));

  // -----------------------------------------------------------------------
  // Uptake Rate data filters
  // -----------------------------------------------------------------------

  const uptakeRateDataStartMonthFilter =
    groupedMonths &&
    Object.keys(groupedMonths)
      .filter(year => year !== "2020")
      .map(year => (
        <>
          {" "}
          <optgroup label={year}></optgroup>
          {Object.values(groupedMonths[year]).map(y => (
            <>
              <option value={y.name}>{y.name}</option>
            </>
          ))}
        </>
      ));

  const uptakeRateEndMonthFilter =
    groupedMonths &&
    Object.keys(groupedMonths)
      .filter(year => year !== "2020")
      .map(year => (
        <>
          {" "}
          <optgroup label={year}></optgroup>
          {Object.values(groupedMonths[year]).map(y => (
            <>
              <option value={y.name}>{y.name}</option>
            </>
          ))}
        </>
      ));

  const uptakeRateDataVaccinesFilter = VACCINES.map(vaccine => (
    <MenuItem value={vaccine} key={vaccine}>
      {vaccine}
    </MenuItem>
  ));

  const uptakeRateDataDistrictsFilter =
    districts &&
    districts.map(district => (
      <MenuItem value={district.name} key={district.name}>
        {district.name}
      </MenuItem>
    ));

  // -----------------------------------------------------------------------
  // Uptake Rate data filters
  // -----------------------------------------------------------------------

  const districtStockTrendStartMonthFilter =
    groupedMonths &&
    Object.keys(groupedMonths)
      .filter(year => year !== "2020")
      .map(year => (
        <>
          {" "}
          <optgroup label={year}></optgroup>
          {Object.values(groupedMonths[year]).map(y => (
            <>
              <option value={y.name}>{y.name}</option>
            </>
          ))}
        </>
      ));

  const districtStockTrendEndMonthFilter =
    groupedMonths &&
    Object.keys(groupedMonths)
      .filter(year => year !== "2020")
      .map(year => (
        <>
          {" "}
          <optgroup label={year}></optgroup>
          {Object.values(groupedMonths[year]).map(y => (
            <>
              <option value={y.name}>{y.name}</option>
            </>
          ))}
        </>
      ));

  const districtStockTrendVaccinesFilter = VACCINES.map(vaccine => (
    <MenuItem value={vaccine} key={vaccine}>
      {vaccine}
    </MenuItem>
  ));

  const districtStockTrendDistrictsFilter =
    districts &&
    districts.map(district => (
      <MenuItem value={district.name} key={district.name}>
        {district.name}
      </MenuItem>
    ));

  // ==================================================================================

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
              TabIndicatorProps={{ style: { backgroundColor: "#FC6F6F" } }}
            >
              <TabStyle {...a11yProps(0)} label="District Stock Levels" />
              <TabStyle {...a11yProps(1)} label="Refill Rate" />
              <TabStyle {...a11yProps(2)} label="Uptake Rate" />
              <TabStyle {...a11yProps(3)} label="District Stock Trends" />
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
              <InputLabel htmlFor="endMonth" className={classes.selectorLables}>
                End Month
              </InputLabel>
              <Select
                value={districtStockLevelsEndMonth}
                native
                defaultValue="Jun 2019"
                input={<Input id="grouped-select" />}
                onChange={event =>
                  setDistrictStockLevelsEndMonth(event.target.value)
                }
                inputProps={{
                  name: "DSL_end_month_selector",
                  id: "DSL_end_month_selector"
                }}
              >
                {districtStockLevelsEndMonthFilter}
              </Select>
            </FormControl>
            <FormControl
              className={classes.formControl}
              variant="outlined"
              margin="dense"
            >
              <InputLabel htmlFor="Vaccine" className={classes.selectorLables}>
                Vaccine
              </InputLabel>
              <Select
                value={districtStockLevelsVaccine}
                onChange={event =>
                  setDistrictStockLevelsVaccine(event.target.value)
                }
                inputProps={{
                  name: "DSL_vaccine_name_selector",
                  id: "DSL_vaccine_name_selector"
                }}
              >
                {districtStockLevelsVaccinesFilter}
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
                htmlFor="startMonth"
                className={classes.selectorLables}
              >
                Start Month
              </InputLabel>
              <Select
                value={refillRateStartMonth}
                native
                defaultValue="Jan 2019"
                input={<Input id="grouped-select" />}
                onChange={event => setRefillRateStartMonth(event.target.value)}
                inputProps={{
                  name: "RR_start_month_selector",
                  id: "RR_start_month_selector"
                }}
              >
                {refillRateDataStartMonthFilter}
              </Select>
            </FormControl>

            <FormControl
              className={classes.formControl}
              variant="outlined"
              margin="dense"
            >
              <InputLabel
                htmlFor="startMonth"
                className={classes.selectorLables}
              >
                End Month
              </InputLabel>
              <Select
                value={refillRateEndMonth}
                native
                defaultValue="Jan 2019"
                input={<Input id="grouped-select" />}
                onChange={event => setRefillRateEndMonth(event.target.value)}
                inputProps={{
                  name: "RR_end_month_selector",
                  id: "RR_end_month_selector"
                }}
              >
                {refillRateEndMonthFilter}
              </Select>
            </FormControl>

            <FormControl
              className={classes.formControl}
              variant="outlined"
              margin="dense"
            >
              <InputLabel htmlFor="Vaccine" className={classes.selectorLables}>
                Vaccine
              </InputLabel>
              <Select
                value={refillRateVaccine}
                onChange={event => setRefillRateVaccine(event.target.value)}
                inputProps={{
                  name: "RR_vaccine_name_selector",
                  id: "RR_vaccine_name_selector"
                }}
              >
                {refillRateDataVaccinesFilter}
              </Select>
            </FormControl>

            <FormControl
              className={classes.formControl}
              variant="outlined"
              margin="dense"
            >
              <InputLabel htmlFor="District" className={classes.selectorLables}>
                District
              </InputLabel>
              <Select
                value={refillRateDistrict}
                onChange={event => setRefillRateDistrict(event.target.value)}
                inputProps={{
                  name: "RR_district_name_selector",
                  id: "RR_district_name_selector"
                }}
              >
                {refillRateDataDistrictsFilter}
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
                htmlFor="startMonth"
                className={classes.selectorLables}
              >
                Start Month
              </InputLabel>
              <Select
                value={uptakeRateStartMonth}
                native
                defaultValue="Jan 2019"
                input={<Input id="grouped-select" />}
                onChange={event => setUptakeRateStartMonth(event.target.value)}
                inputProps={{
                  name: "UR_start_month_selector",
                  id: "UR_start_month_selector"
                }}
              >
                {uptakeRateDataStartMonthFilter}
              </Select>
            </FormControl>

            <FormControl
              className={classes.formControl}
              variant="outlined"
              margin="dense"
            >
              <InputLabel
                htmlFor="startMonth"
                className={classes.selectorLables}
              >
                End Month
              </InputLabel>
              <Select
                value={uptakeRateEndMonth}
                native
                defaultValue="Jan 2019"
                input={<Input id="grouped-select" />}
                onChange={event => setUptakeRateEndMonth(event.target.value)}
                inputProps={{
                  name: "UR_end_month_selector",
                  id: "UR_end_month_selector"
                }}
              >
                {uptakeRateEndMonthFilter}
              </Select>
            </FormControl>

            <FormControl
              className={classes.formControl}
              variant="outlined"
              margin="dense"
            >
              <InputLabel htmlFor="Vaccine" className={classes.selectorLables}>
                Vaccine
              </InputLabel>
              <Select
                value={refillRateVaccine}
                onChange={event => setUptakeRateVaccine(event.target.value)}
                inputProps={{
                  name: "UR_vaccine_name_selector",
                  id: "UR_vaccine_name_selector"
                }}
              >
                {uptakeRateDataVaccinesFilter}
              </Select>
            </FormControl>

            <FormControl
              className={classes.formControl}
              variant="outlined"
              margin="dense"
            >
              <InputLabel htmlFor="District" className={classes.selectorLables}>
                District
              </InputLabel>
              <Select
                value={uptakeRateDistrict}
                onChange={event => setUptakeRateDistrict(event.target.value)}
                inputProps={{
                  name: "UR_district_name_selector",
                  id: "UR_district_name_selector"
                }}
              >
                {uptakeRateDataDistrictsFilter}
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
                htmlFor="startMonth"
                className={classes.selectorLables}
              >
                Start Month
              </InputLabel>
              <Select
                value={districtStockTrendStartMonth}
                native
                defaultValue="Jan 2019"
                input={<Input id="grouped-select" />}
                onChange={event =>
                  setDistrictStockTrendStartMonth(event.target.value)
                }
                inputProps={{
                  name: "DST_start_month_selector",
                  id: "DST_start_month_selector"
                }}
              >
                {districtStockTrendStartMonthFilter}
              </Select>
            </FormControl>

            <FormControl
              className={classes.formControl}
              variant="outlined"
              margin="dense"
            >
              <InputLabel
                htmlFor="startMonth"
                className={classes.selectorLables}
              >
                End Month
              </InputLabel>
              <Select
                value={districtStockTrendEndMonth}
                native
                defaultValue="Jan 2019"
                input={<Input id="grouped-select" />}
                onChange={event =>
                  setDistrictStockTrendEndMonth(event.target.value)
                }
                inputProps={{
                  name: "DST_end_month_selector",
                  id: "DST_end_month_selector"
                }}
              >
                {districtStockTrendEndMonthFilter}
              </Select>
            </FormControl>

            <FormControl
              className={classes.formControl}
              variant="outlined"
              margin="dense"
            >
              <InputLabel htmlFor="Vaccine" className={classes.selectorLables}>
                Vaccine
              </InputLabel>
              <Select
                value={districtStockTrendVaccine}
                onChange={event =>
                  setDistrictStockTrendVaccine(event.target.value)
                }
                inputProps={{
                  name: "DSL_vaccine_name_selector",
                  id: "DSL_vaccine_name_selector"
                }}
              >
                {districtStockTrendVaccinesFilter}
              </Select>
            </FormControl>

            <FormControl
              className={classes.formControl}
              variant="outlined"
              margin="dense"
            >
              <InputLabel htmlFor="District" className={classes.selectorLables}>
                District
              </InputLabel>
              <Select
                value={districtStockTrendDistrict}
                onChange={event =>
                  setDistrictStockTrendDistrict(event.target.value)
                }
                inputProps={{
                  name: "DSL_district_name_selector",
                  id: "DSL_district_name_selector"
                }}
              >
                {districtStockTrendDistrictsFilter}
              </Select>
            </FormControl>
          </form>
        </TabPanel>
      </Grid>
      <Grid item xs={12}>
        <Divider variant="middle" className={classes.divider} />
        <TabPanel value={value} index={0}>
          <DistrictsStockLevels
            atHandStockLevelsData={atHandStockByDistrictStockLevels}
            isLoading={isLoadingDistrictStockLevels}
            endMonth={districtStockLevelsEndMonth}
            startMonth={districtStockLevelsStartMonth}
            district={district}
            vaccine={districtStockLevelsVaccine}
          />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <RefillRate
            stockByDistrictVaccineRefillData={stockByDistrictVaccineRefillData}
            atHandStockByDistrictRefillData={atHandStockByDistrictRefillData}
            isLoading={isLoadingRefillRateData}
            endMonth={refillRateEndMonth}
            startMonth={refillRateStartMonth}
            district={refillRateDistrict}
            vaccine={refillRateVaccine}
          />
        </TabPanel>

        <TabPanel value={value} index={2}>
          <UptakeRate
            data={stockByDistrictVaccineUptakeData}
            atHandStockByDistrictUptakeData={atHandStockByDistrictUptakeData}
            isLoading={isLoadingUptakeRateData}
            endMonth={uptakeRateEndMonth}
            startMonth={uptakeRateStartMonth}
            district={uptakeRateDistrict}
            vaccine={uptakeRateVaccine}
            tab={"uptake-rate"}
          />
        </TabPanel>

        <TabPanel value={value} index={3}>
          <UptakeRate
            data={stockByDistrictVaccineStockTrendData}
            atHandStockByDistrictStockTrendData={
              atHandStockByDistrictStockTrendData
            }
            isLoading={isLoadingStockTrendData}
            endMonth={districtStockTrendEndMonth}
            startMonth={districtStockTrendStartMonth}
            district={districtStockTrendDistrict}
            vaccine={districtStockTrendVaccine}
            tab={"district-stock-trends"}
          />
        </TabPanel>
      </Grid>
    </Grid>
  );
}
