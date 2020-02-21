import React, { useState } from "react";
import PropTypes from "prop-types";

// Material components
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

// Coverage By Month components
import AnnualizedCoverageForVaccineMap from "./AnnualizedCoverageForVaccineMap/index";
import CoverageForAntigensChart from "./AnnualizedCoverageForAntigensChart/index";

// Coverage by year
import AntigenCoverageChart from "./AntigenCoverageChart/index";

// Dropout Rate
import DropoutRateCoverageForVaccineMap from "./DropoutRateCoverageVaccineMap/index";
import DropoutRateForAntigensChart from "./DropoutRateCoverageForAntigenChart/index";

// Redcategorisation
import RedCategorisationForAntigensChart from "./RedcategorisationCoverageForAntigenChart/index";
import RedCategorisationCoverageForVaccineMap from "./RedcategorisationCoverageVaccineMap/index";

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
    "aria-controls": `coverage-by-months-tabpanel-${index}`
  };
}

const TabStyle = withStyles(theme => ({
  root: {
    padding: "1rem 0",
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: 12,
    "&:hover": {
      backgroundColor: "#B2C0D6",
      color: "black",
      opacity: 1
    },
    "&$selected": {
      backgroundColor: "#B2C0D6",
      color: "black",
      fontWeight: theme.typography.fontWeightMedium,
      fontSize: 12
    }
  },
  selected: {}
}))(props => <Tab {...props} />);

