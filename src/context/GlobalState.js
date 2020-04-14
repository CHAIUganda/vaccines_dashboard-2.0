import React, { createContext, useReducer } from "react";
import axios from "axios";
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
  apiEndpoint === "localhost" || apiEndpoint === "34.69.101.182" ? ":9000" : "";

// Variables
export const district = "national";
export const date = new Date();

// Inital state for APP.
const initialState = {
  activeTab: 0,
  districts: [],
  vaccines: [],
  quarters: [],
  activeDistrict: district,
  error: null,
  loading: true,
  currentYear: date.getFullYear(),
  isAuthenticated: false,
  token: "",
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
    } catch (err) {
      dispatch({
        type: "LOGIN_ERROR",
        payload:
          "An error occured logging in. Please check your username and or password!",
      });
    }
  };

  const logoutUser = async (token) => {
    console.log(`In logout token passed is ${token}`);
    const logoutUrl = `http://${apiEndpoint}${port}/auth/logout/`;

    try {
      const data = await axios.post(logoutUrl, {}, OPTIONS);

      sessionStorage.removeItem("email");
      sessionStorage.removeItem("token");

      dispatch({
        type: "LOG_OUT",
        payload: {},
      });

      console.log(data);
    } catch (err) {}
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
        getVaccines,
        getDistricts,
        getQuarters,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
