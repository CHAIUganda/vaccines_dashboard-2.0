import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

// Material icons
import HomeIcon from "@material-ui/icons/Home";
import PieChartIcon from "@material-ui/icons/PieChart";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import BusinessIcon from "@material-ui/icons/Business";
import TimelineIcon from "@material-ui/icons/Timeline";
import DashboardIcon from "@material-ui/icons/Dashboard";
import SettingsIcon from "@material-ui/icons/Settings";

import FlagStripImage from "../../common/image/flag-ug.png";

const drawerWidth = 80;

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
      style={{ minWidth: 0, minHeight: 55 }}
    />
  );
}

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },

  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    height: 75,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  //   toolbar: theme.mixins.toolbar,
  toolbar: {
    minHeight: 75,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#28354A",
  },
  content: {
    flexGrow: 1,
    minHeight: "100vh",
    padding: theme.spacing(3),
    backgroundColor: "#F5F5F5",
  },
  flagStrip: {
    width: "auto",
    minHeight: "15px",
    backgroundImage: `url(${FlagStripImage})`,
  },
  courtOfArms: {
    width: 45,
    height: 45,
    marginRight: 10,
  },
  //   ugandaMapLogo: {
  //     marginLeft: `calc(100% + ${drawerWidth}px)`
  //   },
  iconLabelWrapper: {
    color: "#28354A",
    flexDirection: "row",
    fontWeight: "fontWeightBold",
    fontSize: 12,
  },
  iconSpacing: {
    marginRight: 5,
  },
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  verticalIcon: {
    marginTop: 50,
    color: "white",
    fontSize: 40,
    minWidth: 0,
  },

  dashboardIcon: {
    color: "white",
    fontSize: 40,
    minWidth: 0,
  },

  verticalIconLabelWrapper: {
    color: "white",
  },
  verticalBar: {
    backgroundColor: "#28354A",
    marginLeft: 0,
    minHeight: "100%",
  },

  verticalLabelContainer: {
    height: 100,
  },

  verticalIconSpacing: {
    marginTop: 50,
    minWidth: 0,
  },
}));

function Header(props) {
  const { container } = props;
  const { content } = props;
  const value = props.value;
  const handleChange = props.onChange;

  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div
        className={classes.toolbar}
        style={{
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
          display: "inline-flex",
          minWidth: "100%",
        }}
      >
        <DashboardIcon className={classes.dashboardIcon} />
      </div>
      <Tabs
        centered
        className={classes.verticalBar}
        indicatorColor="primary"
        value={value}
        orientation="vertical"
        onChange={handleChange}
        aria-label="Dashboard navigation tabs"
        TabIndicatorProps={{
          style: {
            height: "4px",
          },
        }}
      >
        <LinkTab
          classes={{
            verticalIconLabelWrapper: classes.verticalIconLabelWrapper,
            verticalLabelContainer: classes.verticalLabelContainer,
          }}
          icon={<HomeIcon className={classes.verticalIcon} />}
          href="/overview"
          {...a11yProps(0)}
          disabled={true}
        />
        <LinkTab
          classes={{
            verticalIconLabelWrapper: classes.verticalIconLabelWrapper,
            verticalLabelContainer: classes.verticalLabelContainer,
          }}
          icon={<PieChartIcon className={classes.verticalIcon} />}
          href="/coverage"
          {...a11yProps(1)}
        />
        <LinkTab
          classes={{
            verticalIconLabelWrapper: classes.verticalIconLabelWrapper,
            verticalLabelContainer: classes.verticalLabelContainer,
          }}
          icon={<LocalShippingIcon className={classes.verticalIcon} />}
          href="/stock-management"
          {...a11yProps(2)}
        />
        <LinkTab
          classes={{
            verticalIconLabelWrapper: classes.verticalIconLabelWrapper,
            verticalLabelContainer: classes.verticalLabelContainer,
          }}
          icon={<BusinessIcon className={classes.verticalIcon} />}
          href="/cold-chain"
          {...a11yProps(3)}
        />
        <LinkTab
          classes={{
            verticalIconLabelWrapper: classes.verticalIconLabelWrapper,
            verticalLabelContainer: classes.verticalLabelContainer,
          }}
          icon={<TimelineIcon className={classes.verticalIcon} />}
          href="/performance-management"
          {...a11yProps(4)}
        />
      </Tabs>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="white" className={classes.appBar}>
        <div className={classes.grow} />
        <Box className={classes.flagStrip}></Box>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Hidden xsDown implementation="css">
            <Avatar
              alt="Court of arms"
              src="/uganda-court-of-arms.jpg"
              className={classes.courtOfArms}
            />
          </Hidden>

          <Typography
            type="title"
            color="inherit"
            style={{ flex: 1, fontSize: "x-large" }}
          >
            MINISTRY OF HEALTH: UNEPI DASHBOARD
            <span style={{ color: "red", marginLeft: 10, fontSize: "initial" }}>
              REPUBLIC OF UGANDA
            </span>
          </Typography>
          <Hidden smUp implementation="css">
            <Typography variant="h6" noWrap>
              UNEPI DASHBOARD
            </Typography>
          </Hidden>
          <Hidden xsDown implementation="css">
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="Vaccine dashboard navigation tabs"
                TabIndicatorProps={{
                  style: {
                    height: "1px",
                  },
                }}
              >
                <LinkTab
                  classes={{
                    wrapper: classes.iconLabelWrapper,
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
                  }}
                  icon={<PieChartIcon className={classes.iconSpacing} />}
                  label="Coverage"
                  href="/coverage"
                  {...a11yProps(1)}
                />
                <LinkTab
                  classes={{
                    wrapper: classes.iconLabelWrapper,
                  }}
                  icon={<LocalShippingIcon className={classes.iconSpacing} />}
                  label="Stock Management"
                  href="/stock-management"
                  {...a11yProps(2)}
                />
                <LinkTab
                  classes={{
                    wrapper: classes.iconLabelWrapper,
                  }}
                  icon={<BusinessIcon className={classes.iconSpacing} />}
                  label="Cold Chain"
                  href="/cold-chain"
                  {...a11yProps(3)}
                />
                <LinkTab
                  classes={{
                    wrapper: classes.iconLabelWrapper,
                  }}
                  icon={<TimelineIcon className={classes.iconSpacing} />}
                  label="Performance Management"
                  href="/performance-management"
                  {...a11yProps(4)}
                />
                <Button color="inherit" href="/login" icon={<SettingsIcon />}>
                  Login
                </Button>
              </Tabs>
            </div>
          </Hidden>
        </Toolbar>
      </AppBar>
      <nav
        className={classes.drawer}
        aria-label="dashboard side navigation tabs"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            {content}
          </Grid>
        </Grid>
      </main>
    </div>
  );
}

Header.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.any,
};

export default Header;
