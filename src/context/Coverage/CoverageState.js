import React, { createContext, useReducer } from "react";
import axios from "axios";

import CoverageReducer from "./reducer";

import { port, date } from "../GlobalState";

const apiEndpoint = require("../../env_config").default;

// Coverage Chain Years
const generateCoverageYears = () => {
  let years = [];
  for (let i = date.getFullYear(); i > date.getFullYear() - 5; i--) {
    years.push(i);
  }

  return years;
};

const initialColdChainState = {
  coverageByMonth: {},
  coverageByYear: {},
  dropoutRate: {},
  redCategorisation: {},
  defaultStartYear: date.getFullYear(),
  defaultVaccine: "ALL",
  defaultDose: "Dose 3",
  coverageYears: generateCoverageYears(),
  district: ["National"],
  doses: ["Dose 1", "Dose 2", "Dose 3"],
};

// Create context
export const CoverageContext = createContext(initialColdChainState);

// Provider component
export const CoverageContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CoverageReducer, initialColdChainState);

  // Actions
  const getCoverageByMonthData = async (
    endYear,
    startYear,
    dose,
    vaccine,
    district
  ) => {
    dispatch({
      type: "LOADING_COVERAGE_BY_MONTH_DATA",
      payload: { isLoading: true },
    });

    try {
      const quotedAndCommaSeparatedDistricts = "'" + district.join("','") + "'";

      const vaccineDosesForCoverageByMonthData = await axios.get(
        district.length === 1
          ? `http://${apiEndpoint}${port}/coverage/api/vaccinedoses_by_period?district=${district}&dose=${dose}&endYear=${endYear}&startYear=${startYear}&vaccine=${vaccine}`
          : `http://${apiEndpoint}${port}/coverage/api/vaccinedoses_by_period?districts=[${quotedAndCommaSeparatedDistricts}]&dose=${dose}&endYear=${endYear}&startYear=${startYear}&vaccine=${vaccine}`
      );

      const vaccineDosesForCoverageByMonthMapData = await axios.get(
        `http://${apiEndpoint}${port}/coverage/api/vaccinedoses_by_period?dataType=map&endYear=${startYear}`
      );

      const payload = {
        vacineDataForMap: vaccineDosesForCoverageByMonthMapData.data,
        vaccineDosesForChart: vaccineDosesForCoverageByMonthData.data,
        vaccine,
        dose,
        isLoading: false,
        startYear,
        endYear,
        district,
      };

      //   Dispatch
      dispatch({
        type: "GET_COVERAGE_BY_MONTH_DATA",
        payload: payload,
      });
    } catch (err) {
      dispatch({
        type: "GET_COVERAGE_BY_MONTH_DATA_ERROR",
        payload: "An error occured getting red category data from backend",
      });
    }
  };

  const getCoverageByYearData = async (
    endYear,
    startYear,
    dose,
    vaccine,
    district
  ) => {
    dispatch({
      type: "LOADING_COVERAGE_BY_YEAR_DATA",
      payload: { isLoading: true },
    });

    try {
      const quotedAndCommaSeparatedDistricts = "'" + district.join("','") + "'";

      const vaccineDosesForCoverageByYearData = await axios.get(
        district.length === 1
          ? `http://${apiEndpoint}${port}/coverage/api/vaccinedoses_by_period?district=${district}&dose=${dose}&endYear=${endYear}&startYear=${startYear}&vaccine=${vaccine}`
          : `http://${apiEndpoint}${port}/coverage/api/vaccinedoses_by_period?districts=[${quotedAndCommaSeparatedDistricts}]&dose=${dose}&endYear=${endYear}&startYear=${startYear}&vaccine=${vaccine}`
      );

      const payload = {
        vaccineDosesForCoverageByYear: vaccineDosesForCoverageByYearData.data,
        vaccine,
        dose,
        isLoading: false,
        startYear,
        endYear,
        district,
      };

      //   Dispatch
      dispatch({
        type: "GET_COVERAGE_BY_YEAR_DATA",
        payload: payload,
      });
    } catch (err) {
      dispatch({
        type: "GET_COVERAGE_BY_YEAR_DATA_ERROR",
        payload: "An error occured getting red category data from backend",
      });
    }
  };

  const getDropoutRateData = async (
    endYear,
    startYear,
    dose,
    vaccine,
    district
  ) => {
    dispatch({
      type: "LOADING_DROPOUT_RATE_DATA",
      payload: { isLoading: true },
    });

    try {
      const quotedAndCommaSeparatedDistricts = "'" + district.join("','") + "'";

      const vaccineDosesForCoverageByMonthData = await axios.get(
        district.length === 1
          ? `http://${apiEndpoint}${port}/coverage/api/vaccinedoses_by_period?district=${district}&dose=${dose}&endYear=${endYear}&startYear=${startYear}&vaccine=${vaccine}`
          : `http://${apiEndpoint}${port}/coverage/api/vaccinedoses_by_period?districts=[${quotedAndCommaSeparatedDistricts}]&dose=${dose}&endYear=${endYear}&startYear=${startYear}&vaccine=${vaccine}`
      );

      const vaccineDosesForCoverageByMonthMapData = await axios.get(
        `http://${apiEndpoint}${port}/coverage/api/vaccinedoses_by_period?dataType=map&endYear=${startYear}`
      );

      const payload = {
        vacineDataForMap: vaccineDosesForCoverageByMonthMapData.data,
        vaccineDosesForChart: vaccineDosesForCoverageByMonthData.data,
        vaccine,
        dose,
        isLoading: false,
        startYear,
        endYear,
        district,
      };

      //   Dispatch
      dispatch({
        type: "GET_DROPOUT_RATE_DATA",
        payload: payload,
      });
    } catch (err) {
      dispatch({
        type: "GET_DROPOUT_RATE_DATA_ERROR",
        payload: "An error occured getting red category data from backend",
      });
    }
  };

  const getRedCategoryData = async (
    endYear,
    startYear,
    dose,
    vaccine,
    district
  ) => {
    dispatch({
      type: "LOADING_REDCAT_DATA",
      payload: { isLoading: true },
    });

    try {
      const vaccineDosesByPeriodRedCategoryData = await axios.get(
        `http://${apiEndpoint}${port}/coverage/api/vaccinedoses_by_period?district=${district}&dose=${dose}&enableDistrictGrouping=1&endYear=${endYear}&startYear=${startYear}&vaccine=${vaccine}`
      );

      const vaccineDosesForMapData = await axios.get(
        `http://${apiEndpoint}${port}/coverage/api/vaccinedoses_by_period?dataType=map&endYear=${startYear}`
      );

      const payload = {
        vacineDataForMap: vaccineDosesForMapData.data,
        vaccineDosesForChart: vaccineDosesByPeriodRedCategoryData.data,
        vaccine,
        dose,
        isLoading: false,
        startYear,
        endYear,
        // Set district to an empty array since we dont filter by district under red category
        district: undefined,
      };

      //   Dispatch
      dispatch({
        type: "GET_REDCAT_DATA",
        payload: payload,
      });
    } catch (err) {
      dispatch({
        type: "GET_REDCAT_DATA_ERROR",
        payload: "An error occured getting red category data from backend",
      });
    }
  };

  return (
    <CoverageContext.Provider
      value={{
        coverageByMonth: state.coverageByMonth,
        coverageByYear: state.coverageByYear,
        dropoutRate: state.dropoutRate,
        redCategorisation: state.redCategorisation,
        coverageYears: state.coverageYears,
        defaultVaccine: state.defaultVaccine,
        defaultDose: state.defaultDose,
        district: state.district,
        doses: state.doses,
        getCoverageByMonthData,
        getCoverageByYearData,
        getDropoutRateData,
        getRedCategoryData,
      }}
    >
      {children}
    </CoverageContext.Provider>
  );
};
