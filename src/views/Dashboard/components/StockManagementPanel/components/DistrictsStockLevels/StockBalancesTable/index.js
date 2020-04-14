import React, { useState } from "react";

// Material components
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

// Import common styles
import { useStyles } from "../../../../styles";

// Shared componenrs
import { Chart } from "../../../../../../../components";
import { DataTable } from "./dataTable";

const TabStyle = withStyles((theme) => ({
  root: {
    padding: "1rem 0",
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: 12,
    "&:hover": {
      backgroundColor: "#FC6F6F",
      color: "black",
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
    id: `districts-stock-levels-tab-${index}`,
    "aria-controls": `districts-stock-levels-tabpanel-${index}`,
  };
}

const StockBalancesTable = () => {
  const [value, setValue] = useState(0);
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Chart
      chart={
        <>
          <AppBar position="static" className={classes.appBar} elevation={0}>
            <Toolbar>
              <Tabs
                className={classes.tabs}
                value={value}
                onChange={handleChange}
                aria-label="District stock levels tabs"
                TabIndicatorProps={{ style: { backgroundColor: "#FC6F6F" } }}
              >
                <TabStyle {...a11yProps(0)} label="Stocked Out" />
                <TabStyle {...a11yProps(1)} label="Below MIN" />
                <TabStyle {...a11yProps(2)} label="Within RANGE" />
                <TabStyle {...a11yProps(3)} label="Above MAX" />
              </Tabs>
            </Toolbar>
          </AppBar>
          <TabPanel value={value} index={0}>
            <Grid container spacing={3} className={classes.section}>
              <Grid
                item
                lg={12}
                md={12}
                xl={12}
                xs={12}
                style={{ padding: 30 }}
              >
                <DataTable tab="Stocked Out" />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid container spacing={3} className={classes.section}>
              <Grid
                item
                lg={12}
                md={12}
                xl={12}
                xs={12}
                style={{ padding: 30 }}
              >
                <DataTable tab="Below MIN" />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Grid container spacing={3} className={classes.section}>
              <Grid
                item
                lg={12}
                md={12}
                xl={12}
                xs={12}
                style={{ padding: 30 }}
              >
                <DataTable tab="Within RANGE" />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Grid container spacing={3} className={classes.section}>
              <Grid
                item
                lg={12}
                md={12}
                xl={12}
                xs={12}
                style={{ padding: 30 }}
              >
                <DataTable tab="Above MAX" />
              </Grid>
            </Grid>
          </TabPanel>
        </>
      }
    />
  );
};

export default StockBalancesTable;
