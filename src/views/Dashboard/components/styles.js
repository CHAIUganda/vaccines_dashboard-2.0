import { makeStyles, fade } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  indicator: {
    backgroundColor: "#F8E658"
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    float: "right"
  },
  formControl: {
    minWidth: 120,
    marginRight: theme.spacing(5),
    maxWidth: 300
  },
  filters: {
    display: "flex",
    float: "right"
  },

  filters2: {
    float: "right",
    marginTop: "-25px"
  },
  appBar: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "fit-content"
  },
  sub_appBar: {
    backgroundColor: "white",
    marginLeft: 500,
    borderRadius: 10,
    width: "fit-content"
  },
  tabsDiv: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    fontFamily: "Open Sans",
    width: "6400",
    paddingBottom: 1
  },
  tabs: {
    padding: "0rem",
    color: "#484848",
    backgroundColor: "white",
    fontFamily: "Open Sans",
    fontSize: "10rem",
    border: "1px solid #00000033 !important",
    borderRadius: "5px",
    height: 45
  },
  selectorLables: {
    color: "#28354A",
    fontSize: 20,
    marginTop: "-15px",
    marginLeft: "-15px"
  },
  selectorLables2: {
    color: "#28354A",
    fontSize: 20
  },

  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: "#F5F5F5"
  },
  selector_background: {
    backgroundColor: "white"
  },
  C_section: {
    paddingTop: 25,
    height: 582
  },
  DST_section: {
    height: 640
  },
  chartDiv: {
    flexGrow: 1,
    backgroundColor: "#F5F5F5",
    fontFamily: "Open Sans",
    height: 630
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 3,
    fontSize: "inherit"
  },
  noLabel: {
    marginTop: theme.spacing(3)
  },

  // Table
  tableRoot: {
    width: "100%"
  },
  tableContainer: {
    maxHeight: 550
  },
  tableHead: {
    fontSize: "inherit"
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
    width: "50%",
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
  },

  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    fontSize: 12,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 120
    }
  },

  selectMargin: {
    margin: theme.spacing(1)
  }
}));

export { useStyles };
