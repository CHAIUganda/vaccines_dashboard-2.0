import React, { useState, useContext, useEffect } from "react";

// Bring in the global context
import { GlobalContext, date } from "../../../../context/GlobalState";
import { OverviewContext } from "../../../../context/Overview/OverviewState";

// Bring in our performance management context

// Material components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import ArrowForwardIosSharpIcon from "@material-ui/icons/ArrowForwardIosSharp";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";

import FunctionalityPieChart from "./components/FunctionalityPieChart/index";
import EligibilityStatusPieChart from "./components/EligibilityStatusPieChart/index";
import FunctionalityTable from "./components/FunctionalityTable/index";
import TotalLitresCard from "./components/TotalLitresCard/index";
import SurplusGapCard from "./components/SurplusGapCard/index";
import ShortageGapCard from "./components/ShortageGapCard/index";
import MonthsOfStockCard from "./components/MonthsOfStockCard/index";
import RefillRateCard from "./components/RefillRateCard/index";
import UptakeRateCard from "./components/UptakeRateCard/index";
import DPT13Card from "./components/DPT1-3Card/index";
import HPV12Card from "./components/HPV1-2Card/index";
import DPT3PCV3GAPCard from "./components/DPT3-PCV3GAPCard/index";
import RedCategoryCard from "./components/RedCategoryCard/index";

// Import common styles
import { useStyles } from "../styles";

const overviewStyles = makeStyles((theme) => ({
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
  },

  content: {
    margin: 10,
    width: "33%",
    display: "flex",
    flexDirection: "column",
    boxShadow:
      "0 1px 3px rgba(0,0,0,0.06),0 2px 6px rgba(0,0,0,0.06),0 3px 8px rgba(0,0,0,0.09)",
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
    height: "40%",
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
    width: "33%",
    padding: 7,
  },

  top: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: "small",
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

export function OverviewPanel() {
  const classes = overviewStyles();
  const globalClasses = useStyles();
  const vaccine = "PENTA";

  // Extract required global state variables
  const { districts, getDistricts } = useContext(GlobalContext);

  const { months, getStockManagementData, getCoverageData } = useContext(
    OverviewContext
  );

  useEffect(() => {
    getDistricts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function groupBy(objectArray, property) {
    return objectArray.reduce((acc, obj) => {
      let key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }

  const groupedMonths = groupBy(months, "year");

  const [district, setDistrict] = useState("National");
  const [month, setMonth] = useState({
    month: date.toDateString().substring(4, 7) + ` ${date.getFullYear()}`,
    period: `${date.getFullYear()}${
      date.getMonth().toString().length > 1 ? "" : 0
    }${date.getMonth()}`,
  });

  const monthsFilter =
    groupedMonths &&
    Object.keys(groupedMonths).map((year) => (
      <>
        <optgroup label={year} className={classes.liItems}></optgroup>
        {Object.values(groupedMonths[year]).map((y) => (
          <>
            <option
              value={y.name}
              period={y.period}
              className={classes.liItems}
            >
              {y.name}
            </option>
          </>
        ))}
      </>
    ));

  const districtFilter = districts?.map((district) => (
    <MenuItem
      value={district.name}
      key={district.name}
      className={classes.liItems}
    >
      {district.name}
    </MenuItem>
  ));

  useEffect(() => {
    getStockManagementData(month, district);
    getCoverageData(month, district, vaccine);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, district]);

  return (
    <>
      <div className={classes.top}>
        <h3> Immunization Performance Report</h3>
        <div className={classes.filters2}>
          <FormControl
            className={globalClasses.districtSelectMargin}
            variant="outlined"
            margin="dense"
          >
            <InputLabel
              htmlFor="month"
              className={globalClasses.selectorLables2}
            >
              Month
            </InputLabel>
            <Select
              native
              className={globalClasses.selector_background}
              id="month_selector"
              value={month.month}
              onChange={(event) => {
                const period = event.target.options.selectedIndex;
                setMonth({
                  month: event.target.value,
                  period: event.target[period].getAttribute("period"),
                });
              }}
              input={<BootstrapInput />}
            >
              {monthsFilter}
            </Select>
          </FormControl>
          <FormControl
            className={globalClasses.districtSelectMargin}
            variant="outlined"
            margin="dense"
          >
            <InputLabel
              htmlFor="District"
              className={globalClasses.selectorLables2}
            >
              District
            </InputLabel>
            <Select
              className={globalClasses.selector_background}
              id="district_selector"
              value={district}
              onChange={(event) => setDistrict(event.target.value)}
              input={<BootstrapInput />}
            >
              {districtFilter}
            </Select>
          </FormControl>
        </div>
      </div>
      <div>
        <span className={classes.sectionHeader}>
          <h3> Coverage</h3>
          <ArrowForwardIosSharpIcon style={{ marginLeft: 10 }} />
        </span>
        <div className={classes.stockManagementWrapper}>
          <span className={classes.stockManagementMetricsContainer}>
            <DPT13Card />
          </span>
          <span className={classes.stockManagementMetricsContainer}>
            <HPV12Card />
          </span>
          <span className={classes.stockManagementMetricsContainer}>
            <DPT3PCV3GAPCard />
          </span>
          <span className={classes.stockManagementMetricsContainer}>
            <RedCategoryCard />
          </span>
        </div>
      </div>
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
            <RefillRateCard />
          </span>
          <span className={classes.stockManagementMetricsContainer}>
            <UptakeRateCard />
          </span>
        </div>
      </div>
    </>
  );
}
