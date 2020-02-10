import React, { useState } from "react";
import PropTypes from "prop-types";

// Material components
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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
      id={`district-stock-levels-tabpanel-${index}`}
      aria-labelledby={`district-stock-levels-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={1}>{children}</Box>}
    </Typography>
  );
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
    height: 636
  }
}));

export default function DistrictsStockLevels(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const {
    atHandStockLevelsData,
    isLoading,
    endMonth,
    startMonth,
    district,
    vaccine
  } = props;

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
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};
