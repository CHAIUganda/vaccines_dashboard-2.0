import React, { createContext, useReducer } from "react";

import OverviewReducer from "./reducer";

export const initialOverviewState = {
  coldChainEligibilityData: { isLoading: true },
  coldChainfunctionalityData: { isLoading: true },
  coldChainCapacityData: { isLoading: true },
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

  return (
    <OverviewContext.Provider
      value={{
        coldChainEligibilityData: state.coldChainEligibilityData,
        coldChainfunctionalityData: state.coldChainfunctionalityData,
        coldChainCapacityData: state.coldChainCapacityData,
        getEligibilityColdChainData,
        getFunctionalityColdChainData,
        getCapacityColdChainData,
      }}
    >
      {children}
    </OverviewContext.Provider>
  );
};
