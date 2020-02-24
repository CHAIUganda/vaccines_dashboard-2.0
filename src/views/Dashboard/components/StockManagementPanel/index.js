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
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import Chip from "@material-ui/core/Chip";
import InputBase from "@material-ui/core/InputBase";
import NativeSelect from "@material-ui/core/NativeSelect";

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
import UptakeRateAndDistrictStockTrends from "./components/UptakeRateAndDistrictStockTrends/index";

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
      {value === index && <Box>{children}</Box>}
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
    fontSize: 12,
    "&:hover": {
      backgroundColor: "#FC6F6F",
      color: "#28354A",
      opacity: 1
    },
    "&$selected": {
      backgroundColor: "#FC6F6F",
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

export function StockManagementPanel() {
  // -----------------------------------------------------------------------
  // Fetch Months
  // -----------------------------------------------------------------------
  // We need these first so we fetch them on component load
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
  const [refillRateDistrict2, setRefillRateDistrict2] = useState([
    "Abim District"
  ]);
  const [refillrateChipData, setRefillrateChipData] = useState([
    refillRateDistrict2
  ]);

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

  const [
    districtStockTrendDistrict2,
    setDistrictStockTrendDistrict2
  ] = useState(["National"]);

  const [districtStockTrendChipData, setDistrictStockTrendChipData] = useState([
    districtStockTrendDistrict2
  ]);

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
    refillRateDistrict2,
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
    districtStockTrendDistrict2,
    districtStockTrendEndMonth,
    districtStockTrendStartMonth,
    districtStockTrendVaccine
  );

  // -----------------------------------------------------------------------
  // District Stock levels Filters
  // -----------------------------------------------------------------------
  const districtStockLevelsVaccinesFilter = VACCINES.map(vaccine => (
    <option value={vaccine} key={vaccine}>
      {vaccine}
    </option>
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
    <option value={vaccine} key={vaccine}>
      {vaccine}
    </option>
  ));

  const refillRateDataDistrictsFilter =
    districts &&
    districts.map(district => (
      <option
        value={district.name}
        key={district.name}
        style={{ fontSize: "large" }}
      >
        {district.name}
      </option>
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
    <option value={vaccine} key={vaccine}>
      {vaccine}
    </option>
  ));

  const districtStockTrendDistrictsFilter =
    districts &&
    districts.map(district => (
      <option
        value={district.name}
        key={district.name}
        style={{ fontSize: "large" }}
      >
        {district.name}
      </option>
    ));

  // ==================================================================================

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeDistrict = (event, tab) => {
    if (tab === "District Stock Trends") {
      setDistrictStockTrendDistrict2(event.target.value);
      setDistrictStockTrendChipData(event.target.value);
    } else {
      setRefillRateDistrict2(event.target.value);
      setRefillrateChipData(event.target.value);
    }
  };

  // Chip stuff

  const handleDeleteChip = (chipToDelete, tab) => () => {
    if (tab === "Refill Rate") {
      setRefillRateDistrict2(
        refillRateDistrict2.filter(chip => chip !== chipToDelete)
      );
      setRefillrateChipData(
        refillrateChipData.filter(chip => chip !== chipToDelete)
      );
    } else if (tab === "District Stock Trends") {
      setDistrictStockTrendDistrict2(
        districtStockTrendDistrict2.filter(chip => chip !== chipToDelete)
      );
      setDistrictStockTrendChipData(
        districtStockTrendChipData.filter(chip => chip !== chipToDelete)
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
                    aria-label="Stock Management Key metrics"
                    className={classes.tabs}
                    TabIndicatorProps={{
                      style: { backgroundColor: "#FC6F6F" }
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
                                    "Percentage of Districts reporting zero balance"
                                  }
                                </b>
                              </Typography>
                            </React.Fragment>
                          }
                          enterDelay={500}
                          leaveDelay={200}
                        >
                          <span>District Stock Levels</span>
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
                                <b> {"Doses distributed by NMS / Doses"} </b>{" "}
                                ordered expressed as a percentage
                              </Typography>
                            </React.Fragment>
                          }
                          enterDelay={500}
                          leaveDelay={200}
                        >
                          <span>Refill Rate</span>
                        </HtmlTooltip>
                      }
                    />
                    {/* Disable for now till they fix their issues */}
                    {/* <TabStyle {...a11yProps(2)} label="Uptake Rate" /> */}
                    <TabStyle
                      {...a11yProps(2)}
                      label={
                        <HtmlTooltip
                          title={
                            <React.Fragment>
                              <Typography color="inherit">
                                <b> {"Doses consumed / Available doses"} </b>
                                expressed as a percentage
                              </Typography>
                            </React.Fragment>
                          }
                          enterDelay={500}
                          leaveDelay={200}
                        >
                          <span>District Stock Trends</span>
                        </HtmlTooltip>
                      }
                    />
                  </Tabs>
                </AppBar>
              </Grid>
              <Grid item lg={6} md={6} xl={6} xs={12}>
                <TabPanel value={value} index={0}>
                  <div className={classes.filters2}>
                    <FormControl className={classes.selectMargin}>
                      <InputLabel
                        htmlFor="endMonth"
                        className={classes.selectorLables2}
                      >
                        End Month
                      </InputLabel>
                      <NativeSelect
                        id="demo-customized-select-native"
                        value={districtStockLevelsEndMonth}
                        onChange={event =>
                          setDistrictStockLevelsEndMonth(event.target.value)
                        }
                        input={<BootstrapInput />}
                      >
                        {districtStockLevelsEndMonthFilter}
                      </NativeSelect>
                    </FormControl>
                    <FormControl className={classes.selectMargin}>
                      <InputLabel
                        htmlFor="vaccine"
                        className={classes.selectorLables2}
                      >
                        Vaccine
                      </InputLabel>
                      <NativeSelect
                        id="demo-customized-select-native"
                        value={districtStockLevelsVaccine}
                        onChange={event =>
                          setDistrictStockLevelsVaccine(event.target.value)
                        }
                        input={<BootstrapInput />}
                      >
                        {districtStockLevelsVaccinesFilter}
                      </NativeSelect>
                    </FormControl>
                  </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <div className={classes.filters2}>
                    <FormControl className={classes.selectMargin}>
                      <InputLabel
                        htmlFor="startMonth"
                        className={classes.selectorLables2}
                      >
                        Start Month
                      </InputLabel>
                      <NativeSelect
                        id="demo-customized-select-native"
                        value={refillRateStartMonth}
                        onChange={event =>
                          setRefillRateStartMonth(event.target.value)
                        }
                        input={<BootstrapInput />}
                      >
                        {refillRateDataStartMonthFilter}
                      </NativeSelect>
                    </FormControl>
                    <FormControl className={classes.selectMargin}>
                      <InputLabel
                        htmlFor="endMonth"
                        className={classes.selectorLables2}
                      >
                        End Month
                      </InputLabel>
                      <NativeSelect
                        id="demo-customized-select-native"
                        value={refillRateEndMonth}
                        onChange={event =>
                          setRefillRateEndMonth(event.target.value)
                        }
                        input={<BootstrapInput />}
                      >
                        {refillRateEndMonthFilter}
                      </NativeSelect>
                    </FormControl>
                    <FormControl className={classes.selectMargin}>
                      <InputLabel
                        htmlFor="vaccine"
                        className={classes.selectorLables2}
                      >
                        Vaccine
                      </InputLabel>
                      <NativeSelect
                        id="demo-customized-select-native"
                        value={refillRateVaccine}
                        onChange={event =>
                          setRefillRateVaccine(event.target.value)
                        }
                        input={<BootstrapInput />}
                      >
                        {refillRateDataVaccinesFilter}
                      </NativeSelect>
                    </FormControl>
                    <FormControl className={classes.selectMargin}>
                      <InputLabel
                        htmlFor="district"
                        className={classes.selectorLables2}
                      >
                        District
                      </InputLabel>
                      <Select
                        displayEmpty
                        id="RR_district_name_selector"
                        input={<BootstrapInput />}
                        value={refillRateDistrict2}
                        onChange={event =>
                          handleChangeDistrict(event, "Refill Rate")
                        }
                        multiple
                        renderValue={selected => "National"}
                      >
                        {refillRateDataDistrictsFilter}
                      </Select>
                    </FormControl>
                  </div>
                </TabPanel>
                {/* Change ID to 3 when we reactivate Uptake Rate */}
                <TabPanel value={value} index={2}>
                  <div className={classes.filters2}>
                    <FormControl className={classes.selectMargin}>
                      <InputLabel
                        htmlFor="startMonth"
                        className={classes.selectorLables2}
                      >
                        Start Month
                      </InputLabel>
                      <NativeSelect
                        id="demo-customized-select-native"
                        value={districtStockTrendStartMonth}
                        input={<BootstrapInput />}
                        onChange={event =>
                          setDistrictStockTrendStartMonth(event.target.value)
                        }
                      >
                        {districtStockTrendStartMonthFilter}
                      </NativeSelect>
                    </FormControl>
                    <FormControl className={classes.selectMargin}>
                      <InputLabel
                        htmlFor="startMonth"
                        className={classes.selectorLables2}
                      >
                        End Month
                      </InputLabel>
                      <NativeSelect
                        value={districtStockTrendEndMonth}
                        id="DST_end_month_selector"
                        input={<BootstrapInput />}
                        onChange={event =>
                          setDistrictStockTrendEndMonth(event.target.value)
                        }
                      >
                        {districtStockTrendEndMonthFilter}
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
                        value={districtStockTrendVaccine}
                        id="DSL_vaccine_name_selector"
                        input={<BootstrapInput />}
                        onChange={event =>
                          setDistrictStockTrendVaccine(event.target.value)
                        }
                      >
                        {districtStockTrendVaccinesFilter}
                      </NativeSelect>
                    </FormControl>
                    <FormControl className={classes.selectMargin}>
                      <InputLabel
                        htmlFor="district"
                        className={classes.selectorLables2}
                      >
                        District
                      </InputLabel>
                      <Select
                        displayEmpty
                        id={"DSL_district_name_selector"}
                        input={<BootstrapInput />}
                        value={districtStockTrendDistrict2}
                        onChange={event =>
                          handleChangeDistrict(event, "District Stock Trends")
                        }
                        multiple
                        renderValue={selected => "National"}
                      >
                        {districtStockTrendDistrictsFilter}
                      </Select>
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
            <DistrictsStockLevels
              atHandStockLevelsData={atHandStockByDistrictStockLevels}
              isLoading={isLoadingDistrictStockLevels}
              endMonth={districtStockLevelsEndMonth}
              startMonth={districtStockLevelsStartMonth}
              // district={districtStockLe}
              vaccine={districtStockLevelsVaccine}
            />
          </TabPanel>

          <TabPanel value={value} index={1}>
            <Grid item xs={12}>
              <Paper className={classes.paper} elevation={0}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    {refillrateChipData.map(function(district) {
                      return (
                        <Chip
                          key={district}
                          label={district}
                          className={classes.chip}
                          onDelete={handleDeleteChip(district, "Refill Rate")}
                        />
                      );
                    })}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <RefillRate
              stockByDistrictVaccineRefillData={
                stockByDistrictVaccineRefillData
              }
              atHandStockByDistrictRefillData={atHandStockByDistrictRefillData}
              isLoading={isLoadingRefillRateData}
              endMonth={refillRateEndMonth}
              startMonth={refillRateStartMonth}
              district={refillRateDistrict2}
              vaccine={refillRateVaccine}
            />
          </TabPanel>

          {/* <TabPanel value={value} index={2}>
            <UptakeRateAndDistrictStockTrends
              data={stockByDistrictVaccineUptakeData}
              atHandStockByDistrictUptakeData={atHandStockByDistrictUptakeData}
              isLoading={isLoadingUptakeRateData}
              endMonth={uptakeRateEndMonth}
              startMonth={uptakeRateStartMonth}
              district={uptakeRateDistrict}
              vaccine={uptakeRateVaccine}
              tab={"uptake-rate"}
            />
          </TabPanel> */}

          <TabPanel value={value} index={2}>
            <Grid item xs={12}>
              <Paper className={classes.paper} elevation={0}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    {districtStockTrendChipData.map(function(district) {
                      return (
                        <Chip
                          key={district}
                          label={district}
                          className={classes.chip}
                          onDelete={handleDeleteChip(
                            district,
                            "District Stock Trends"
                          )}
                        />
                      );
                    })}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <UptakeRateAndDistrictStockTrends
              data={stockByDistrictVaccineStockTrendData}
              atHandStockByDistrictStockTrendData={
                atHandStockByDistrictStockTrendData
              }
              isLoading={isLoadingStockTrendData}
              endMonth={districtStockTrendEndMonth}
              startMonth={districtStockTrendStartMonth}
              district={districtStockTrendDistrict2}
              vaccine={districtStockTrendVaccine}
              tab={"district-stock-trends"}
            />
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  );
}
