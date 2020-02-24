import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tabs from "@material-ui/core/Tabs";
import Box from "@material-ui/core/Box";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";

import FlagStripImage from "../../common/image/flag-ug.png";

// Material icons
import HomeIcon from "@material-ui/icons/Home";
import PieChartIcon from "@material-ui/icons/PieChart";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import BusinessIcon from "@material-ui/icons/Business";
import TimelineIcon from "@material-ui/icons/Timeline";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Avatar from "@material-ui/core/Avatar";

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

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    height: 72
  },

  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    color: "#28354A",
    marginRight: 10,
    fontSize: "xx-large"
  },
  subTitle: {
    color: "red",
    flexGrow: 1,
    fontSize: "larger",
    marginLeft: 20
  },
  courtOfArms: {
    width: 45,
    height: 45,
    paddingRight: 15
  },
  flagStrip: {
    width: "auto",
    minHeight: "15px",
    backgroundImage: `url(${FlagStripImage})`
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
  verticalIcon: {
    marginTop: 50,
    color: "white",
    fontSize: 40,
    minWidth: 0
  },
  mapOfUganda: {
    height: 80
  },
  iconSpacing: {
    marginRight: 5
  },
  drawer: {
    width: 80,
    flexShrink: 0,
    position: "fixed"
  },
  drawerPaper: {
    width: 80,
    position: "initial"
  },

  verticalIconLabelWrapper: {
    color: "white"
  },
  verticalBar: {
    backgroundColor: "#28354A",
    marginLeft: 0,
    minHeight: "100vh"
  },

  verticalLabelContainer: {
    height: 100
  },

  verticalIconSpacing: {
    marginTop: 50,
    minWidth: 0
  }
}));

export default function Header(props) {
  const classes = useStyles();

  const value = props.value;
  const handleChange = props.onChange;

  return (
    <div className={classes.root}>
      <Box className={classes.flagStrip}></Box>
      <AppBar position="static" color="transparent" className={classes.appBar}>
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
                height: "4px"
              }
            }}
          >
            <LinkTab
              classes={{
                wrapper: classes.iconLabelWrapper
              }}
              icon={<HomeIcon className={classes.iconSpacing} />}
              label="Overview"
              href="/overview"
              {...a11yProps(0)}
              disabled={true}
            />
            <LinkTab
              classes={{
                wrapper: classes.iconLabelWrapper
              }}
              icon={<PieChartIcon className={classes.iconSpacing} />}
              label="Coverage"
              href="/coverage"
              {...a11yProps(1)}
            />
            <LinkTab
              classes={{
                wrapper: classes.iconLabelWrapper
              }}
              icon={<LocalShippingIcon className={classes.iconSpacing} />}
              label="Stock Management"
              href="/stock-management"
              {...a11yProps(2)}
              disabled={false}
            />
            <LinkTab
              classes={{
                wrapper: classes.iconLabelWrapper
              }}
              icon={<BusinessIcon className={classes.iconSpacing} />}
              label="Cold Chain"
              href="/cold-chain"
              {...a11yProps(3)}
              disabled={true}
            />
            <LinkTab
              classes={{
                wrapper: classes.iconLabelWrapper
              }}
              icon={<TimelineIcon className={classes.iconSpacing} />}
              label="Performance Management"
              href="/performance-management"
              {...a11yProps(4)}
              disabled={true}
            />
          </Tabs>
          <Button color="inherit" href="/login">
            Login
          </Button>
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
        <div className={classes.toolbar} />

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
        </Tabs>
      </Drawer>
    </div>
  );
}
