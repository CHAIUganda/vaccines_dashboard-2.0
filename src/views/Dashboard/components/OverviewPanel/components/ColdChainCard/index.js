import React from "react";

import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";

import { ColdChainIcon, UgandaIcon } from "../../../../../../icons/icons";

const Card = ({
  metric,
  backgroundImage,
  title,
  sign,
  isLoading,
  isPercentage,
  icon,
}) => {
  return (
    <Paper
      style={{
        width: "70%",
        height: "100%",
        padding: 10,
        backgroundImage: backgroundImage,
      }}
    >
      <h3 style={{ color: "#ffff", fontWeight: 300 }}>{title}</h3>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: 20,
            color: "#ffff",
          }}
        >
          {icon === "UGMap" ? (
            <UgandaIcon style={{ fontSize: "xxx-large" }} />
          ) : (
            <ColdChainIcon style={{ fontSize: "xxx-large" }} />
          )}
        </span>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          {isLoading ? (
            <span>
              <CircularProgress
                style={{
                  width: 30,
                  height: 30,
                  color: "#ffff",
                  marginTop: 20,
                  marginRight: 20,
                }}
              />
            </span>
          ) : (
            <>
              <span style={{ fontSize: "xx-large", color: "#fff" }}>
                {isPercentage ? <> {metric}% </> : <> {metric} </>}
              </span>
              <span
                style={{
                  textTransform: "uppercase",
                  letterSpacing: 5,
                  color: "hsla(0,0%,100%,.5)",
                }}
              >
                {sign}
              </span>
            </>
          )}
        </div>
      </div>
    </Paper>
  );
};

export default Card;
