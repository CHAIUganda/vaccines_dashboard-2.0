import React, { createContext, useReducer } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import AppReducer from "./AppReducer";

const apiEndpoint = require("../env_config").default;
const sessionStorage = window.sessionStorage;
const token = sessionStorage.getItem("token");

const OPTIONS = {
  "Content-Type": "application/json",
  Authorization: "Token " + token,
};

const OPTIONS_UNSECURE = {
  "Content-Type": "application/json",
};

// Because the backend on the production runs on port 80 (default port)
export const port =
  apiEndpoint === "localhost" || apiEndpoint === "104.197.111.191"
    ? ":9000"
    : "";

// Variables
export const district = "national";
export const date = new Date();

// Initial state for APP.
const initialState = {
  activeTab: 0,
  districts: [],
  vaccines: [],
  quarters: [],
  activeDistrict: district,
  error: null,
  loading: true,
  currentYear: date.getFullYear(),
  isAuthenticated: sessionStorage.getItem("token") === null ? false : true,
  token: sessionStorage.getItem("token"),
  months: [
    { key: 1, month: "Jan" },
    { key: 2, month: "Feb" },
    { key: 3, month: "Mar" },
    { key: 4, month: "Apr" },
    { key: 5, month: "May" },
    { key: 6, month: "Jun" },
    { key: 7, month: "Jul" },
    { key: 8, month: "Aug" },
    { key: 9, month: "Sep" },
    { key: 10, month: "Oct" },
    { key: 11, month: "Nov" },
    { key: 12, month: "Dec" },
  ],
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //////  Actions

  const getVaccines = async () => {
    try {
      const vaccines = await axios.get(
        `http://${apiEndpoint}${port}/api/vaccines`
      );

      const VACCINES = vaccines.data.map((vaccines) => vaccines.name);

      dispatch({
        type: "GET_VACCINES",
        payload: VACCINES,
      });
    } catch (err) {
      dispatch({
        type: "GET_VACCINES_ERROR",
        payload: "An error occured getting vaccines from backend",
      });
    }
  };

  const getDistricts = async () => {
    try {
      const res = await axios.get(`http://${apiEndpoint}${port}/api/districts`);
      dispatch({
        type: "GET_DISTRICTS",
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: "GET_DISTRICTS_ERROR",
        payload: "An error occured getting districts from backend",
      });
    }
  };

  const getQuarters = async () => {
    try {
      const res = await axios.get(
        `http://${apiEndpoint}${port}/coldchain/api/quarters`
      );
      dispatch({
        type: "GET_QUARTERS",
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: "GET_QUARTERS_ERROR",
        payload: "An error occured getting districts from backend",
      });
    }
  };

  const loginUser = async (email, password) => {
    const loginUrl = `http://${apiEndpoint}${port}/auth/login/`;
    const data = {
      password,
      email,
    };

    try {
      const _data = await axios.post(loginUrl, data, OPTIONS_UNSECURE);

      sessionStorage.removeItem("email");
      sessionStorage.removeItem("token");

      sessionStorage.setItem("email", email);
      sessionStorage.setItem("token", _data.data.auth_token);

      dispatch({
        type: "LOG_IN",
        payload: { token: _data.data.auth_token, isAuthenticated: true },
      });

      console.log(`User Logged in successfully`);
    } catch (err) {
      dispatch({
        type: "LOGIN_ERROR",
        payload:
          "An error occurred logging in. Please check your username and or password!",
      });
    }
  };

  const logoutUser = async (_token) => {
    const logoutUrl = `http://${apiEndpoint}${port}/auth/logout/`;

    try {
      await axios.post(
        logoutUrl,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + _token,
          },
        }
      );
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("token");

      dispatch({
        type: "LOG_OUT",
        payload: { token: "", isAuthenticated: false },
      });
      console.log(`User Logged out successfully`);
    } catch (err) {
      dispatch({
        type: "LOGOUT_ERROR",
        payload: "An error occurred logging out.",
      });
    }
  };

  const uploadData = async (payload) => {
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";

    const { year, module, file, month } = payload;

    console.log(
      `Year: ${year} | Month: ${month} | Module: ${module} | File: ${file}`
    );

    let uploadUrl = "";

    if (
      module === "plannedTargets" ||
      module === "coverageTargets" ||
      module === "stockManagementMinMax"
    ) {
      module === "plannedTargets"
        ? (uploadUrl = `http://${apiEndpoint}${port}/import/generic/planned_targets`)
        : module === "coverageTargets"
        ? (uploadUrl = `http://${apiEndpoint}${port}/import/generic/coverage_targets`)
        : (uploadUrl = `http://${apiEndpoint}${port}/import/generic/min_max`);

      console.log(uploadUrl);

      const data = new FormData();
      data.append("data_file", file);
      data.append("param1", year);
      try {
        await axios({
          url: uploadUrl,
          method: "post",
          withCredentials: true,
          data: data,
          headers: {
            "X-CSRFToken": Cookies.get("csrftoken"),
          },
        });
      } catch (err) {
        console.log(err);
      }
    } else if (module === "stockManagement") {
      uploadUrl = `http://${apiEndpoint}${port}/import/`;

      const data = new FormData();
      data.append("import_file", file);
      data.append("year", year);
      data.append("month", month);

      try {
        await axios({
          url: uploadUrl,
          method: "post",
          withCredentials: true,
          data: data,
          headers: {
            "X-CSRFToken": Cookies.get("csrftoken"),
          },
        });
      } catch (err) {
        console.log(err);
      }
    } else if (module === "stockManagementMinMax") {
      uploadUrl = `http://${apiEndpoint}${port}/import/generic/min_max`;
      const data = new FormData();
      data.append("import_file", file);
      data.append("year", year);
      data.append("month", month);
    }
  };
  return (
    <GlobalContext.Provider
      value={{
        activeTab: state.activeTab,
        activeDistrict: state.activeDistrict,
        districts: state.districts,
        quarters: state.quarters,
        currentYear: state.currentYear,
        error: state.error,
        loading: state.loading,
        vaccines: state.vaccines,
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        months: state.months,
        getVaccines,
        getDistricts,
        getQuarters,
        loginUser,
        logoutUser,
        uploadData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
