import React from "react";
import PropTypes from "prop-types";

// Material components
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

// Custom components

import StockBalancesTable from "./StockBalancesTable/index";
import StockBalancesPieChart from "./StockBalancesPieChart/index";

// Import common styles
import { useStyles } from "../../../styles";

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

export default function DistrictsStockLevels(props) {
  const classes = useStyles();

  const {
    atHandStockLevelsData,
    isLoading,
    endMonth,
    startMonth,
    district,
    vaccine,
  } = props;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.paper} elevation={0}>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <Grid container spacing={3} className={classes.DST_section}>
              <Grid
                item
                lg={5}
                md={5}
                xl={5}
                xs={12}
                style={{ maxHeight: 630 }}
              >
                <StockBalancesPieChart
                  data={atHandStockLevelsData}
                  isLoading={isLoading}
                  endMonth={endMonth}
                  startMonth={startMonth}
                  district={district}
                  vaccine={vaccine}
                />
              </Grid>
              <Grid item lg={7} md={7} xl={7} xs={12}>
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
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
