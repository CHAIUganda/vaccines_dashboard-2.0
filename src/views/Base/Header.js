import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

// Material icons
import DashboardIcon from "@material-ui/icons/Dashboard";

import FlagStripImage from "../../common/image/flag-ug.png";

// Custom Icons
import {
  ColdChainIcon,
  HomeIcon,
  StockManagementIcon,
  CoverageIcon,
  PerformanceManagementIcon,
  SettingsIcon,
} from "../../icons/icons";

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

  iconLabelWrapper: {
    color: "#28354A",
    flexDirection: "row",
    fontSize: 12,
  },
  iconSpacing: {
    overflow: "visible",
    height: 25,
    marginRight: 7,
    marginTop: 10,
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
    color: "white",
    overflow: "visible",
    margin: "auto",
  },

  dashboardIcon: {
    color: "white",
    fontSize: 40,
    minWidth: 0,
  },

  linkTab: {
    minWidth: 0,
    minHeight: 55,
  },

  wrapper: {
    width: "100%",
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    height: 80,
  },

  verticalBar: {
    backgroundColor: "#28354A",
    marginLeft: 0,
    minHeight: "100%",
    marginTop: 10,
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
          style={{ minWidth: 0, minHeight: 55 }}
          classes={{
            wrapper: classes.wrapper,
          }}
          icon={<HomeIcon className={classes.verticalIcon} />}
          href="/overview"
          {...a11yProps(0)}
        />

        <LinkTab
          classes={{
            wrapper: classes.wrapper,
          }}
          icon={<ColdChainIcon className={classes.verticalIcon} />}
          href="/cold-chain"
          {...a11yProps(1)}
        />
        <LinkTab
          classes={{
            wrapper: classes.wrapper,
          }}
          icon={<StockManagementIcon className={classes.verticalIcon} />}
          href="/stock-management"
          {...a11yProps(2)}
        />
        <LinkTab
          classes={{
            wrapper: classes.wrapper,
          }}
          icon={<CoverageIcon className={classes.verticalIcon} />}
          href="/coverage"
          {...a11yProps(3)}
        />

        <LinkTab
          classes={{
            wrapper: classes.wrapper,
          }}
          icon={<PerformanceManagementIcon className={classes.verticalIcon} />}
          href="/performance-management"
          {...a11yProps(4)}
        />

        <LinkTab
          classes={{
            wrapper: classes.wrapper,
          }}
          icon={<PerformanceManagementIcon className={classes.verticalIcon} />}
          href="/links"
          {...a11yProps(5)}
        />
        <LinkTab
          classes={{
            wrapper: classes.wrapper,
          }}
          icon={<SettingsIcon className={classes.verticalIcon} />}
          href="/login"
          {...a11yProps(6)}
        />
      </Tabs>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="inherit" className={classes.appBar}>
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
                    height: "3px",
                  },
                }}
              >
                <LinkTab
                  classes={{
                    wrapper: classes.iconLabelWrapper,
                    linkTab: classes.linkTab,
                  }}
                  icon={<HomeIcon className={classes.iconSpacing} />}
                  label="Overview"
                  href="/overview"
                  {...a11yProps(0)}
                />
                <LinkTab
                  classes={{
                    wrapper: classes.iconLabelWrapper,
                    linkTab: classes.linkTab,
                  }}
                  icon={<ColdChainIcon className={classes.iconSpacing} />}
                  label="Cold Chain"
                  href="/cold-chain"
                  {...a11yProps(1)}
                />
                <LinkTab
                  classes={{
                    wrapper: classes.iconLabelWrapper,
                    linkTab: classes.linkTab,
                  }}
                  icon={<StockManagementIcon className={classes.iconSpacing} />}
                  label="Stock Management"
                  href="/stock-management"
                  {...a11yProps(2)}
                />

                <LinkTab
                  classes={{
                    wrapper: classes.iconLabelWrapper,
                    linkTab: classes.linkTab,
                  }}
                  icon={<CoverageIcon className={classes.iconSpacing} />}
                  label="Coverage"
                  {...a11yProps(3)}
                />

                <LinkTab
                  classes={{
                    wrapper: classes.iconLabelWrapper,
                    linkTab: classes.linkTab,
                  }}
                  icon={
                    <PerformanceManagementIcon
                      className={classes.iconSpacing}
                    />
                  }
                  label="Work Planning"
                  {...a11yProps(4)}
                />
                <LinkTab
                  classes={{
                    wrapper: classes.iconLabelWrapper,
                    linkTab: classes.linkTab,
                  }}
                  icon={
                    <PerformanceManagementIcon
                      className={classes.iconSpacing}
                    />
                  }
                  label="Links"
                  {...a11yProps(5)}
                />
                <LinkTab
                  classes={{
                    wrapper: classes.iconLabelWrapper,
                    linkTab: classes.linkTab,
                  }}
                  icon={
                    <SettingsIcon
                      className={classes.iconSpacing}
                      style={{ marginBottom: 12, fontSize: 20 }}
                    />
                  }
                  label="Settings"
                  href="/login"
                  {...a11yProps(6)}
                />
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
