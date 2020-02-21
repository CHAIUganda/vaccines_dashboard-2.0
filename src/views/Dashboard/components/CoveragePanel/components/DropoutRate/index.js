import React, { useState } from "react";
import PropTypes from "prop-types";

// Material components
import { Grid } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

// Custom components

import DropoutRateForAntigensChart from "../Coverage/DropoutRateCoverageForAntigenChart/index";
import DropoutRateCoverageForVaccineMap from "../Coverage/DropoutRateCoverageVaccineMap/index";

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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  divider: {
    marginBottom: 20
  },
  tabsDiv: {
    flexGrow: 1,
    backgroundColor: "#F9F9FC",
    fontFamily: "Open Sans"
  },
  appBar: {
    backgroundColor: "white",
    width: 640,
    marginLeft: 500,
    borderRadius: "10px"
  },
  tabs: {
    padding: "0rem",
    color: "#28354A",
    fontFamily: "Open Sans",
    fontSize: "1rem",
    border: "1px solid #B2C0D6 !important",
    borderRadius: "5px"
  },
  section: {
    paddingTop: 40,
    height: 582
  }
}));

const TabStyle = withStyles(theme => ({
  root: {
    padding: "1rem 0",
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    // fontSize: "1.2rem",
    // fontFamily: ["-apple-system", "BlinkMacSystemFont", "Roboto"].join(","),
    "&:hover": {
      backgroundColor: "#B2C0D6",
      color: "black",
      opacity: 1
    },
    "&$selected": {
      backgroundColor: "#B2C0D6",
      color: "black",
      fontWeight: theme.typography.fontWeightMedium
    }
  },
  selected: {}
}))(props => <Tab {...props} />);

