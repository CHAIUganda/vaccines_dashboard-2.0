import React, { useContext, createContext, useReducer } from "react";
import axios from "axios";

import ColdChainReducer from "./reducer";
import { port, date } from "../GlobalState";

// Bring in our Overview context
import { OverviewContext } from "../../context/Overview/OverviewState";

const apiEndpoint = require("../../env_config").default;

// Cold Chain Years
const generateColdChainYears = () => {
  let years = [];
  for (let i = date.getFullYear(); i > date.getFullYear() - 2; i--) {
    years.push(i);
  }

  return years;
};

const CARE_LEVELS = [
  "District Store",

  "Public HCIV",

  "Public HCII",

  "Public HCIII",

  "NGO Hospital",

  "Public Hospital",

  "NGO HCIII",
];

const initialColdChainState = {
  eligibility: { isLoading: true },
  functionality: { isLoading: true },
  optimality: { isLoading: true },
  capacity: { isLoading: true },
  temperatureMonitoring: { isLoading: true },
  coldChainYears: generateColdChainYears(),
  coldChainCareLevels: CARE_LEVELS,
  defaultCareLevel: "District Store",
  district: "national",
};

// Create context
export const ColdChainContext = createContext(initialColdChainState);

// Provider component
export const ColdChainContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ColdChainReducer, initialColdChainState);
  const {
    getEligibilityColdChainData,
    getFunctionalityColdChainData,
    getCapacityColdChainData,
  } = useContext(OverviewContext);

  // Actions
  const getEligibilityData = async (startQuarter, endQuarter, district) => {
    dispatch({
      type: "LOADING_ELIGIBILITY_DATA",
      payload: { isLoading: true },
    });

    try {
      const eligibilityDataTableData = await axios.get(
        `http://${apiEndpoint}${port}/coldchain/api/eligiblefacilitiesmetrics?start_period=${startQuarter}&end_period=${endQuarter}`,
      );

      const eligibilityMetricsChartData = await axios.get(
        `http://${apiEndpoint}${port}/coldchain/api/eligiblefacilitiesstats?district=${district}&start_period=${startQuarter}&end_period=${endQuarter}`,
      );

      const payload = {
        eligibilityDataTableData: eligibilityDataTableData.data,
        eligibilityMetricsChartData: eligibilityMetricsChartData.data,
        startQuarter,
        endQuarter,
        district,
        isLoading: false,
      };

      dispatch({
        type: "GET_ELIGIBILITY_DATA",
        payload: payload,
      });

      // Also subscribe data to our overview panel state
      getEligibilityColdChainData(payload);
    } catch (err) {
      dispatch({
        type: "GET_ELIGIBILITY_DATA_ERROR",
        payload: "An error occured getting eligibility data from backend",
      });
    }
  };

  const getFunctionalityData = async (
    startQuarter,
    endQuarter,
    district,
    careLevel,
  ) => {
    dispatch({
      type: "LOADING_FUNCTIONALITY_DATA",
      payload: { isLoading: true },
    });

    try {
      const functionalityMetricsChartData = await axios.get(
        `http://${apiEndpoint}${port}/coldchain/api/functionalitymetricsgraph?carelevel=${careLevel}&district=${district}&start_period=${startQuarter}&end_period=${endQuarter}`,
      );
      const functionalityDataTableData = await axios.get(
        `http://${apiEndpoint}${port}/coldchain/api/functionalitymetrics?carelevel=${careLevel}&start_period=${startQuarter}&end_period=${endQuarter}`,
      );

      const payload = {
        functionalityDataTableData: functionalityDataTableData.data,
        functionalityMetricsChartData: functionalityMetricsChartData.data,
        startQuarter,
        endQuarter,
        district,
        careLevel,
        isLoading: false,
      };

      //   Dispatch
      dispatch({
        type: "GET_FUNCTIONALITY_DATA",
        payload: payload,
      });

      // Also subscribe data to our overview panel state
      getFunctionalityColdChainData(payload);
    } catch (err) {
      dispatch({
        type: "GET_ELIGIBILITY_DATA_ERROR",
        payload: "An error occured getting eligibility data from backend",
      });
    }
  };

  const getCapacityData = async (
    startQuarter,
    endQuarter,
    district,
    careLevel,
  ) => {
    dispatch({
      type: "LOADING_CAPACITY_DATA",
      payload: { isLoading: true },
    });

    try {
      const capacityMetricsChartData = await axios.get(
        `http://${apiEndpoint}${port}/coldchain/api/capacitymetricsstats?carelevel=${careLevel}&district=${district}&start_period=${startQuarter}&end_period=${endQuarter}`,
      );

      const capacityDataTableData = await axios.get(
        `http://${apiEndpoint}${port}/coldchain/api/capacitymetrics?carelevel=${careLevel}&start_period=${startQuarter}&end_period=${endQuarter}`,
      );

      const payload = {
        capacityDataTableData: capacityDataTableData.data,
        capacityMetricsChartData: capacityMetricsChartData.data,
        district: district,
        careLevel,
        startQuarter,
        endQuarter,
        isLoading: false,
      };
      //   Dispatch
      dispatch({
        type: "GET_CAPACITY_DATA",
        payload: payload,
      });

      // Also subscribe data to our overview panel state
      getCapacityColdChainData(payload);
    } catch (err) {
      dispatch({
        type: "GET_CAPACITY_DATA_ERROR",
        payload: "An error occured getting capacity data from backend",
      });
    }
  };

  const getOptimalityData = async (year, district, careLevel) => {
    dispatch({
      type: "LOADING_OPTIMALITY_DATA",
      payload: { isLoading: true },
    });

    try {
      const optimalityMetricsChartData = await axios.get(
        `http://${apiEndpoint}${port}/coldchain/api/optimalitystats?carelevel=${careLevel}&district=${district}&year=${year}`,
      );

      const optimalityDataTableData = await axios.get(
        `http://${apiEndpoint}${port}/coldchain/api/optimalitymetrics?carelevel=${careLevel}&year=${year}`,
      );

      const payload = {
        optimalityDataTableData: optimalityDataTableData.data,
        optimalityMetricsChartData: optimalityMetricsChartData.data,
        district,
        careLevel,
        year,
        isLoading: false,
      };

      //   Dispatch
      dispatch({
        type: "GET_OPTIMALITY_DATA",
        payload: payload,
      });
    } catch (err) {
      dispatch({
        type: "GET_OPTIMALITY_DATA_ERROR",
        payload: "An error occured getting optimality data from backend",
      });
    }
  };

  const getTemperatureMonitoringData = async (year, district) => {
    dispatch({
      type: "LOADING_TEMPERATURE_DATA",
      payload: { isLoading: true },
    });

    try {
      const temperatureMonitoringMetricsChartData = await axios.get(
        `http://${apiEndpoint}${port}/coldchain/api/tempheatfreezestats?district=${district}&year=${year}`,
      );

      const temperatureMonitoringDataTableData = await axios.get(
        `http://${apiEndpoint}${port}/coldchain/api/tempreportmetrics?year=${year}`,
      );

      const temperatureMonitoringReportingRatesData = await axios.get(
        `http://${apiEndpoint}${port}/coldchain/api/tempreportingratestats?district=${district}&year=${year}`,
      );

      const payload = {
        temperatureMonitoringDataTableData:
          temperatureMonitoringDataTableData.data,
        temperatureMonitoringMetricsChartData:
          temperatureMonitoringMetricsChartData.data,
        temperatureMonitoringReportingRatesData:
          temperatureMonitoringReportingRatesData.data,
        district,
        year,
        isLoading: false,
      };

      //   Dispatch
      dispatch({
        type: "GET_TEMPERATURE_MONITORING_DATA",
        payload: payload,
      });
    } catch (err) {
      dispatch({
        type: "GET_TEMPERATURE_MONITORING_DATA_ERROR",
        payload: "An error occured getting optimality data from backend",
      });
    }
  };
  return (
    <ColdChainContext.Provider
      value={{
        eligibility: state.eligibility,
        functionality: state.functionality,
        capacity: state.capacity,
        optimality: state.optimality,
        temperatureMonitoring: state.temperatureMonitoring,
        coldChainCareLevels: state.coldChainCareLevels,
        coldChainYears: state.coldChainYears,
        district: state.district,
        defaultCareLevel: state.defaultCareLevel,
        getEligibilityData,
        getFunctionalityData,
        getCapacityData,
        getOptimalityData,
        getTemperatureMonitoringData,
      }}
    >
      {children}
    </ColdChainContext.Provider>
  );
};
