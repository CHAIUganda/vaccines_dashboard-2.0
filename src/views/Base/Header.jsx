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
    fontSize: 25
  },
  subTitle: {
    color: "red",
    flexGrow: 1,
    fontSize: 13
  },
  courtOfArms: {
    width: 45,
    height: 45,
    marginRight: 15
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
            {/* <LinkTab
              classes={{
                wrapper: classes.iconLabelWrapper,
                labelContainer: classes.labelContainer
              }}
              icon={<TimelineIcon className={classes.iconSpacing} />}
              label="Login"
              href="/login"
              {...a11yProps(4)}
              disabled={false}
            /> */}
          </Tabs>
          <Button color="inherit" href="/login">
            Login
          </Button>
          <Avatar alt="Map of Uganda" src="/uganda-flag.png" variant="square" />
        </Toolbar>
      </AppBar>
    </div>
  );
}