export default function Coverage(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const { data, parentTab } = props;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {parentTab === "yearlyCoverage" ? (
        <Grid container spacing={3}>
          <Grid item xs={12} style={{ paddingTop: 40 }}>
            <Paper className={classes.paper} elevation={0}>
              <Grid
                item
                lg={12}
                md={12}
                xl={12}
                xs={12}
                className={classes.chartDiv}
              >
                <AntigenCoverageChart
                  data={data && data.vacineData}
                  startYear={data && data.startYear}
                  endYear={data && data.endYear}
                  isLoading={data && data.isLoading}
                  vaccineName={data && data.vaccineName}
                  district={data && data.district}
                />
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      ) : (
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
                    aria-label="Coverage by month tabs"
                    TabIndicatorProps={{
                      style: { backgroundColor: "#B2C0D6" }
                    }}
                  >
                    <TabStyle {...a11yProps(0)} label="Annualized (CY)" />
                    <TabStyle {...a11yProps(1)} label="Monthly (CY)" />
                    <TabStyle {...a11yProps(2)} label="Annualized (FY)" />
                    <TabStyle {...a11yProps(3)} label="Monthly (FY)" />
                  </Tabs>
                </AppBar>
              </Grid>
              <Grid item lg={12} md={12} xl={12} xs={12}>
                <TabPanel value={value} index={0}>
                  <Grid container spacing={3} className={classes.C_section}>
                    {data && data.district[0] === "National" ? (
                      <>
                        <Grid item lg={5} md={5} xl={5} xs={12}>
                          {parentTab === "monthlyCoverage" ? (
                            <>
                              <AnnualizedCoverageForVaccineMap
                                data={data && data.vacineDataForMap}
                                tabTitle={"Annualized (CY)"}
                                dose={data && data.dose}
                                startYear={data && data.startYear}
                                endYear={data && data.endYear}
                                vaccineName={data && data.vaccineName}
                                isLoading={data && data.isLoading}
                                reportYear={"CY"}
                              />
                            </>
                          ) : (
                            <>
                              <DropoutRateCoverageForVaccineMap
                                data={data && data.vacineDataForMap}
                                tabTitle={"Annualized (CY)"}
                                dose={data && data.dose}
                                startYear={data && data.startYear}
                                endYear={data && data.endYear}
                                vaccineName={data && data.vaccineName}
                                isLoading={data && data.isLoading}
                              />
                            </>
                          )}
                        </Grid>
                        <Grid item lg={7} md={7} xl={7} xs={12}>
                          {parentTab === "monthlyCoverage" ? (
                            <>
                              <CoverageForAntigensChart
                                data={data && data.vaccineDosesForChart}
                                tabTitle={"Annualized (CY)"}
                                vaccineName={data && data.vaccineName}
                                dose={data && data.dose}
                                isLoading={data && data.isLoading}
                                startYear={data && data.startYear}
                                endYear={data && data.endYear}
                                reportYear={"CY"}
                                district={data && data.district}
                              />
                            </>
                          ) : (
                            <>
                              <DropoutRateForAntigensChart
                                data={data && data.vaccineDosesForChart}
                                tabTitle={"Annualized (CY)"}
                                vaccineName={data && data.vaccineName}
                                dose={data && data.dose}
                                isLoading={data && data.isLoading}
                                startYear={data && data.startYear}
                                endYear={data && data.endYear}
                                reportYear={"CY"}
                                district={data && data.district}
                              />
                            </>
                          )}
                        </Grid>
                      </>
                    ) : data && data.district[0] === undefined ? (
                      <>
                        <Grid item lg={5} md={5} xl={5} xs={12}>
                          <RedCategorisationCoverageForVaccineMap
                            data={data && data.vacineDataForMap}
                            tabTitle={"Annualized (CY)"}
                            dose={data && data.dose}
                            endYear={data && data.endYear}
                            vaccineName={data && data.vaccineName}
                            isLoading={data && data.isLoading}
                          />
                        </Grid>
                        <Grid item lg={7} md={7} xl={7} xs={12}>
                          <RedCategorisationForAntigensChart
                            data={data && data.vaccineDosesForChart}
                            tabTitle={"Annualized (CY)"}
                            vaccineName={data && data.vaccineName}
                            dose={data && data.dose}
                            isLoading={data && data.isLoading}
                            startYear={data && data.startYear}
                            endYear={data && data.endYear}
                            reportYear={"CY"}
                          />
                        </Grid>{" "}
                      </>
                    ) : (
                      <>
                        <Grid item lg={12} md={12} xl={12} xs={12}>
                          <CoverageForAntigensChart
                            data={data && data.vaccineDosesForChart}
                            tabTitle={"Annualized (CY)"}
                            vaccineName={data && data.vaccineName}
                            dose={data && data.dose}
                            isLoading={data && data.isLoading}
                            startYear={data && data.startYear}
                            endYear={data && data.endYear}
                            reportYear={"CY"}
                            district={data && data.district}
                          />
                        </Grid>
                      </>
                    )}
                  </Grid>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <Grid container spacing={3} className={classes.C_section}>
                    {data && data.district[0] === "National" ? (
                      <>
                        <Grid item lg={5} md={5} xl={5} xs={12}>
                          {parentTab === "monthlyCoverage" ? (
                            <>
                              <AnnualizedCoverageForVaccineMap
                                data={data && data.vacineDataForMap}
                                tabTitle={"Monthly (CY)"}
                                dose={data && data.dose}
                                endYear={data && data.endYear}
                                vaccineName={data && data.vaccineName}
                                isLoading={data && data.isLoading}
                                reportYear={"CY"}
                                startYear={data && data.startYear}
                              />
                            </>
                          ) : (
                            <DropoutRateCoverageForVaccineMap
                              data={data && data.vacineDataForMap}
                              tabTitle={"Monthly (CY)"}
                              dose={data && data.dose}
                              endYear={data && data.endYear}
                              vaccineName={data && data.vaccineName}
                              isLoading={data && data.isLoading}
                              reportYear={"CY"}
                              startYear={data && data.startYear}
                            />
                          )}
                        </Grid>
                        <Grid item lg={7} md={7} xl={7} xs={12}>
                          {parentTab === "monthlyCoverage" ? (
                            <>
                              <CoverageForAntigensChart
                                data={data && data.vaccineDosesForChart}
                                tabTitle={"Monthly (CY)"}
                                vaccineName={data && data.vaccineName}
                                dose={data && data.dose}
                                isLoading={data && data.isLoading}
                                startYear={data && data.startYear}
                                endYear={data && data.endYear}
                                reportYear={"CY"}
                                district={data && data.district}
                              />
                            </>
                          ) : parentTab === "dropoutRate" ? (
                            <>
                              {" "}
                              <DropoutRateForAntigensChart
                                data={data && data.vaccineDosesForChart}
                                tabTitle={"Monthly (CY)"}
                                vaccineName={data && data.vaccineName}
                                dose={data && data.dose}
                                isLoading={data && data.isLoading}
                                startYear={data && data.startYear}
                                endYear={data && data.endYear}
                                reportYear={"CY"}
                                district={data && data.district}
                              />{" "}
                            </>
                          ) : (
                            <> </>
                          )}
                        </Grid>
                      </>
                    ) : data && data.district[0] === undefined ? (
                      <>
                        <Grid item lg={5} md={5} xl={5} xs={12}>
                          <RedCategorisationCoverageForVaccineMap
                            data={data && data.vacineDataForMap}
                            tabTitle={"Monthly (CY)"}
                            dose={data && data.dose}
                            endYear={data && data.endYear}
                            vaccineName={data && data.vaccineName}
                            isLoading={data && data.isLoading}
                          />
                        </Grid>
                        <Grid item lg={7} md={7} xl={7} xs={12}>
                          <RedCategorisationForAntigensChart
                            data={data && data.vaccineDosesForChart}
                            tabTitle={"Monthly (CY)"}
                            vaccineName={data && data.vaccineName}
                            dose={data && data.dose}
                            isLoading={data && data.isLoading}
                            startYear={data && data.startYear}
                            endYear={data && data.endYear}
                            reportYear={"CY"}
                          />
                        </Grid>{" "}
                      </>
                    ) : (
                      <>
                        <Grid item lg={12} md={12} xl={12} xs={12}>
                          <CoverageForAntigensChart
                            data={data && data.vaccineDosesForChart}
                            tabTitle={"Monthly (CY)"}
                            vaccineName={data && data.vaccineName}
                            dose={data && data.dose}
                            isLoading={data && data.isLoading}
                            startYear={data && data.startYear}
                            endYear={data && data.endYear}
                            reportYear={"CY"}
                            district={data && data.district}
                          />
                        </Grid>
                      </>
                    )}
                  </Grid>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <Grid container spacing={3} className={classes.C_section}>
                    {data && data.district[0] === "National" ? (
                      <>
                        <Grid item lg={5} md={5} xl={5} xs={12}>
                          {parentTab === "monthlyCoverage" ? (
                            <>
                              <AnnualizedCoverageForVaccineMap
                                data={data && data.vacineDataForMap}
                                tabTitle={"Annualized (FY)"}
                                dose={data && data.dose}
                                endYear={data && data.endYear}
                                vaccineName={data && data.vaccineName}
                                isLoading={data && data.isLoading}
                                reportYear={"FY"}
                                startYear={data && data.startYear}
                              />
                            </>
                          ) : (
                            <DropoutRateCoverageForVaccineMap
                              data={data && data.vacineDataForMap}
                              tabTitle={"Annualized (FY)"}
                              dose={data && data.dose}
                              endYear={data && data.endYear}
                              vaccineName={data && data.vaccineName}
                              isLoading={data && data.isLoading}
                              reportYear={"FY"}
                              startYear={data && data.startYear}
                            />
                          )}
                        </Grid>
                        <Grid item lg={7} md={7} xl={7} xs={12}>
                          {parentTab === "monthlyCoverage" ? (
                            <>
                              <CoverageForAntigensChart
                                data={data && data.vaccineDosesForChart}
                                tabTitle={"Annualized (FY)"}
                                vaccineName={data && data.vaccineName}
                                dose={data && data.dose}
                                isLoading={data && data.isLoading}
                                startYear={data && data.startYear}
                                endYear={data && data.endYear}
                                reportYear={"FY"}
                                district={data && data.district}
                              />
                            </>
                          ) : parentTab === "dropoutRate" ? (
                            <>
                              {" "}
                              <DropoutRateForAntigensChart
                                data={data && data.vaccineDosesForChart}
                                tabTitle={"Annualized (FY)"}
                                vaccineName={data && data.vaccineName}
                                dose={data && data.dose}
                                isLoading={data && data.isLoading}
                                startYear={data && data.startYear}
                                endYear={data && data.endYear}
                                reportYear={"FY"}
                                district={data && data.district}
                              />{" "}
                            </>
                          ) : (
                            <> </>
                          )}
                        </Grid>
                      </>
                    ) : data && data.district[0] === undefined ? (
                      <>
                        <Grid item lg={5} md={5} xl={5} xs={12}>
                          <RedCategorisationCoverageForVaccineMap
                            data={data && data.vacineDataForMap}
                            tabTitle={"Annualized (FY)"}
                            dose={data && data.dose}
                            endYear={data && data.endYear}
                            vaccineName={data && data.vaccineName}
                            isLoading={data && data.isLoading}
                          />
                        </Grid>
                        <Grid item lg={7} md={7} xl={7} xs={12}>
                          <RedCategorisationForAntigensChart
                            data={data && data.vaccineDosesForChart}
                            tabTitle={"Annualized (FY)"}
                            vaccineName={data && data.vaccineName}
                            dose={data && data.dose}
                            isLoading={data && data.isLoading}
                            startYear={data && data.startYear}
                            endYear={data && data.endYear}
                            reportYear={"FY"}
                          />
                        </Grid>{" "}
                      </>
                    ) : (
                      <>
                        <Grid item lg={12} md={12} xl={12} xs={12}>
                          <CoverageForAntigensChart
                            data={data && data.vaccineDosesForChart}
                            tabTitle={"Annualized (FY)"}
                            vaccineName={data && data.vaccineName}
                            dose={data && data.dose}
                            isLoading={data && data.isLoading}
                            startYear={data && data.startYear}
                            endYear={data && data.endYear}
                            reportYear={"FY"}
                            district={data && data.district}
                          />
                        </Grid>
                      </>
                    )}
                  </Grid>
                </TabPanel>

                <TabPanel value={value} index={3}>
                  <Grid container spacing={3} className={classes.C_section}>
                    {data && data.district[0] === "National" ? (
                      <>
                        <Grid item lg={5} md={5} xl={5} xs={12}>
                          {parentTab === "monthlyCoverage" ? (
                            <>
                              <AnnualizedCoverageForVaccineMap
                                data={data && data.vacineDataForMap}
                                tabTitle={"Monthly (FY)"}
                                dose={data && data.dose}
                                endYear={data && data.endYear}
                                vaccineName={data && data.vaccineName}
                                isLoading={data && data.isLoading}
                                reportYear={"FY"}
                                startYear={data && data.startYear}
                              />
                            </>
                          ) : (
                            <DropoutRateCoverageForVaccineMap
                              data={data && data.vacineDataForMap}
                              tabTitle={"Monthly (FY)"}
                              dose={data && data.dose}
                              endYear={data && data.endYear}
                              vaccineName={data && data.vaccineName}
                              isLoading={data && data.isLoading}
                              reportYear={"FY"}
                              startYear={data && data.startYear}
                            />
                          )}
                        </Grid>
                        <Grid item lg={7} md={7} xl={7} xs={12}>
                          {parentTab === "monthlyCoverage" ? (
                            <>
                              <CoverageForAntigensChart
                                data={data && data.vaccineDosesForChart}
                                tabTitle={"Monthly (FY)"}
                                vaccineName={data && data.vaccineName}
                                dose={data && data.dose}
                                isLoading={data && data.isLoading}
                                startYear={data && data.startYear}
                                endYear={data && data.endYear}
                                reportYear={"FY"}
                                district={data && data.district}
                              />
                            </>
                          ) : parentTab === "dropoutRate" ? (
                            <>
                              {" "}
                              <DropoutRateForAntigensChart
                                data={data && data.vaccineDosesForChart}
                                tabTitle={"Monthly (FY)"}
                                vaccineName={data && data.vaccineName}
                                dose={data && data.dose}
                                isLoading={data && data.isLoading}
                                startYear={data && data.startYear}
                                endYear={data && data.endYear}
                                reportYear={"FY"}
                                district={data && data.district}
                              />{" "}
                            </>
                          ) : (
                            <> </>
                          )}
                        </Grid>
                      </>
                    ) : data && data.district[0] === undefined ? (
                      <>
                        <Grid item lg={5} md={5} xl={5} xs={12}>
                          <RedCategorisationCoverageForVaccineMap
                            data={data && data.vacineDataForMap}
                            tabTitle={"Monthly (FY)"}
                            dose={data && data.dose}
                            endYear={data && data.endYear}
                            vaccineName={data && data.vaccineName}
                            isLoading={data && data.isLoading}
                          />
                        </Grid>
                        <Grid item lg={7} md={7} xl={7} xs={12}>
                          <RedCategorisationForAntigensChart
                            data={data && data.vaccineDosesForChart}
                            tabTitle={"Monthly (FY)"}
                            vaccineName={data && data.vaccineName}
                            dose={data && data.dose}
                            isLoading={data && data.isLoading}
                            startYear={data && data.startYear}
                            endYear={data && data.endYear}
                            reportYear={"FY"}
                          />
                        </Grid>{" "}
                      </>
                    ) : (
                      <>
                        <Grid item lg={12} md={12} xl={12} xs={12}>
                          <CoverageForAntigensChart
                            data={data && data.vaccineDosesForChart}
                            tabTitle={"Monthly (FY)"}
                            vaccineName={data && data.vaccineName}
                            dose={data && data.dose}
                            isLoading={data && data.isLoading}
                            startYear={data && data.startYear}
                            endYear={data && data.endYear}
                            reportYear={"FY"}
                            district={data && data.district}
                          />
                        </Grid>
                      </>
                    )}
                  </Grid>
                </TabPanel>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      )}
    </>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};
