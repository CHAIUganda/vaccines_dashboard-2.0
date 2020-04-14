import React, { createContext, useReducer } from "react";
import axios from "axios";

import { port } from "../GlobalState";

import OverviewReducer from "./reducer";

const apiEndpoint = require("../../env_config").default;

export const initialOverviewState = {
  coldChainEligibilityData: { isLoading: true },
  coldChainFunctionalityData: { isLoading: true },
  coldChainCapacityData: { isLoading: true },
  stockManagementData: { isLoading: true },
  coverageData: { isLoading: true },
  months: [],
};

// Create context
export const OverviewContext = createContext(initialOverviewState);

// Provider component
export const OverviewContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(OverviewReducer, initialOverviewState);

  const getEligibilityColdChainData = (payload) => {
    dispatch({
      type: "SET_ELIGIBILITY_COLD_CHAIN_DATA",
      payload: payload,
    });
  };

  const getFunctionalityColdChainData = (payload) => {
    dispatch({
      type: "SET_FUNCTIONALITY_COLD_CHAIN_DATA",
      payload: payload,
    });
  };

  const getCapacityColdChainData = (payload) => {
    dispatch({
      type: "SET_CAPACITY_COLD_CHAIN_DATA",
      payload: payload,
    });
  };

  const getStockManagementData = async ({ month }, district) => {
    dispatch({
      type: "LOADING_STOCKMANAGEMENT_DATA",
      payload: { isLoading: true },
    });

    try {
      const atHandStockByDistrictData = await axios.get(
        `http://${apiEndpoint}${port}/api/stock/athandbydistrict?district=${district}&endMonth=${month}`
      );

      const payload = {
        atHandStockLevelsData: atHandStockByDistrictData.data,
        month,
        district,
        isLoading: false,
      };

      dispatch({
        type: "SET_STOCKMANAGEMENT_DATA",
        payload: payload,
      });
    } catch (err) {
      dispatch({
        type: "GET_DATA_ERROR",
        payload:
          "An error occured getting at hand stock level data from backend",
      });
    }
  };

  const getCoverageData = async ({ month, period }, district, vaccine) => {
    dispatch({
      type: "LOADING_COVERAGE_DATA",
      payload: { isLoading: true },
    });

    try {
      const vaccineDosesByPeriod = await axios.get(
        `http://${apiEndpoint}${port}/coverage/api/vaccinedoses_by_period?district=${district}&period=${period}`
      );

      const payload = {
        data: vaccineDosesByPeriod.data,
        month,
        period,
        district,
        isLoading: false,
      };

      dispatch({
        type: "SET_COVERAGE_DATA",
        payload: payload,
      });
    } catch (err) {
      dispatch({
        type: "GET_COVERAGE_ERROR",
        payload: "An error occured getting coverage data from backend",
      });
    }
  };

  const getMonths = (payload) => {
    dispatch({
      type: "SET_MONTHS",
      payload: payload,
    });
  };

  return (
    <OverviewContext.Provider
      value={{
        coldChainEligibilityData: state.coldChainEligibilityData,
        coldChainFunctionalityData: state.coldChainFunctionalityData,
        coldChainCapacityData: state.coldChainCapacityData,
        stockManagementData: state.stockManagementData,
        coverageData: state.coverageData,
        months: state.months,
        getEligibilityColdChainData,
        getFunctionalityColdChainData,
        getCapacityColdChainData,
        getStockManagementData,
        getCoverageData,
        getMonths,
      }}
    >
      {children}
    </OverviewContext.Provider>
  );
};
