import React from "react";
import PropTypes from "prop-types";

// Material UI compoents
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Avatar from "@material-ui/core/Avatar";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import { Container } from "@material-ui/core";

// Material icons
import HomeIcon from "@material-ui/icons/Home";
import PieChartIcon from "@material-ui/icons/PieChart";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import BusinessIcon from "@material-ui/icons/Business";
import TimelineIcon from "@material-ui/icons/Timeline";

// Dashboard components
import { OverviewPanel } from "../Dashboard/components/OverviewPanel/index";
import { ColdChainPanel } from "../Dashboard/components/ColdChainPanel/index";
import { CoveragePanel } from "./components/CoveragePanel/index";
import { StockManagementPanel } from "./components/StockManagementPanel/index";

import FlagStripImage from "../../common/image/flag-ug.png";

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
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault();
      }}
      {...props}
      style={{ minWidth: 0 }}
    />
  );
}

const drawerWidth = 80;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#F9F9FC",
    height: "100vh"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    color: "#28354A",
    marginLeft: 25,
    width: 150
  },
  subTitle: {
    flexGrow: 1,
    color: "red"
  },
  barCorlor: {
    color: "white",
    backgroundColor: "black"
  },
  labelContainer: {
    width: "auto"
  },

  iconLabelWrapper: {
    color: "#28354A",
    flexDirection: "row",
    fontWeight: "fontWeightBold",
    fontSize: 12
  },

  verticalIconLabelWrapper: {
    color: "white"
  },
  verticalBar: {
    backgroundColor: "#28354A",
    marginLeft: 0,
    height: "100vh"
  },

  verticalLabelContainer: {
    height: 100
  },

  verticalIconSpacing: {
    marginTop: 50,
    minWidth: 0
  },

  verticalIcon: {
    marginTop: 50,
    color: "white",
    fontSize: 40,
    minWidth: 0
  },

  iconSpacing: {
    marginRight: 5
  },

  courtOfArms: {
    width: 45,
    height: 45,
    marginLeft: 20
  },

  mapOfUganda: {
    height: 80
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    top: 87
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  toolbar: theme.mixins.toolbar,
  flagStrip: {
    width: "auto",
    minHeight: "15px",
    backgroundImage: `url(${FlagStripImage})`
  }
}));

export function Dashboard() {
  const classes = useStyles();
  const [value, setValue] = React.useState(1);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <Box className={classes.flagStrip}></Box>
      <AppBar
        position="static"
        color={classes.barCorlor}
        className={classes.appBar}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <DashboardIcon />
          </IconButton>

          <Avatar
            alt="Court of arms"
            src="/uganda-court-of-arms.jpg"
            className={classes.courtOfArms}
          />
          <Typography variant="h6" className={classes.title}>
            MINISTRY OF HEALTH: UNEPI DASHBOARD
          </Typography>
          <Typography
            variant="button"
            display="block"
            className={classes.subTitle}
          >
            REPUBLIC OF UGANDA
          </Typography>
          <Tabs
            style={{ marginRight: "80px" }}
            indicatorColor="primary"
            value={value}
            onChange={handleChange}
            aria-label="Dashboard navigation tabs"
            TabIndicatorProps={{
              style: {
                height: "2px"
              }
            }}
          >
            <LinkTab
              classes={{
                wrapper: classes.iconLabelWrapper,
                labelContainer: classes.labelContainer
              }}
              icon={<HomeIcon className={classes.iconSpacing} />}
              label="Overview"
              href="/overview"
              {...a11yProps(0)}
              disabled={true}
            />
            <LinkTab
              classes={{
                wrapper: classes.iconLabelWrapper,
                labelContainer: classes.labelContainer
              }}
              icon={<PieChartIcon className={classes.iconSpacing} />}
              label="Coverage"
              href="/coverage"
              {...a11yProps(1)}
            />
            <LinkTab
              classes={{
                wrapper: classes.iconLabelWrapper,
                labelContainer: classes.labelContainer
              }}
              icon={<LocalShippingIcon className={classes.iconSpacing} />}
              label="Stock Management"
              href="/stock-management"
              {...a11yProps(2)}
              disabled={false}
            />
            <LinkTab
              classes={{
                wrapper: classes.iconLabelWrapper,
                labelContainer: classes.labelContainer
              }}
              icon={<BusinessIcon className={classes.iconSpacing} />}
              label="Cold Chain"
              href="/cold-chain"
              {...a11yProps(3)}
              disabled={true}
            />
            <LinkTab
              classes={{
                wrapper: classes.iconLabelWrapper,
                labelContainer: classes.labelContainer
              }}
              icon={<TimelineIcon className={classes.iconSpacing} />}
              label="Performance Management"
              href="/performance-management"
              {...a11yProps(4)}
              disabled={true}
            />
          </Tabs>
          <Avatar alt="Map of Uganda" src="/uganda-flag.png" variant="square" />
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.toolbar} style={{ minHeight: 0 }} />

        <Tabs
          className={classes.verticalBar}
          indicatorColor="primary"
          value={value}
          orientation="vertical"
          onChange={handleChange}
          aria-label="Dashboard navigation tabs"
          TabIndicatorProps={{
            style: {
              height: "4px"
            }
          }}
        >
          <LinkTab
            classes={{
              verticalIconLabelWrapper: classes.verticalIconLabelWrapper,
              verticalLabelContainer: classes.verticalLabelContainer
            }}
            icon={<HomeIcon className={classes.verticalIcon} />}
            href="/overview"
            {...a11yProps(0)}
            disabled={true}
          />
          <LinkTab
            classes={{
              verticalIconLabelWrapper: classes.verticalIconLabelWrapper,
              verticalLabelContainer: classes.verticalLabelContainer
            }}
            icon={<PieChartIcon className={classes.verticalIcon} />}
            href="/coverage"
            {...a11yProps(1)}
          />
          <LinkTab
            classes={{
              verticalIconLabelWrapper: classes.verticalIconLabelWrapper,
              verticalLabelContainer: classes.verticalLabelContainer
            }}
            icon={<LocalShippingIcon className={classes.verticalIcon} />}
            href="/stock-management"
            {...a11yProps(2)}
            disabled={false}
          />
          <LinkTab
            classes={{
              verticalIconLabelWrapper: classes.verticalIconLabelWrapper,
              verticalLabelContainer: classes.verticalLabelContainer
            }}
            icon={<BusinessIcon className={classes.verticalIcon} />}
            href="/cold-chain"
            {...a11yProps(3)}
            disabled={true}
          />
          <LinkTab
            classes={{
              verticalIconLabelWrapper: classes.verticalIconLabelWrapper,
              verticalLabelContainer: classes.verticalLabelContainer
            }}
            icon={<TimelineIcon className={classes.verticalIcon} />}
            href="/performance-management"
            {...a11yProps(4)}
            disabled={true}
          />
        </Tabs>
      </Drawer>
      <Box component="span" m={1}>
        <Container maxWidth="xl" style={{ paddingLeft: 100 }}>
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
        </Container>
      </Box>
    </div>
  );
}
