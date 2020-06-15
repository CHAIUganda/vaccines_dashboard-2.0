import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles({
  secondary: {
    color: "#28354a",
  },
});

const Card = ({
  module,
  parent,
  metric,
  backgroundImage,
  title,
  tagLine,
  isLoading,
  isPercentage,
  icon,
  denominator,
}) => {
  const classes = useStyles();
  return (
    <Paper
      style={{
        width: "100%",
        height: "100%",
        padding: 10,
        backgroundImage: backgroundImage,
        boxShadow:
          "0 1px 3px rgba(0,0,0,0.06),0 2px 6px rgba(0,0,0,0.06),0 3px 8px rgba(0,0,0,0.09)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <h3
          style={{
            color: backgroundImage ? "white" : "#28354A",
            textTransform: "uppercase",
            fontWeight: 400,
          }}
        >
          {title}
        </h3>
        {icon}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {isLoading ? (
          <span>
            <CircularProgress
              style={{
                width: 30,
                height: 30,
                color: "#28354A",
                marginTop: 20,
                marginRight: 20,
              }}
            />
          </span>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                margin: module !== "stock" ? "auto" : "",
              }}
            >
              <span
                style={{
                  fontSize: 60,
                  fontWeight: 600,
                  color: backgroundImage ? "white" : "#28354A",
                }}
              >
                {isPercentage ? <> {metric}% </> : <> {metric} </>}
              </span>
              {module === "stock" ? (
                <LinearProgress
                  classes={{
                    colorSecondary: classes.secondary,
                  }}
                  variant="determinate"
                  valueBuffer={denominator}
                  value={parent === "monthsStockCard" ? metric * 10 : metric}
                  style={{
                    transition: "transform .4s linear",
                    width: "80%",
                    backgroundColor: "#b9ccee",
                    marginLeft: 20,
                  }}
                />
              ) : (
                <> </>
              )}
            </div>
            <span
              style={{
                fontSize: "small",
                color: "#28354A",
              }}
            >
              {tagLine}
            </span>
          </>
        )}
      </div>
    </Paper>
  );
};

export default Card;
