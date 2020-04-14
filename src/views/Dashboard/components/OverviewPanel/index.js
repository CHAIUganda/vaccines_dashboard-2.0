import React, { useState, useContext, useEffect } from "react";

// Bring in the global context
import { GlobalContext } from "../../../../context/GlobalState";
import { OverviewContext } from "../../../../context/Overview/OverviewState";
import { PerformanceManagementContext } from "../../../../context/PerformanceManagement/PerformanceManagementState";
import { ColdChainContext } from "../../../../context/ColdChain/ColdChainState";

// Bring in our performance management context

// Material components
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import ArrowForwardIosSharpIcon from "@material-ui/icons/ArrowForwardIosSharp";

import FunctionalityPieChart from "./components/FunctionalityPieChart/index";
import EligibilityStatusPieChart from "./components/EligibilityStatusPieChart/index";
import FunctionalityTable from "./components/FunctionalityTable/index";
import TotalLitresCard from "./components/TotalLitresCard/index";
import SurplusGapCard from "./components/SurplusGapCard/index";
import ShortageGapCard from "./components/ShortageGapCard/index";
import MonthsOfStockCard from "./components/MonthsOfStockCard/index";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },

  header: {
    textAlign: "left",
    letterSpacing: 0,
    opacity: 1,
    // font: "Proxima Nova"
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    color: "#28354A",
  },

  ColdChainSectionWrapper: {
    display: "flex",
    justifyContent: "space-between",
    height: 615,
  },

  stockManagementWrapper: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },

  content: {
    margin: 10,
    width: "33%",
    display: "flex",
    flexDirection: "column",
  },

  sectionTitle: {
    display: "flex",
    justifyContent: "center",
    fontSize: "inherit",
    fontWeight: 400,
    color: "#28354A",
  },

  chartContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },

  cardContainer: {
    display: "flex",
    width: "100%",
  },

  chartContainerContent: {
    height: "50%",
    margin: "0px 100px 0px 100px",
    padding: 3,
  },
  tableContainerContent: {
    margin: "0px 50px 0px 50px",
  },

  capacityMetricsContainer: {
    display: "flex",
    flexDirection: "column",
    height: "33%",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 7,
  },

  stockManagementMetricsContainer: {
    display: "flex",
    width: "33%",
    padding: 7,
  },
}));

export function OverviewPanel() {
  const classes = useStyles();

  return (
    <>
      <h3> Immunization Performance Report</h3>
      <div>
        <span className={classes.sectionHeader}>
          <h3> Cold Chain</h3>
          <ArrowForwardIosSharpIcon style={{ marginLeft: 10 }} />
        </span>
        <div className={classes.ColdChainSectionWrapper}>
          <Paper className={classes.content}>
            <h3 className={classes.sectionTitle}>
              Working Status of Fridges in all Districts
            </h3>
            <div className={classes.chartContainer}>
              <span className={classes.capacityMetricsContainer}>
                <TotalLitresCard />
              </span>
              <span className={classes.capacityMetricsContainer}>
                <SurplusGapCard />
              </span>
              <span className={classes.capacityMetricsContainer}>
                <ShortageGapCard />
              </span>
            </div>
          </Paper>
          <Paper className={classes.content}>
            <h3 className={classes.sectionTitle}>
              Cold Chain Equipment Functionality
            </h3>
            <div className={classes.chartContainer}>
              <span className={classes.chartContainerContent}>
                <FunctionalityPieChart />
              </span>
              <span className={classes.tableContainerContent}>
                <FunctionalityTable />
              </span>
            </div>
          </Paper>
          <Paper className={classes.content}>
            <h3 className={classes.sectionTitle}>
              Eligible Facilities in all Districts
            </h3>
            <div className={classes.chartContainer}>
              <EligibilityStatusPieChart />
            </div>
          </Paper>
        </div>
      </div>
      <div>
        <span className={classes.sectionHeader}>
          <h3> Stock Management</h3>
          <ArrowForwardIosSharpIcon style={{ marginLeft: 10 }} />
        </span>
        <div className={classes.stockManagementWrapper}>
          <span className={classes.stockManagementMetricsContainer}>
            <MonthsOfStockCard />
          </span>
          <span className={classes.stockManagementMetricsContainer}>
            <SurplusGapCard />
          </span>
          <span className={classes.stockManagementMetricsContainer}>
            <ShortageGapCard />
          </span>
        </div>
        {/* </Paper> */}
      </div>
    </>
  );
}
