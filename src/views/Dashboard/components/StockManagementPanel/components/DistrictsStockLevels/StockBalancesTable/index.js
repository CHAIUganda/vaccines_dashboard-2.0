import React, { useState } from "react";

// Material components
import { Grid } from "@material-ui/core";
import { makeStyles, withStyles, fade } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SearchIcon from "@material-ui/icons/Search";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

// Shared componenrs
import { Chart } from "../../../../../../../components";
import { DataTable } from "./dataTable";

const TabStyle = withStyles(theme => ({
  root: {
    padding: "1rem 0",
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover": {
      backgroundColor: "#FC6F6F",
      color: "black",
      opacity: 1
    },
    "&$selected": {
      backgroundColor: "#FC6F6F",
      color: "#28354A",
      fontWeight: theme.typography.fontWeightMedium
    }
  },
  selected: {}
}))(props => <Tab {...props} />);

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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    backgroundColor: "white",
    borderRadius: "10px"
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "#28354A",
    border: "1px solid #FC6F6F !important",
    borderRadius: "5px"
    // fontSize: 20
  },

  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    fontSize: 20,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  tabs: {
    padding: "0rem",
    color: "#484848",
    backgroundColor: "white",
    fontFamily: "Open Sans",
    fontSize: "10rem",
    border: "1px solid #FC6F6F !important",
    borderRadius: "5px"
  }
}));

function a11yProps(index) {
  return {
    id: `districts-stock-levels-tab-${index}`,
    "aria-controls": `districts-stock-levels-tabpanel-${index}`
  };
}

const StockBalancesTable = ({
  data,
  isLoading,
  endMonth,
  startMonth,
  district,
  vaccine
}) => {
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

              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon style={{ color: "#28354A" }} />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
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
                <DataTable
                  data={data}
                  isLoading={isLoading}
                  tab="Stocked Out"
                />
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
                <DataTable data={data} isLoading={isLoading} tab="Below MIN" />
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
                <DataTable
                  data={data}
                  isLoading={isLoading}
                  tab="Within RANGE"
                />
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
                <DataTable data={data} isLoading={isLoading} tab="Above MAX" />
              </Grid>
            </Grid>
          </TabPanel>
        </>
      }
      isLoading={isLoading && isLoading}
    />
  );
};

export default StockBalancesTable;