export default function DropoutRate(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const {
    vacineDataForMap,
    vaccineDosesForChart,
    vaccineName,
    dose,
    isLoading,
    startYear,
    endYear,
    district
  } = props;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.tabsDiv}>
      <AppBar position="static" className={classes.appBar} elevation={0}>
        <Tabs
          className={classes.tabs}
          value={value}
          onChange={handleChange}
          aria-label="Dropout rate tabs"
          TabIndicatorProps={{ style: { backgroundColor: "#B2C0D6" } }}
        >
          <TabStyle {...a11yProps(0)} label="Annualized (CY)" />
          <TabStyle {...a11yProps(1)} label="Monthly (CY)" />
          <TabStyle {...a11yProps(2)} label="Annualized (FY)" />
          <TabStyle {...a11yProps(3)} label="Monthly (FY)" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Grid container spacing={3} className={classes.section}>
          {district === "National" ? (
            <>
              <Grid item lg={5} md={5} xl={5} xs={5}>
                <DropoutRateCoverageForVaccineMap
                  data={vacineDataForMap && vacineDataForMap}
                  tabTitle={"Annualized (CY)"}
                  dose={dose && dose}
                  startYear={startYear}
                  endYear={endYear}
                  vaccineName={vaccineName && vaccineName}
                  isLoading={isLoading && isLoading}
                />
              </Grid>
              <Grid item lg={7} md={7} xl={7} xs={7}>
                <DropoutRateForAntigensChart
                  data={vaccineDosesForChart && vaccineDosesForChart}
                  tabTitle={"Annualized (CY)"}
                  vaccineName={vaccineName && vaccineName}
                  dose={dose && dose}
                  isLoading={isLoading && isLoading}
                  startYear={startYear}
                  endYear={endYear}
                  reportYear={"CY"}
                  district={district}
                />
              </Grid>
            </>
          ) : (
            <>
              <Grid item lg={12} md={12} xl={12} xs={12}>
                <DropoutRateForAntigensChart
                  data={vaccineDosesForChart && vaccineDosesForChart}
                  tabTitle={"Annualized (CY)"}
                  vaccineName={vaccineName && vaccineName}
                  dose={dose && dose}
                  isLoading={isLoading && isLoading}
                  startYear={startYear}
                  endYear={endYear}
                  reportYear={"CY"}
                  district={district}
                />
              </Grid>
            </>
          )}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container spacing={3} className={classes.section}>
          {district === "National" ? (
            <>
              <Grid item lg={5} md={5} xl={5} xs={5}>
                <DropoutRateCoverageForVaccineMap
                  data={vacineDataForMap && vacineDataForMap}
                  tabTitle={"Monthly (CY)"}
                  dose={dose && dose}
                  endYear={endYear}
                  vaccineName={vaccineName && vaccineName}
                  isLoading={isLoading && isLoading}
                  reportYear={"CY"}
                  startYear={startYear}
                />
              </Grid>
              <Grid item lg={7} md={7} xl={7} xs={7}>
                <DropoutRateForAntigensChart
                  data={vaccineDosesForChart && vaccineDosesForChart}
                  tabTitle={"Monthly (CY)"}
                  vaccineName={vaccineName && vaccineName}
                  dose={dose && dose}
                  isLoading={isLoading && isLoading}
                  startYear={startYear}
                  endYear={endYear}
                  reportYear={"CY"}
                  district={district}
                />
              </Grid>
            </>
          ) : (
            <>
              <Grid item lg={12} md={12} xl={12} xs={12}>
                <DropoutRateForAntigensChart
                  data={vaccineDosesForChart && vaccineDosesForChart}
                  tabTitle={"Monthly (CY)"}
                  vaccineName={vaccineName && vaccineName}
                  dose={dose && dose}
                  isLoading={isLoading && isLoading}
                  startYear={startYear}
                  endYear={endYear}
                  reportYear={"CY"}
                  district={district}
                />
              </Grid>
            </>
          )}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Grid container spacing={3} className={classes.section}>
          {district === "National" ? (
            <>
              <Grid item lg={5} md={5} xl={5} xs={5}>
                <DropoutRateCoverageForVaccineMap
                  data={vacineDataForMap && vacineDataForMap}
                  tabTitle={"Annualized (FY)"}
                  dose={dose && dose}
                  endYear={endYear}
                  vaccineName={vaccineName && vaccineName}
                  isLoading={isLoading && isLoading}
                  reportYear={"FY"}
                  startYear={startYear}
                />
              </Grid>
              <Grid item lg={7} md={7} xl={7} xs={7}>
                <DropoutRateForAntigensChart
                  data={vaccineDosesForChart && vaccineDosesForChart}
                  tabTitle={"Annualized (FY)"}
                  vaccineName={vaccineName && vaccineName}
                  dose={dose && dose}
                  isLoading={isLoading && isLoading}
                  startYear={startYear}
                  endYear={endYear}
                  reportYear={"FY"}
                  district={district}
                />
              </Grid>
            </>
          ) : (
            <>
              <Grid item lg={12} md={12} xl={12} xs={12}>
                <DropoutRateForAntigensChart
                  data={vaccineDosesForChart && vaccineDosesForChart}
                  tabTitle={"Annualized (FY)"}
                  vaccineName={vaccineName && vaccineName}
                  dose={dose && dose}
                  isLoading={isLoading && isLoading}
                  startYear={startYear}
                  endYear={endYear}
                  reportYear={"FY"}
                  district={district}
                />
              </Grid>
            </>
          )}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Grid container spacing={3} className={classes.section}>
          {district === "National" ? (
            <>
              <Grid item lg={5} md={5} xl={5} xs={5}>
                <DropoutRateCoverageForVaccineMap
                  data={vacineDataForMap && vacineDataForMap}
                  tabTitle={"Monthly (FY)"}
                  dose={dose && dose}
                  endYear={endYear}
                  vaccineName={vaccineName && vaccineName}
                  isLoading={isLoading && isLoading}
                  reportYear={"FY"}
                  startYear={startYear}
                />
              </Grid>
              <Grid item lg={7} md={7} xl={7} xs={7}>
                <DropoutRateForAntigensChart
                  data={vaccineDosesForChart && vaccineDosesForChart}
                  tabTitle={"Monthly (FY)"}
                  vaccineName={vaccineName && vaccineName}
                  dose={dose && dose}
                  isLoading={isLoading && isLoading}
                  startYear={startYear}
                  endYear={endYear}
                  reportYear={"FY"}
                  district={district}
                />
              </Grid>
            </>
          ) : (
            <>
              <Grid item lg={12} md={12} xl={12} xs={12}>
                <DropoutRateForAntigensChart
                  data={vaccineDosesForChart && vaccineDosesForChart}
                  tabTitle={"Monthly (FY)"}
                  vaccineName={vaccineName && vaccineName}
                  dose={dose && dose}
                  isLoading={isLoading && isLoading}
                  startYear={startYear}
                  endYear={endYear}
                  reportYear={"FY"}
                  district={district}
                />
              </Grid>
            </>
          )}
        </Grid>
      </TabPanel>
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};
