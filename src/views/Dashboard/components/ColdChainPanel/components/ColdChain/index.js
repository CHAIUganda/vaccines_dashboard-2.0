import React, { useState, useMemo, useContext } from 'react';

// Bring in our cold chain context
import { ColdChainContext } from '../../../../../../context/ColdChain/ColdChainState';

// Material components
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

// Shared components
import ColdChainCard from '../../../OverviewPanel/components/ColdChainCard/index';

// Custom components
import EligibilityTable from './EligibilityTable/index';
import EligibilityStatusPieChart from './EligibilityStatusPieChart/index';
import FunctionalityStatusBarChart from './FunctionalityStatusBarChart/index';
import FunctionalityTable from './FunctionalityTable/index';
import CapacityStatusBarChart from './CapacityStatusBarChart/index';
import CapacityTable from './CapacityTable/index';
import OptimalityStatusBarChart from './OptimalityStatusBarChart/index';
import OptimalityTable from './OptimalityTable/index';
import TemperatureMonitoringTable from './TemperatureMonitoringTable/index';
import TemperatureMonitoringBarChart from './TemperatureMonitoringBarChart/index';
import TemperatureMonitoringReportRateChart from './TemperatureMonitoringReportRateChart/index';
import TemperatureMonitoringReportRateHeatMap from './TemperatureMonitoringReportRateHeatMap/index';

// Import common styles
import { useStyles } from '../../../styles';
const mainCardBackgroundColor =
  'linear-gradient(0deg,#1e3c72 0,#1e3c72 1%,#2a5298)';

// const surplusCardBackgroundImage =
//   'linear-gradient(0deg, rgb(36, 197, 63) 0px, rgb(36, 197, 63) 1%, rgb(93, 246, 115))';

// const shortageCardBackgroundImage =
//   'linear-gradient(0deg, #f83245 0px, #f83245 1%, #ff6372)';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component='div'
      role='tabpanel'
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
    'aria-controls': `coverage-by-months-tabpanel-${index}`,
  };
}

const TabStyle = withStyles((theme) => ({
  root: {
    padding: '1rem 0',
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: 12,
    '&:hover': {
      backgroundColor: '#B2C0D6',
      color: 'black',
      opacity: 1,
    },
    '&$selected': {
      backgroundColor: '#B2C0D6',
      color: 'black',
      fontWeight: theme.typography.fontWeightMedium,
      fontSize: 12,
    },
  },
  selected: {},
}))((props) => <Tab {...props} />);

