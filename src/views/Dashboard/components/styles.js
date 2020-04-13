import { makeStyles, fade } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  indicator: {
    backgroundColor: "#F8E658",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    float: "right",
  },
  formControl: {
    minWidth: 120,
    marginRight: theme.spacing(5),
    maxWidth: 300,
    marginTop: 35,
  },
  filters: {
    display: "flex",
    float: "right",
  },

  filters2: {
    float: "right",
    marginTop: "-25px",
  },
  appBar: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "fit-content",
  },
  sub_appBar: {
    backgroundColor: "white",
    marginLeft: 500,
    borderRadius: 10,
    width: "fit-content",
  },
  tabsDiv: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    fontFamily: "Open Sans",
    width: "6400",
    paddingBottom: 1,
  },
  tabs: {
    padding: "0rem",
    color: "#484848",
    backgroundColor: "white",
    fontFamily: "Open Sans",
    fontSize: "10rem",
    border: "1px solid #00000033 !important",
    borderRadius: "5px",
    height: 45,
  },
  selectorLables: {
    color: "#28354A",
    fontSize: "large",
    marginTop: "-15px",
    marginLeft: "-15px",
    // backgroundColor: "white"
  },
  selectorLables2: {
    color: "#28354A",
    fontSize: "large",
    marginLeft: "-15px",
    marginTop: "10px",
    width: "max-content",
    transform: "translate(14px, -6px) scale(0.75) !important",
  },

  liItems: {
    fontSize: "small",
  },
  tableTitle: {
    color: "#28354A",
    opacity: "100%",
    fontSize: "medium",
    fontWeight: 400,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: "#F5F5F5",
  },
  selector_background: {
    backgroundColor: "white",
    fontSize: "small",
  },
  C_section: {
    paddingTop: 25,
    height: 582,
  },
  DST_section: {
    height: 640,
  },
  chartDiv: {
    flexGrow: 1,
    backgroundColor: "#F5F5F5",
    fontFamily: "Open Sans",
    height: 630,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 3,
    fontSize: "inherit",
  },
  chipPadding: {
    padding: "0 !important",
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },

  switch: {
    marginTop: 8,
    borderStyle: "solid",
    borderRadius: 4,
    borderWidth: "thin",
    borderColor: "#CCCCCC",
    backgroundColor: "white",
    padding: 5,
    paddingRight: 20,
  },
  switchLable: {
    fontSize: "small",
    color: "#28354A",
  },

  lable: {
    fontSize: "small !important",
    color: "#28354A",
  },

  swithFormControl: {
    marginTop: 15,
    marginRight: 40,
  },

  // Table
  tableRoot: {
    width: "100%",
  },
  tableContainer: {
    maxHeight: 550,
  },
  tableHead: {
    fontSize: "inherit",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "50%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "#28354A",
    border: "1px solid #FC6F6F !important",
    borderRadius: "5px",
  },

  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    fontSize: 12,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 120,
    },
  },

  districtSelectMargin: {
    marginTop: 10,
    minWidth: 120,
    marginRight: theme.spacing(5),
    maxWidth: 300,
  },
}));

export { useStyles };
