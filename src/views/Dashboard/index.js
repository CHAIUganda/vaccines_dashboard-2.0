import React from "react";
import PropTypes from "prop-types";

// Material UI compoents
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

// Layout
import BaseLayout from "../Base/BaseLayout.js";

// Dashboard components
import { OverviewPanel } from "../Dashboard/components/OverviewPanel/index";
import { ColdChainPanel } from "../Dashboard/components/ColdChainPanel/index";
import { CoveragePanel } from "./components/CoveragePanel/index";
import { StockManagementPanel } from "./components/StockManagementPanel/index";

// Importing this at the top to provide pdf export functionality
import Highcharts from "highcharts";
require("highcharts/modules/exporting")(Highcharts);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      <Box p={3} style={{ padding: 12 }}>
        {children}
      </Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

export function Dashboard() {
  const classes = useStyles();
  const [value, setValue] = React.useState(3);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <BaseLayout onChange={handleChange} value={value}>
      <div className={classes.root}>
        <TabPanel value={value} index={0}>
          <OverviewPanel />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CoveragePanel />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <StockManagementPanel />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ColdChainPanel />
        </TabPanel>
      </div>
    </BaseLayout>
  );
}
