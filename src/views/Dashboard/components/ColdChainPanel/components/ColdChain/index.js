import React, { useState, useMemo } from "react";

// Material components
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

// Shared componenrs
import { Card } from "../../../../../../components/";

// Custom components
import EligibilityTable from "./EligibilityTable/index";
import EligibilityStatusPieChart from "./EligibilityStatusPieChart/index";
import FunctionalityStatusBarChart from "./FunctionalityStatusBarChart/index";
import FunctionalityTable from "./FunctionalityTable/index";
import CapacityStatusBarChart from "./CapacityStatusBarChart/index";
import CapacityTable from "./CapacityTable/index";
import OptimalityStatusBarChart from "./OptimalityStatusBarChart/index";
import OptimalityTable from "./OptimalityTable/index";
import TemperatureMonitoringTable from "./TemperatureMonitoringTable/index";
import TemperatureMonitoringBarChart from "./TemperatureMonitoringBarChart/index";
import TemperatureMonitoringReportRateChart from "./TemperatureMonitoringReportRateChart/index";
import TemperatureMonitoringReportRateHeatMap from "./TemperatureMonitoringReportRateHeatMap/index";

// Import common styles
import { useStyles } from "../../../styles";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`coverage-by-months-tabpanel-${index}`}
      aria-labelledby={`coverage-by-months-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={1}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `coverage-by-months-tab-${index}`,
    "aria-controls": `coverage-by-months-tabpanel-${index}`,
  };
}

const TabStyle = withStyles((theme) => ({
  root: {
    padding: "1rem 0",
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: 12,
    "&:hover": {
      backgroundColor: "#B2C0D6",
      color: "black",
      opacity: 1,
    },
    "&$selected": {
      backgroundColor: "#B2C0D6",
      color: "black",
      fontWeight: theme.typography.fontWeightMedium,
      fontSize: 12,
    },
  },
  selected: {},
}))((props) => <Tab {...props} />);

export default function ColdChain(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const { data, parentTab } = props;

  const [functionality, setFunctionality] = useState();
  const [capacityData, setCapacityData] = useState();
  const [eligibilityData, setEligibilityData] = useState();
  const [optimalityData, setOptimalityData] = useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useMemo(() => {
    if (data && data && parentTab === "functionality") {
      setFunctionality(data && data.functionalityMetricsChartData);
    } else if (data && data && parentTab === "capacity") {
      setCapacityData(data && data.capacityMetricsChartData);
    } else if (data && data && parentTab === "eligibility") {
      setEligibilityData(data && data.eligibilityMetricsChartData);
    } else if (data && data && parentTab === "optimality") {
      setOptimalityData(data && data.optimalityMetricsChartData);
    }
  }, [data, parentTab]);

  const eligibibleFacilities =
    eligibilityData && eligibilityData.total_eligible_facilities;

  const functionality_percentage = Math.round(
    functionality &&
      functionality
        .filter((a) => a.functionality_percentage)
        .map((d) => d.functionality_percentage)
  );

  const capacity_shortage_negative =
    capacityData && capacityData.gap_metrics.negative_gap_percentage;

  const capacity_shortage_positive =
    capacityData && capacityData.gap_metrics.positive_gap_percentage;

  const totalAvailableLiters = new Intl.NumberFormat("lg-UG").format(
    capacityData && capacityData.overall_total_available
  );

  const CCE_dvs_optimality_percentage = optimalityData && optimalityData.dvs;
  const CCE_hf_optimality_percentage = optimalityData && optimalityData.hf;
  const SITE_dvs_optimality_percentage =
    optimalityData && optimalityData.dvs_sites;
  const SITE_hf_optimality_percentage =
    optimalityData && optimalityData.hf_sites;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} style={{ paddingTop: 0 }}>
        <Paper
          className={classes.paper}
          elevation={0}
          style={{ paddingTop: 0 }}
        >
          <Grid item lg={12} md={12} xl={12} xs={12}>
            {parentTab === "functionality" || parentTab === "eligibility" ? (
              <>
                <Grid
                  container
                  spacing={3}
                  className={classes.DST_section}
                  style={{ paddingTop: 50 }}
                >
                  <Grid item lg={3} md={3} xl={3} xs={12}>
                    <Grid
                      container
                      direction="column"
                      justify="space-evenly"
                      alignItems="flex-start"
                      style={{ maxHeight: 630 }}
                    >
                      <Grid item xs={12} style={{ maxHeight: 100, width: 650 }}>
                        {parentTab === "eligibility" ? (
                          <>
                            <Card
                              title={"Eligible Facilities"}
                              showPercentage={false}
                              metric={eligibibleFacilities}
                              isLoading={data.isLoading && data.isLoading}
                            />
                          </>
                        ) : (
                          <>
                            <Card
                              title={"Functionality"}
                              showPercentage={true}
                              metric={functionality_percentage}
                              isLoading={data.isLoading && data.isLoading}
                            />
                          </>
                        )}
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        style={{ marginTop: 120, height: 385, width: 650 }}
                      >
                        {parentTab === "eligibility" ? (
                          <>
                            <EligibilityStatusPieChart
                              data={data.eligibilityMetricsChartData}
                              isLoading={data.isLoading}
                              district={data.district}
                              careLevel={data.careLevel}
                              startQuarter={data.endQuarter}
                              endQuarter={data.endQuarter}
                            />
                          </>
                        ) : (
                          <>
                            <FunctionalityStatusBarChart
                              data={data.functionalityMetricsChartData}
                              isLoading={data.isLoading}
                              district={data.district}
                              careLevel={data.careLevel}
                              startYearHalf={data.startYearHalf}
                              endYearHalf={data.endYearHalf}
                            />
                          </>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item lg={9} md={9} xl={9} xs={12}>
                    {parentTab === "functionality" ? (
                      <>
                        <FunctionalityTable
                          data={data.functionalityDataTableData}
                          isLoading={data.isLoading}
                          district={data.district}
                          careLevel={data.careLevel}
                          startQuarter={data.startQuarter}
                          endQuarter={data.endQuarter}
                        />
                      </>
                    ) : (
                      <>
                        <EligibilityTable
                          data={data.eligibilityDataTableData}
                          isLoading={data.isLoading}
                          district={data.district}
                          careLevel={data.careLevel}
                          startQuarter={data.startQuarter}
                          endQuarter={data.endQuarter}
                        />
                      </>
                    )}
                  </Grid>
                </Grid>
              </>
            ) : parentTab === "capacity" ? (
              <>
                <Grid
                  container
                  spacing={3}
                  className={classes.DST_section}
                  style={{ paddingTop: 50 }}
                >
                  <Grid item xs={12}>
                    <Grid container spacing={3}>
                      <Grid item lg={4} md={4} xl={4} xs={12}>
                        <Card
                          title={`Total liters ${
                            data.district === "national"
                              ? "at National Level"
                              : "in " + data.district
                          }`}
                          showPercentage={false}
                          metric={totalAvailableLiters}
                          isLoading={data.isLoading && data.isLoading}
                        />
                      </Grid>
                      <Grid item lg={4} md={4} xl={4} xs={12}>
                        <Card
                          title={"Shortage (-ve Gap)"}
                          showPercentage={true}
                          metric={capacity_shortage_negative}
                          isLoading={data.isLoading && data.isLoading}
                        />
                      </Grid>
                      <Grid item lg={4} md={4} xl={4} xs={12}>
                        <Card
                          title={"Shortage (+ve Gap)"}
                          showPercentage={true}
                          metric={capacity_shortage_positive}
                          isLoading={data.isLoading && data.isLoading}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} style={{ maxHeight: 630 }}>
                    <Grid container spacing={3}>
                      <Grid
                        item
                        lg={4}
                        md={4}
                        xl={4}
                        xs={12}
                        style={{ height: "fit-content" }}
                      >
                        <CapacityStatusBarChart
                          data={data.capacityMetricsChartData}
                          isLoading={data.isLoading}
                          district={data.district}
                          careLevel={data.careLevel}
                          startQuarter={data.startQuarter}
                          endQuarter={data.endQuarter}
                        />
                      </Grid>
                      <Grid item lg={8} md={8} xl={8} xs={12}>
                        <CapacityTable
                          data={data.capacityDataTableData}
                          isLoading={data.isLoading}
                          district={data.district}
                          careLevel={data.careLevel}
                          startQuarter={data.startQuarter}
                          endQuarter={data.endQuarter}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            ) : parentTab === "optimality" ? (
              <>
                <Grid container spacing={3}>
                  <Grid item xs={12} style={{ paddingTop: 10 }}>
                    <Paper className={classes.paper} elevation={0}>
                      <Grid item lg={12} md={6} xl={6} xs={12}>
                        <AppBar
                          position="static"
                          className={classes.sub_appBar}
                          elevation={0}
                        >
                          <Tabs
                            className={classes.tabs}
                            value={value}
                            onChange={handleChange}
                            aria-label="Optimality tabs"
                            TabIndicatorProps={{
                              style: { backgroundColor: "#B2C0D6" },
                            }}
                          >
                            <TabStyle {...a11yProps(0)} label="CCE" />
                            <TabStyle {...a11yProps(1)} label="SITE" />
                          </Tabs>
                        </AppBar>
                      </Grid>
                      <Grid item lg={12} md={12} xl={12} xs={12}>
                        <TabPanel value={value} index={0}>
                          <Grid
                            container
                            spacing={3}
                            className={classes.C_section}
                          >
                            <Grid item lg={3} md={3} xl={3} xs={12}>
                              <Grid
                                container
                                direction="column"
                                justify="space-evenly"
                                alignItems="flex-start"
                                style={{ maxHeight: 630 }}
                              >
                                <Grid
                                  item
                                  xs={12}
                                  style={{ maxHeight: 100, width: 650 }}
                                >
                                  <Card
                                    title={"CCE Optimality"}
                                    showPercentage={true}
                                    metric={CCE_dvs_optimality_percentage}
                                    metric2={CCE_hf_optimality_percentage}
                                    isLoading={data.isLoading && data.isLoading}
                                  />
                                </Grid>
                                <Grid
                                  item
                                  xs={12}
                                  style={{
                                    marginTop: 120,
                                    height: 385,
                                    width: 650,
                                  }}
                                >
                                  <OptimalityStatusBarChart
                                    data={data.optimalityMetricsChartData}
                                    isLoading={data.isLoading}
                                    district={data.district}
                                    year={data.year}
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item lg={9} md={9} xl={9} xs={12}>
                              <OptimalityTable
                                data={data.optimalityDataTableData}
                                isLoading={data.isLoading}
                                district={data.district}
                                careLevel={data.careLevel}
                                year={data.year}
                              />
                            </Grid>
                          </Grid>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                          <Grid
                            container
                            spacing={3}
                            className={classes.C_section}
                          >
                            <Grid item lg={3} md={3} xl={3} xs={12}>
                              <Grid
                                container
                                direction="column"
                                justify="space-evenly"
                                alignItems="flex-start"
                                style={{ maxHeight: 630 }}
                              >
                                <Grid
                                  item
                                  xs={12}
                                  style={{ maxHeight: 100, width: 650 }}
                                >
                                  <Card
                                    title={"Site Optimality"}
                                    showPercentage={true}
                                    metric={SITE_dvs_optimality_percentage}
                                    metric2={SITE_hf_optimality_percentage}
                                    isLoading={data.isLoading && data.isLoading}
                                  />
                                </Grid>
                                <Grid
                                  item
                                  xs={12}
                                  style={{
                                    marginTop: 120,
                                    height: 385,
                                    width: 650,
                                  }}
                                >
                                  <OptimalityStatusBarChart
                                    data={data.optimalityMetricsChartData}
                                    isLoading={data.isLoading}
                                    district={data.district}
                                    year={data.year}
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item lg={9} md={9} xl={9} xs={12}>
                              <OptimalityTable
                                data={data.optimalityDataTableData}
                                isLoading={data.isLoading}
                                district={data.district}
                                careLevel={data.careLevel}
                                year={data.year}
                              />
                            </Grid>
                          </Grid>
                        </TabPanel>
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>
              </>
            ) : (
              <>
                <Grid container spacing={3}>
                  <Grid item xs={12} style={{ paddingTop: 10 }}>
                    <Paper className={classes.paper} elevation={0}>
                      <Grid item lg={12} md={6} xl={6} xs={12}>
                        <AppBar
                          position="static"
                          className={classes.sub_appBar}
                          elevation={0}
                        >
                          <Tabs
                            className={classes.tabs}
                            value={value}
                            onChange={handleChange}
                            aria-label="Temperature monitoring tabs"
                            TabIndicatorProps={{
                              style: { backgroundColor: "#B2C0D6" },
                            }}
                          >
                            <TabStyle
                              {...a11yProps(0)}
                              label="Reporting Rate"
                            />
                            <TabStyle
                              {...a11yProps(1)}
                              label="Temperature Alarms"
                            />
                          </Tabs>
                        </AppBar>
                      </Grid>
                      <Grid item lg={12} md={12} xl={12} xs={12}>
                        <TabPanel value={value} index={0}>
                          <Grid
                            container
                            spacing={3}
                            className={classes.C_section}
                          >
                            <Grid
                              item
                              lg={5}
                              md={5}
                              xl={5}
                              xs={12}
                              style={{ maxHeight: 630 }}
                            >
                              <TemperatureMonitoringReportRateChart
                                data={
                                  data.temperatureMonitoringReportingRatesData
                                }
                                isLoading={data.isLoading}
                                district={data.district}
                                month={data.month}
                                year={data.year}
                              />
                            </Grid>
                            <Grid item lg={7} md={7} xl={7} xs={12}>
                              <TemperatureMonitoringReportRateHeatMap
                                data={
                                  data.temperatureMonitoringReportingRatesData
                                }
                                isLoading={data.isLoading}
                                district={data.district}
                                month={data.month}
                                year={data.year}
                              />
                            </Grid>
                          </Grid>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                          <Grid
                            container
                            spacing={3}
                            className={classes.C_section}
                          >
                            <Grid
                              item
                              lg={5}
                              md={5}
                              xl={5}
                              xs={12}
                              style={{ maxHeight: 630 }}
                            >
                              <TemperatureMonitoringBarChart
                                data={
                                  data.temperatureMonitoringMetricsChartData
                                }
                                isLoading={data.isLoading}
                                district={data.district}
                                month={data.month}
                                year={data.year}
                              />
                            </Grid>
                            <Grid item lg={7} md={7} xl={7} xs={12}>
                              <TemperatureMonitoringTable
                                data={data.temperatureMonitoringDataTableData}
                                isLoading={data.isLoading}
                                district={data.district}
                                month={data.month}
                                year={data.year}
                              />
                            </Grid>
                          </Grid>
                        </TabPanel>
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