export default function ColdChain({ parentTab }) {
  // Grab our context

  const { eligibility, functionality, capacity, optimality } = useContext(
    ColdChainContext,
  );

  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const eligibleFacilities = new Intl.NumberFormat('lg-UG').format(
    eligibility?.eligibilityMetricsChartData?.total_eligible_facilities,
  );

  const functionality_percentage =
    Math.round(
      functionality?.functionalityMetricsChartData
        ?.filter((a) => a.functionality_percentage)
        ?.map((d) => d.functionality_percentage),
    ) || 0;

  // const capacity_shortage_negative =
  //   capacity?.capacityMetricsChartData?.gap_metrics.negative_gap_percentage;

  // const capacity_shortage_positive =
  //   capacity?.capacityMetricsChartData?.gap_metrics.positive_gap_percentage;

  const totalAvailableLiters = new Intl.NumberFormat('lg-UG').format(
    capacity?.capacityMetricsChartData?.overall_total_available,
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
            {parentTab === 'functionality' || parentTab === 'eligibility' ? (
              <>
                <Grid
                  container
                  spacing={3}
                  className={classes.DST_section}
                  style={{ paddingTop: 50, height: 775, width: '100%' }}
                >
                  <Grid item lg={3} md={3} xl={3} xs={12}>
                    <Grid
                      container
                      direction='column'
                      justify='space-evenly'
                      alignItems='flex-start'
                      spacing={3}
                    >
                      <Grid item xs={12} style={{ width: '100%', height: 200 }}>
                        {parentTab === 'eligibility' ? (
                          <>
                            <ColdChainCard
                              title={'Eligible Facilities'}
                              type='advanced'
                              metric={eligibleFacilities}
                              backgroundImage={mainCardBackgroundColor}
                              isLoading={eligibility.isLoading}
                              icon={'UGMap'}
                              module={'coldchain'}
                            />
                          </>
                        ) : (
                          <>
                            <ColdChainCard
                              title={'Functionality'}
                              type='advanced'
                              metric={functionality_percentage}
                              isPercentage
                              backgroundImage={mainCardBackgroundColor}
                              isLoading={functionality.isLoading}
                              module={'coldchain'}
                            />
                          </>
                        )}
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        style={{ width: '100%', height: 'calc(775px - 200px)' }}
                      >
                        {parentTab === 'eligibility' ? (
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
                    {parentTab === 'functionality' ? (
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
            ) : parentTab === 'capacity' ? (
              <>
                <Grid
                  container
                  spacing={3}
                  className={classes.DST_section}
                  style={{ paddingTop: 50, height: 775 }}
                >
                  <Grid item xs={12}>
                    <Grid container spacing={3} style={{ height: 200 }}>
                      <Grid item lg={4} md={4} xl={4} xs={12}>
                        <ColdChainCard
                          title={`CCE Sufficiency`}
                          metric={totalAvailableLiters}
                          sign={'ltrs'}
                          backgroundImage={mainCardBackgroundColor}
                          isLoading={capacity.isLoading}
                          module={'coldchain'}
                        />
                      </Grid>
                      {/* <Grid item lg={4} md={4} xl={4} xs={12}>
                        <ColdChainCard
                          title={"Shortage (-ve Gap)"}
                          metric={capacity_shortage_negative}
                          isPercentage
                          backgroundImage={shortageCardBackgroundImage}
                          isLoading={capacity.isLoading}
                          module={"coldchain"}
                        />
                      </Grid>
                      <Grid item lg={4} md={4} xl={4} xs={12}>
                        <ColdChainCard
                          title={"Filled Capacity"}
                          metric={capacity_shortage_positive}
                          isPercentage
                          backgroundImage={surplusCardBackgroundImage}
                          isLoading={capacity.isLoading}
                          module={"coldchain"}
                        />
                      </Grid> */}
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid
                      container
                      spacing={3}
                      style={{ height: 'calc(775px - 200px)' }}
                    >
                      <Grid item lg={4} md={4} xl={4} xs={12}>
                        <CapacityStatusBarChart />
                      </Grid>
                      <Grid item lg={8} md={8} xl={8} xs={12}>
                        <CapacityTable />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            ) : parentTab === 'optimality' ? (
              <>
                <Grid container spacing={3}>
                  <Grid item xs={12} style={{ paddingTop: 10 }}>
                    <Paper className={classes.paper} elevation={0}>
                      <Grid item lg={12} md={6} xl={6} xs={12}>
                        <AppBar
                          position='static'
                          className={classes.sub_appBar}
                          elevation={0}
                        >
                          <Tabs
                            className={classes.tabs}
                            value={value}
                            onChange={handleChange}
                            aria-label='Optimality tabs'
                            TabIndicatorProps={{
                              style: { backgroundColor: '#B2C0D6' },
                            }}
                          >
                            <TabStyle {...a11yProps(0)} label='CCE' />
                            <TabStyle {...a11yProps(1)} label='SITE' />
                          </Tabs>
                        </AppBar>
                      </Grid>
                      <Grid item lg={12} md={12} xl={12} xs={12}>
                        <TabPanel value={value} index={0}>
                          <Grid
                            container
                            spacing={3}
                            className={classes.C_section}
                            style={{
                              height: 735,
                              width: '100%',
                            }}
                          >
                            <Grid item lg={3} md={3} xl={3} xs={12}>
                              <Grid
                                container
                                direction='column'
                                justify='space-evenly'
                                alignItems='flex-start'
                                spacing={3}
                              >
                                <Grid
                                  item
                                  xs={12}
                                  style={{ width: '100%', height: 200 }}
                                >
                                  <ColdChainCard
                                    type='advanced'
                                    title={'CCE Optimality'}
                                    isPercentage
                                    metric={CCE_dvs_optimality_percentage}
                                    metric2={CCE_hf_optimality_percentage}
                                    isLoading={optimality.isLoading}
                                    backgroundImage={mainCardBackgroundColor}
                                    module={'coldchain'}
                                  />
                                </Grid>
                                <Grid
                                  item
                                  xs={12}
                                  style={{
                                    width: '100%',
                                    height: 'calc(735px - 200px)',
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
                            style={{
                              height: 735,
                              width: '100%',
                            }}
                          >
                            <Grid item lg={3} md={3} xl={3} xs={12}>
                              <Grid
                                container
                                direction='column'
                                justify='space-evenly'
                                alignItems='flex-start'
                                spacing={3}
                              >
                                <Grid
                                  item
                                  xs={12}
                                  style={{ width: '100%', height: 200 }}
                                >
                                  <ColdChainCard
                                    title={'Site Optimality'}
                                    type='advanced'
                                    isPercentage
                                    metric={SITE_dvs_optimality_percentage}
                                    metric2={SITE_hf_optimality_percentage}
                                    isLoading={optimality.isLoading}
                                    backgroundImage={mainCardBackgroundColor}
                                    module={'coldchain'}
                                  />
                                </Grid>
                                <Grid
                                  item
                                  xs={12}
                                  style={{
                                    width: '100%',
                                    height: 'calc(735px - 200px)',
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
                          position='static'
                          className={classes.sub_appBar}
                          elevation={0}
                        >
                          <Tabs
                            className={classes.tabs}
                            value={value}
                            onChange={handleChange}
                            aria-label='Temperature monitoring tabs'
                            TabIndicatorProps={{
                              style: { backgroundColor: '#B2C0D6' },
                            }}
                          >
                            <TabStyle
                              {...a11yProps(0)}
                              label='Reporting Rate'
                            />
                            <TabStyle
                              {...a11yProps(1)}
                              label='Temperature Alarms'
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
                            style={{
                              height: 735,
                              width: '100%',
                            }}
                          >
                            <Grid item lg={5} md={5} xl={5} xs={12}>
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
                            style={{
                              height: 735,
                              width: '100%',
                            }}
                          >
                            <Grid item lg={5} md={5} xl={5} xs={12}>
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
