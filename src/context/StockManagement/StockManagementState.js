import React, { useContext, createContext, useReducer } from "react";
import axios from "axios";

import StockManagementReducer from "./reducer";

import { port, date } from "../GlobalState";

// Bring in our Overview context
import { OverviewContext } from "../../context/Overview/OverviewState";

const apiEndpoint = require("../../env_config").default;

const initialStockManagementState = {
  districtStockLevels: {},
  refillRate: {},
  districtStockTrends: {},
  stockMonths: [],
  defaultStartMonth: `Jan ${date.getFullYear()}`,
  defaultEndMonth:
    date.toDateString().substring(4, 7) + ` ${date.getFullYear()}`,
  defaultVaccine: "PENTA",
  defaultDistrict: ["Abim District"],
  district: "national",
};

// Create context
export const StockManagementContext = createContext(
  initialStockManagementState
);

// Provider component
export const StockManagementContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    StockManagementReducer,
    initialStockManagementState
  );

  const { getMonths } = useContext(OverviewContext);

  // Actions

  const getStockManagementMonths = async () => {
    dispatch({
      type: "LOADING_DISTRICT_STOCKLEVELS_DATA",
      payload: { isLoading: true },
    });

    try {
      const monthsData = await axios.get(
        `http://${apiEndpoint}${port}/api/months`
      );

      dispatch({
        type: "GET_STOCK_MONTHS",
        payload: monthsData.data,
      });

      // Also subscribe data to our overview panel state
      getMonths(monthsData.data);
    } catch (err) {
      dispatch({
        type: "GET_STOCK_MONTHS_ERROR",
        payload:
          "An error occured getting stock management months data from backend",
      });
    }
  };

  const getDistrictStockLevelsData = async (
    vaccine,
    startMonth,
    endMonth,
    district
  ) => {
    dispatch({
      type: "LOADING_DISTRICT_STOCKLEVELS_DATA",
      payload: { isLoading: true },
    });

    try {
      const atHandStockByDistrictData = await axios.get(
        `http://${apiEndpoint}${port}/api/stock/athandbydistrict?district=${district}&endMonth=${endMonth}&startMonth=${startMonth}&vaccine=${vaccine}`
      );

      const payload = {
        atHandStockLevelsData: atHandStockByDistrictData.data,
        endMonth,
        startMonth,
        vaccine,
        isLoading: false,
      };

      dispatch({
        type: "GET_DISTRICT_STOCKLEVELS_DATA",
        payload: payload,
      });
    } catch (err) {
      dispatch({
        type: "GET_DISTRICT_STOCKLEVELS_DATA_ERROR",
        payload:
          "An error occured getting at hand stock level data from backend",
      });
    }
  };

  const getRefillRateData = async (district, endMonth, startMonth, vaccine) => {
    const quotedAndCommaSeparatedDistricts = "'" + district.join("','") + "'";

    dispatch({
      type: "LOADING_REFILL_DATA",
      payload: { isLoading: true },
    });

    try {
      const stockByDistrictVaccineData = await axios.get(
        district.length === 1
          ? `http://${apiEndpoint}${port}/api/stock/stockbydistrictvaccine?district=${district}&endMonth=${endMonth}&startMonth=${startMonth}&vaccine=${vaccine}`
          : `http://${apiEndpoint}${port}/api/stock/stockbydistrictvaccine?districts=[${quotedAndCommaSeparatedDistricts}]&endMonth=${endMonth}&startMonth=${startMonth}&vaccine=${vaccine}`
      );
      const atHandStockByDistrictData = await axios.get(
        `http://${apiEndpoint}${port}/api/stock/athandbydistrict?district=&endMonth=${endMonth}&startMonth=${startMonth}&vaccine=${vaccine}`
      );

      const payload = {
        stockByDistrictVaccineData: stockByDistrictVaccineData.data,
        atHandStockByDistrictData: atHandStockByDistrictData.data,
        endMonth,
        startMonth,
        district,
        vaccine,
        isLoading: false,
      };

      //   Dispatch
      dispatch({
        type: "GET_REFILL_DATA",
        payload: payload,
      });
    } catch (err) {
      dispatch({
        type: "GET_REFILL_DATA_ERROR",
        payload: "An error occured getting refill rate data from backend",
      });
    }
  };

  const getDistrictStockTrendsData = async (
    district,
    endMonth,
    startMonth,
    vaccine
  ) => {
    const quotedAndCommaSeparatedDistricts = "'" + district.join("','") + "'";

    dispatch({
      type: "LOADING_DISTRICT_STOCK_TRENDS_DATA",
      payload: { isLoading: true },
    });

    try {
      const stockByDistrictVaccineStockTrendData = await axios.get(
        district.length === 1
          ? `http://${apiEndpoint}${port}/api/stock/stockbydistrictvaccine?district=${district}&endMonth=${endMonth}&startMonth=${startMonth}&vaccine=${vaccine}`
          : `http://${apiEndpoint}${port}/api/stock/stockbydistrictvaccine?districts=[${quotedAndCommaSeparatedDistricts}]&endMonth=${endMonth}&startMonth=${startMonth}&vaccine=${vaccine}`
      );

      const atHandStockByDistrictStockTrendData = await axios.get(
        `http://${apiEndpoint}${port}/api/stock/athandbydistrict?district=&endMonth=${endMonth}&startMonth=${startMonth}&vaccine=${vaccine}`
      );

      const paylod = {
        stockByDistrictVaccineStockTrendData:
          stockByDistrictVaccineStockTrendData.data,
        atHandStockByDistrictStockTrendData:
          atHandStockByDistrictStockTrendData.data,
        district,
        endMonth,
        startMonth,
        vaccine,
        isLoading: false,
      };
      //   Dispatch

      dispatch({
        type: "GET_DISTRICT_STOCK_TRENDS_DATA",
        payload: paylod,
      });
    } catch (err) {
      dispatch({
        type: "GET_DISTRICT_STOCK_TRENDS_DATA_ERROR",
        payload: "An error occured getting capacity data from backend",
      });
    }
  };

  return (
    <StockManagementContext.Provider
      value={{
        districtStockLevels: state.districtStockLevels,
        refillRate: state.refillRate,
        districtStockTrends: state.districtStockTrends,
        stockMonths: state.stockMonths,
        district: state.district,
        defaultStartMonth: state.defaultStartMonth,
        defaultEndMonth: state.defaultEndMonth,
        defaultVaccine: state.defaultVaccine,
        defaultDistrict: state.defaultDistrict,
        getStockManagementMonths,
        getDistrictStockLevelsData,
        getRefillRateData,
        getDistrictStockTrendsData,
      }}
    >
      {children}
    </StockManagementContext.Provider>
  );
};
