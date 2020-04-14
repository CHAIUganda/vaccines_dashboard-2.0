import React, { useState, useMemo, useContext } from "react";

// Bring in our cold chain context
import { ColdChainContext } from "../../../../../../context/ColdChain/ColdChainState";

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

export default function ColdChain({ parentTab }) {
  // Grab our context

  const { eligibility, functionality, capacity, optimality } = useContext(
    ColdChainContext
  );

  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const eligibibleFacilities = new Intl.NumberFormat("lg-UG").format(
    eligibility?.eligibilityMetricsChartData?.total_eligible_facilities
  );

  const functionality_percentage =
    Math.round(
      functionality?.functionalityMetricsChartData
        ?.filter((a) => a.functionality_percentage)
        ?.map((d) => d.functionality_percentage)
    ) || 0;

  const capacity_shortage_negative =
    capacity?.capacityMetricsChartData?.gap_metrics.negative_gap_percentage;

  const capacity_shortage_positive =
    capacity?.capacityMetricsChartData?.gap_metrics.positive_gap_percentage;

  const totalAvailableLiters = new Intl.NumberFormat("lg-UG").format(
    capacity?.capacityMetricsChartData?.overall_total_available
  );

  const CCE_dvs_optimality_percentage =
    optimality?.optimalityMetricsChartData?.dvs;
  const CCE_hf_optimality_percentage =
    optimality?.optimalityMetricsChartData?.hf;
  const SITE_dvs_optimality_percentage =
    optimality?.optimalityMetricsChartData?.dvs_sites;
  const SITE_hf_optimality_percentage =
    optimality?.optimalityMetricsChartData?.hf_sites;

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
                              isLoading={eligibility.isLoading}
                            />
                          </>
                        ) : (
                          <>
                            <Card
                              title={"Functionality"}
                              showPercentage={true}
                              metric={functionality_percentage}
                              isLoading={functionality.isLoading}
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
                            <EligibilityStatusPieChart />
                          </>
                        ) : (
                          <>
                            <FunctionalityStatusBarChart />
                          </>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item lg={9} md={9} xl={9} xs={12}>
                    {parentTab === "functionality" ? (
                      <>
                        <FunctionalityTable />
                      </>
                    ) : (
                      <>
                        <EligibilityTable />
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
                            capacity?.district === "national"
                              ? "at National Level"
                              : "in " + capacity?.district
                          }`}
                          showPercentage={false}
                          metric={totalAvailableLiters}
                          isLoading={capacity.isLoading}
                        />
                      </Grid>
                      <Grid item lg={4} md={4} xl={4} xs={12}>
                        <Card
                          title={"Shortage (-ve Gap)"}
                          metricType={"capacity_neg"}
                          showPercentage={true}
                          metric={capacity_shortage_negative}
                          isLoading={capacity.isLoading}
                        />
                      </Grid>
                      <Grid item lg={4} md={4} xl={4} xs={12}>
                        <Card
                          title={"Surplus (+ve Gap)"}
                          metricType={"capacity_pos"}
                          showPercentage={true}
                          metric={capacity_shortage_positive}
                          isLoading={capacity.isLoading}
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
                        <CapacityStatusBarChart />
                      </Grid>
                      <Grid item lg={8} md={8} xl={8} xs={12}>
                        <CapacityTable />
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
                                    isLoading={optimality.isLoading}
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
                                  <OptimalityStatusBarChart />
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item lg={9} md={9} xl={9} xs={12}>
                              <OptimalityTable />
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
                                    isLoading={optimality.isLoading}
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
                                  <OptimalityStatusBarChart />
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item lg={9} md={9} xl={9} xs={12}>
                              <OptimalityTable />
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
                              <TemperatureMonitoringReportRateChart />
                            </Grid>
                            <Grid item lg={7} md={7} xl={7} xs={12}>
                              <TemperatureMonitoringReportRateHeatMap />
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
                              <TemperatureMonitoringBarChart />
                            </Grid>
                            <Grid item lg={7} md={7} xl={7} xs={12}>
                              <TemperatureMonitoringTable />
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
