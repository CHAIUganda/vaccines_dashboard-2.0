import React, { useState, useContext, useEffect } from "react";

// Bring in the global context
import { GlobalContext } from "../../../../context/GlobalState";

// Bring in our stock management context
import { StockManagementContext } from "../../../../context/StockManagement/StockManagementState";

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

// Import Stockmanaggement components
import DistrictsStockLevels from "./components/DistrictsStockLevels/index";
import RefillRate from "./components/RefillRate/index";
import UptakeRateAndDistrictStockTrends from "./components/UptakeRateAndDistrictStockTrends/index";

// Import common styles
import { useStyles } from "../styles";

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
    "aria-controls": `stock-management-keymetrics-tabpanel-${index}`,
  };
}

const TabStyle = withStyles((theme) => ({
  root: {
    textTransform: "none",
    fontWeight: theme.typography.fontWeightBold,
    fontSize: 12,
    "&:hover": {
      backgroundColor: "#FC6F6F",
      color: "#28354A",
      opacity: 1,
    },
    "&$selected": {
      backgroundColor: "#FC6F6F",
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
    fontSize: "small",
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    // fontSize: 16,
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

export function StockManagementPanel() {
  // Extract required global state variables
  const { districts, vaccines, getDistricts, getVaccines } = useContext(
    GlobalContext
  );

  // Extract required Stock management state variables
  const {
    stockMonths,
    defaultEndMonth,
    defaultStartMonth,
    defaultVaccine,
    defaultDistrict,
    getStockManagementMonths,
    getDistrictStockLevelsData,
    getRefillRateData,
    getDistrictStockTrendsData,
  } = useContext(StockManagementContext);

  // -----------------------------------------------------------------------
  // Fetch Vacinnes, Districts and Months to generate quarters
  // We need these first so we fetch them on component load
  // -----------------------------------------------------------------------
  useEffect(() => {
    getDistricts();
    getVaccines();
    getStockManagementMonths();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const groupedMonths = groupBy(stockMonths, "year");

  const classes = useStyles();
  const [value, setValue] = useState(0);

  // -----------------------------------------------------------------------
  // District Stock Levels  state data
  // -------------------------------------------------------------------------

  const [
    districtStockLevelsEndMonth,
    setDistrictStockLevelsEndMonth,
  ] = useState(defaultEndMonth);

  const [districtStockLevelsVaccine, setDistrictStockLevelsVaccine] = useState(
    defaultVaccine
  );

  // Fetch District Stock Levels data

  useEffect(() => {
    getDistrictStockLevelsData(
      districtStockLevelsVaccine,
      defaultStartMonth,
      districtStockLevelsEndMonth,
      ""
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [districtStockLevelsEndMonth, districtStockLevelsVaccine]);

  // -----------------------------------------------------------------------
  // Refill Rate  state data
  // -------------------------------------------------------------------------

  const [refillRateStartMonth, setRefillRateStartMonth] = useState(
    defaultStartMonth
  );
  const [refillRateEndMonth, setRefillRateEndMonth] = useState(defaultEndMonth);
  const [refillRateVaccine, setRefillRateVaccine] = useState(defaultVaccine);
  const [refillRateDistrict, setRefillRateDistrict] = useState(defaultDistrict);
  const [refillrateChipData, setRefillrateChipData] = useState([
    refillRateDistrict,
  ]);

  // Fetch Refill Rate data

  useEffect(() => {
    getRefillRateData(
      refillRateDistrict,
      refillRateEndMonth,
      refillRateStartMonth,
      refillRateVaccine
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    refillRateDistrict,
    refillRateEndMonth,
    refillRateStartMonth,
    refillRateVaccine,
  ]);

  // -----------------------------------------------------------------------
  // District Stock Trends state data
  // -------------------------------------------------------------------------

  const [
    districtStockTrendStartMonth,
    setDistrictStockTrendStartMonth,
  ] = useState(defaultStartMonth);
  const [districtStockTrendEndMonth, setDistrictStockTrendEndMonth] = useState(
    defaultEndMonth
  );
  const [districtStockTrendVaccine, setDistrictStockTrendVaccine] = useState(
    defaultVaccine
  );

  const [districtStockTrendDistrict, setDistrictStockTrendDistrict] = useState([
    "National",
  ]);

  const [districtStockTrendChipData, setDistrictStockTrendChipData] = useState([
    districtStockTrendDistrict,
  ]);

  // -----------------------------------------------------------------------
  // Fetch District Stock Trends data
  // -----------------------------------------------------------------------
  useEffect(() => {
    getDistrictStockTrendsData(
      districtStockTrendDistrict,
      districtStockTrendEndMonth,
      districtStockTrendStartMonth,
      districtStockTrendVaccine
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    districtStockTrendDistrict,
    districtStockTrendEndMonth,
    districtStockTrendStartMonth,
    districtStockTrendVaccine,
  ]);

  // -----------------------------------------------------------------------
  // District Stock levels Filters
  // -----------------------------------------------------------------------
  const districtStockLevelsVaccinesFilter = vaccines.map((vaccine) => (
    <MenuItem value={vaccine} key={vaccine} className={classes.liItems}>
      {vaccine}
    </MenuItem>
  ));

  const districtStockLevelsEndMonthFilter =
    groupedMonths &&
    Object.keys(groupedMonths).map((year) => (
      <>
        <optgroup label={year} className={classes.liItems}></optgroup>
        {Object.values(groupedMonths[year]).map((y) => (
          <>
            <option value={y.name} className={classes.liItems}>
              {y.name}
            </option>
          </>
        ))}
      </>
    ));

  // -----------------------------------------------------------------------
  // Refill Rate data filters
  // -----------------------------------------------------------------------

  const refillRateDataStartMonthFilter =
    groupedMonths &&
    Object.keys(groupedMonths).map((year) => (
      <>
        <optgroup label={year} className={classes.liItems}></optgroup>
        {Object.values(groupedMonths[year]).map((y) => (
          <>
            <option value={y.name} className={classes.liItems}>
              {y.name}
            </option>
          </>
        ))}
      </>
    ));

  const refillRateEndMonthFilter =
    groupedMonths &&
    Object.keys(groupedMonths).map((year) => (
      <>
        <optgroup label={year} className={classes.liItems}></optgroup>
        {Object.values(groupedMonths[year]).map((y) => (
          <>
            <option value={y.name} className={classes.liItems}>
              {y.name}
            </option>
          </>
        ))}
      </>
    ));

  const refillRateDataVaccinesFilter = vaccines.map((vaccine) => (
    <MenuItem value={vaccine} key={vaccine} className={classes.liItems}>
      {vaccine}
    </MenuItem>
  ));

  const refillRateDataDistrictsFilter =
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
  // Uptake Rate data filters
  // -----------------------------------------------------------------------

  const districtStockTrendStartMonthFilter =
    groupedMonths &&
    Object.keys(groupedMonths).map((year) => (
      <>
        {" "}
        <optgroup label={year} className={classes.liItems}></optgroup>
        {Object.values(groupedMonths[year]).map((y) => (
          <>
            <option value={y.name} className={classes.liItems}>
              {y.name}
            </option>
          </>
        ))}
      </>
    ));

  const districtStockTrendEndMonthFilter =
    groupedMonths &&
    Object.keys(groupedMonths).map((year) => (
      <>
        <optgroup label={year} className={classes.liItems}></optgroup>
        {Object.values(groupedMonths[year]).map((y) => (
          <>
            <option value={y.name} className={classes.liItems}>
              {y.name}
            </option>
          </>
        ))}
      </>
    ));

  const districtStockTrendVaccinesFilter = vaccines.map((vaccine) => (
    <MenuItem value={vaccine} key={vaccine} className={classes.liItems}>
      {vaccine}
    </MenuItem>
  ));

  const districtStockTrendDistrictsFilter =
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

  // ==================================================================================

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeDistrict = (event, tab) => {
    if (tab === "District Stock Trends") {
      setDistrictStockTrendDistrict(event.target.value);
      setDistrictStockTrendChipData(event.target.value);
    } else {
      setRefillRateDistrict(event.target.value);
      setRefillrateChipData(event.target.value);
    }
  };

  // Chip stuff

  const handleDeleteChip = (chipToDelete, tab) => () => {
    if (tab === "Refill Rate") {
      setRefillRateDistrict(
        refillRateDistrict.filter((chip) => chip !== chipToDelete)
      );
      setRefillrateChipData(
        refillrateChipData.filter((chip) => chip !== chipToDelete)
      );
    } else if (tab === "District Stock Trends") {
      setDistrictStockTrendDistrict(
        districtStockTrendDistrict.filter((chip) => chip !== chipToDelete)
      );
      setDistrictStockTrendChipData(
        districtStockTrendChipData.filter((chip) => chip !== chipToDelete)
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
                  aria-label="Stock Management Key metrics"
                  className={classes.tabs}
                  TabIndicatorProps={{
                    style: { backgroundColor: "#FC6F6F" },
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
                              <b className={classes.toolTip}>
                                {"Doses distributed by NMS / Doses"}
                              </b>{" "}
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
                              <b className={classes.toolTip}>
                                {"Doses consumed / Available doses"}
                              </b>
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
                  <FormControl
                    className={classes.districtSelectMargin}
                    variant="outlined"
                    margin="dense"
                  >
                    <InputLabel
                      htmlFor="endMonth"
                      className={classes.selectorLables2}
                    >
                      End Month
                    </InputLabel>
                    <Select
                      native
                      className={classes.selector_background}
                      id="DSL_endMonth_selector"
                      value={districtStockLevelsEndMonth}
                      onChange={(event) =>
                        setDistrictStockLevelsEndMonth(event.target.value)
                      }
                      input={<BootstrapInput />}
                    >
                      {districtStockLevelsEndMonthFilter}
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
                      Vaccine
                    </InputLabel>
                    <Select
                      className={classes.selector_background}
                      value={districtStockLevelsVaccine}
                      onChange={(event) =>
                        setDistrictStockLevelsVaccine(event.target.value)
                      }
                      inputProps={{
                        name: "DSL_vaccine_selector",
                        id: "DSL_vaccine_selector",
                      }}
                    >
                      {districtStockLevelsVaccinesFilter}
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
                      htmlFor="startMonth"
                      className={classes.selectorLables2}
                    >
                      Start Month
                    </InputLabel>
                    <Select
                      native
                      className={classes.selector_background}
                      id="RR_startMonth_selector"
                      value={refillRateStartMonth}
                      onChange={(event) =>
                        setRefillRateStartMonth(event.target.value)
                      }
                      input={<BootstrapInput />}
                    >
                      {refillRateDataStartMonthFilter}
                    </Select>
                  </FormControl>
                  <FormControl
                    className={classes.districtSelectMargin}
                    variant="outlined"
                    margin="dense"
                  >
                    <InputLabel
                      htmlFor="endMonth"
                      className={classes.selectorLables2}
                    >
                      End Month
                    </InputLabel>
                    <Select
                      native
                      className={classes.selector_background}
                      id="RR_endMonth_selector"
                      value={refillRateEndMonth}
                      onChange={(event) =>
                        setRefillRateEndMonth(event.target.value)
                      }
                      input={<BootstrapInput />}
                    >
                      {refillRateEndMonthFilter}
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
                      Vaccine
                    </InputLabel>
                    <Select
                      className={classes.selector_background}
                      value={refillRateVaccine}
                      onChange={(event) =>
                        setRefillRateVaccine(event.target.value)
                      }
                      inputProps={{
                        name: "RR_vaccine_selector",
                        id: "RR_vaccine_selector",
                      }}
                    >
                      {refillRateDataVaccinesFilter}
                    </Select>
                  </FormControl>
                  <FormControl
                    className={classes.districtSelectMargin}
                    variant="outlined"
                    margin="dense"
                  >
                    <InputLabel
                      htmlFor="district"
                      className={classes.selectorLables2}
                    >
                      District
                    </InputLabel>
                    <Select
                      className={classes.selector_background}
                      displayEmpty
                      id="RR_district_name_selector"
                      input={<BootstrapInput />}
                      value={refillRateDistrict}
                      onChange={(event) =>
                        handleChangeDistrict(event, "Refill Rate")
                      }
                      multiple
                      renderValue={(selected) => "National"}
                    >
                      {refillRateDataDistrictsFilter}
                    </Select>
                  </FormControl>
                </div>
              </TabPanel>
              {/* Change ID to 3 when we reactivate Uptake Rate */}
              <TabPanel value={value} index={2}>
                <div className={classes.filters2}>
                  <FormControl
                    className={classes.districtSelectMargin}
                    variant="outlined"
                    margin="dense"
                  >
                    <InputLabel
                      htmlFor="startMonth"
                      className={classes.selectorLables2}
                    >
                      Start Month
                    </InputLabel>
                    <Select
                      native
                      className={classes.selector_background}
                      id="DST_startMonth_selector"
                      value={districtStockTrendStartMonth}
                      input={<BootstrapInput />}
                      onChange={(event) =>
                        setDistrictStockTrendStartMonth(event.target.value)
                      }
                    >
                      {districtStockTrendStartMonthFilter}
                    </Select>
                  </FormControl>
                  <FormControl
                    className={classes.districtSelectMargin}
                    variant="outlined"
                    margin="dense"
                  >
                    <InputLabel
                      htmlFor="startMonth"
                      className={classes.selectorLables2}
                    >
                      End Month
                    </InputLabel>
                    <Select
                      native
                      className={classes.selector_background}
                      value={districtStockTrendEndMonth}
                      id="DST_end_month_selector"
                      input={<BootstrapInput />}
                      onChange={(event) =>
                        setDistrictStockTrendEndMonth(event.target.value)
                      }
                    >
                      {districtStockTrendEndMonthFilter}
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
                      value={districtStockTrendVaccine}
                      onChange={(event) =>
                        setDistrictStockTrendVaccine(event.target.value)
                      }
                      inputProps={{
                        name: "DSL_vaccine_name_selector",
                        id: "DSL_vaccine_name_selector",
                      }}
                    >
                      {districtStockTrendVaccinesFilter}
                    </Select>
                  </FormControl>
                  <FormControl
                    className={classes.districtSelectMargin}
                    variant="outlined"
                    margin="dense"
                  >
                    <InputLabel
                      htmlFor="district"
                      className={classes.selectorLables2}
                    >
                      District
                    </InputLabel>
                    <Select
                      className={classes.selector_background}
                      displayEmpty
                      id={"DSL_district_name_selector"}
                      input={<BootstrapInput />}
                      value={districtStockTrendDistrict}
                      onChange={(event) =>
                        handleChangeDistrict(event, "District Stock Trends")
                      }
                      multiple
                      renderValue={(selected) => "National"}
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

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TabPanel value={value} index={0}>
            <DistrictsStockLevels />
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
                    {refillrateChipData.map(function (district) {
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
            <RefillRate />
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
                    {districtStockTrendChipData.map(function (district) {
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
            <UptakeRateAndDistrictStockTrends tab={"district-stock-trends"} />
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  );
}
