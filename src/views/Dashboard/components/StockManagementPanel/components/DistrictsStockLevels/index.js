import React, { useState } from "react";
import PropTypes from "prop-types";

// Material components
import { Grid } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

// Custom components

import StockBalancesTable from "./StockBalancesTable/index";
import StockBalancesPieChart from "./StockBalancesPieChart/index";

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
    padding: "1rem 1rem",
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
    height: 630
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

export default function DistrictsStockLevels(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const {
    atHandStockLevelsData,
    stockByDistrictVaccineData,
    isLoading,
    endMonth,
    startMonth,
    district,
    vaccine
  } = props;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.tabsDiv}>
      <TabPanel value={value} index={0}>
        <Grid container spacing={3} className={classes.section}>
          <Grid item lg={5} md={5} xl={5} xs={5}>
            <StockBalancesPieChart
              data={atHandStockLevelsData}
              isLoading={isLoading}
              endMonth={endMonth}
              startMonth={startMonth}
              district={district}
              vaccine={vaccine}
            />
          </Grid>
          <Grid item lg={7} md={7} xl={7} xs={7}>
            <StockBalancesTable
              data={atHandStockLevelsData}
              isLoading={isLoading}
              endMonth={endMonth}
              startMonth={startMonth}
              district={district}
              vaccine={vaccine}
            />
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container spacing={3} className={classes.section}>
          <Grid item lg={5} md={5} xl={5} xs={5}>
            {/* <AnnualizedCoverageForVaccineMap
              data={vacineDataForMap && vacineDataForMap}
              tabTitle={"Monthly (CY)"}
              dose={dose && dose}
              endYear={endYear}
              vaccineName={vaccineName && vaccineName}
              isLoading={isLoading && isLoading}
              reportYear={"CY"}
              startYear={startYear}
            /> */}
          </Grid>
          <Grid item lg={7} md={7} xl={7} xs={7}>
            {/* <CoverageForAntigensChart
              data={vaccineDosesForChart && vaccineDosesForChart}
              tabTitle={"Monthly (CY)"}
              vaccineName={vaccineName && vaccineName}
              dose={dose && dose}
              isLoading={isLoading && isLoading}
              startYear={startYear}
              endYear={endYear}
              reportYear={"CY"}
            /> */}
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Grid container spacing={3} className={classes.section}>
          <Grid item lg={5} md={5} xl={5} xs={5}>
            {/* <AnnualizedCoverageForVaccineMap
              data={vacineDataForMap && vacineDataForMap}
              tabTitle={"Annualized (FY)"}
              dose={dose && dose}
              endYear={endYear}
              vaccineName={vaccineName && vaccineName}
              isLoading={isLoading && isLoading}
              reportYear={"FY"}
              startYear={startYear}
            /> */}
          </Grid>
          <Grid item lg={7} md={7} xl={7} xs={7}>
            {/* <CoverageForAntigensChart
              data={vaccineDosesForChart && vaccineDosesForChart}
              tabTitle={"Annualized (FY)"}
              vaccineName={vaccineName && vaccineName}
              dose={dose && dose}
              isLoading={isLoading && isLoading}
              startYear={startYear}
              endYear={endYear}
              reportYear={"FY"}
            /> */}
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Grid container spacing={3} className={classes.section}>
          <Grid item lg={5} md={5} xl={5} xs={5}>
            {/* <AnnualizedCoverageForVaccineMap
              data={vacineDataForMap && vacineDataForMap}
              tabTitle={"Monthly (FY)"}
              dose={dose && dose}
              endYear={endYear}
              vaccineName={vaccineName && vaccineName}
              isLoading={isLoading && isLoading}
              reportYear={"FY"}
              startYear={startYear}
            /> */}
          </Grid>
          <Grid item lg={7} md={7} xl={7} xs={7}>
            {/* <CoverageForAntigensChart
              data={vaccineDosesForChart && vaccineDosesForChart}
              tabTitle={"Monthly (FY)"}
              vaccineName={vaccineName && vaccineName}
              dose={dose && dose}
              isLoading={isLoading && isLoading}
              startYear={startYear}
              endYear={endYear}
              reportYear={"FY"}
            /> */}
          </Grid>
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
