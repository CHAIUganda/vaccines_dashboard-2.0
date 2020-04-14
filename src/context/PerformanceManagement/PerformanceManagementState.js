import React, { createContext, useReducer } from "react";
import axios from "axios";

import PerformanceManagementReducer from "./reducer";

import { port, date } from "../GlobalState";

const apiEndpoint = require("../../env_config").default;

const generate_quarters = () => {
  let quarters = [];

  let years = [];
  let year = date.getFullYear();
  let quarters_list = [
    ["01", "Q1"],
    ["02", "Q2"],
    ["03", "Q3"],
    ["04", "Q4"],
  ];

  // Get workplan time range (18 months, ~ 2 years)
  for (let i = year + 1; i > year - 1; i--) {
    years.push(i);
  }

  for (let i = 0; i <= years.length - 1; i++) {
    for (let j = 0; j <= quarters_list.length - 1; j++) {
      quarters.push({
        name: `${years[i] + " - " + quarters_list[j][1]} `,
        value: `${years[i] + quarters_list[j][0]}`,
      });
    }
  }

  //   Sort array by years and then get the 6 quarters we require

  return quarters
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, quarters.length - 2);
};

const quarterCategories = generate_quarters()
  .map((q) => q.name)
  .sort();

const lastWorkPlanQuarter = generate_quarters()
  .map((q) => q.value)
  .sort()
  .pop();

const initialColdChainState = {
  quarters: generate_quarters(),
  quarterCategories: quarterCategories,
  currentYearStartQuarter: `${date.getFullYear()}01`,
  lastWorkPlanQuarter,
  ISC: [],
  organisations: [],
  defaultOrganisation: "All",
  defaultISC: "All",
  defaultFundingStatus: true,
  activityCompletionStatus: {},
  fundingStatus: {},
  activities: {},
};

// Create context
export const PerformanceManagementContext = createContext(
  initialColdChainState
);

// Provider component
export const PerformanceManagementContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    PerformanceManagementReducer,
    initialColdChainState
  );

  //   Actions
  const getISCs = async () => {
    try {
      const ISCdata = await axios.get(
        `http://${apiEndpoint}${port}/performance_management/api/immunizationcomponents`
      );

      const ISC = ["All", ...ISCdata.data.results.map((isc) => isc.name)];

      dispatch({
        type: "GET_ISCs",
        payload: ISC,
      });
    } catch (err) {
      dispatch({
        type: "GET_ISCs_ERROR",
        payload: "An error occured getting ISCs from backend",
      });
    }
  };

  const getOrganistations = async () => {
    try {
      const organisations = await axios.get(
        `http://${apiEndpoint}${port}/performance_management/api/organizations`
      );

      const ORGS = [
        "All",
        ...organisations.data.results.map((org) => org.name),
      ];

      dispatch({
        type: "GET_ORGANISATIONS",
        payload: ORGS,
      });
    } catch (err) {
      dispatch({
        type: "GET_ORGANISATIONS_ERROR",
        payload: "An error occured getting organisations from backend",
      });
    }
  };

  const getActivityCompletionStatusData = async (
    startQuarter,
    endQuarter,
    organization,
    isc,
    fundingStatus
  ) => {
    const status = fundingStatus === true ? "Secured" : "Unsecured";

    dispatch({
      type: "LOADING_PLANNED_ACTIVITIES_DATA",
      payload: { isLoading: true },
    });

    try {
      const plannedActivitiesPerQuarterData = await axios.get(
        `http://${apiEndpoint}${port}/performance_management/api/activityperquarter?start_period=${startQuarter}&end_period=${endQuarter}&organization=${organization}&isc=${isc}&funding=${status}`
      );

      const activityCompletionStatusData = await axios.get(
        `http://${apiEndpoint}${port}/performance_management/api/activitystatusprogressstatsstart_period=${startQuarter}&end_period=${endQuarter}&organization=${organization}&isc=${isc}&funding=${status}`
      );

      const activitiesByResponsibleOrganisationData = await axios.get(
        `http://${apiEndpoint}${port}/performance_management/api/activitybyorganizationstats=${startQuarter}&end_period=${endQuarter}&organization=${organization}&isc=${isc}&funding=${status}`
      );

      const payload = {
        plannedActivities: plannedActivitiesPerQuarterData.data,
        completionStatus: activityCompletionStatusData.data,
        activitiesByResponsibleOrganisation:
          activitiesByResponsibleOrganisationData.data,
        isLoading: false,
      };

      dispatch({
        type: "GET_PLANNED_ACTIVITIES_DATA",
        payload: payload,
      });
    } catch (err) {
      dispatch({
        type: "GET_PLANNED_ACTIVITIES_PER_QUARTER_DATA_ERROR",
        payload: { isLoading: true },
      });
    }
  };

  const getFundingStatusData = async (
    startQuarter,
    endQuarter,
    organization,
    isc,
    fundingStatus
  ) => {
    const status = fundingStatus === true ? "Secured" : "Unsecured";

    dispatch({
      type: "LOADING_FUNDING_STATUS_DATA",
      payload: { isLoading: true },
    });

    try {
      const budgetAllocationPerQuarter = await axios.get(
        `http://${apiEndpoint}${port}/performance_management/api/budgetperquarter?start_period=${startQuarter}&end_period=${endQuarter}&organization=${organization}&isc=${isc}&funding=${status}`
      );

      const budgetAllocationPerRegion = await axios.get(
        `http://${apiEndpoint}${port}/performance_management/api/budgetallocationperregion?start_period=${startQuarter}&end_period=${endQuarter}&organization=${organization}&isc=${isc}&funding=${status}`
      );

      const ISCFundingStats = await axios.get(
        `http://${apiEndpoint}${port}/performance_management/api/iscfundingstats?start_period=${startQuarter}&end_period=${endQuarter}&organization=${organization}&isc=${isc}&funding=${status}`
      );

      const fundingSourcesStats = await axios.get(
        `http://${apiEndpoint}${port}/performance_management/api/fundsourcemetrics?start_period=${startQuarter}&end_period=${endQuarter}&organization=${organization}&isc=${isc}&funding=${status}`
      );

      const payload = {
        budgetAllocationPerRegion: budgetAllocationPerRegion.data,
        budgetAllocationPerQuarter: budgetAllocationPerQuarter.data,
        ISTableData: ISCFundingStats.data,
        fundingSourcesData: fundingSourcesStats.data,
        isLoading: false,
      };

      dispatch({
        type: "GET_FUNDING_STATUS_DATA",
        payload: payload,
      });
    } catch (err) {
      dispatch({
        type: "GET_FUNDING_STATUS_DATA_ERROR",
        payload: { isLoading: true },
      });
    }
  };

  const getActivitiesData = async (
    startQuarter,
    endQuarter,
    organization,
    isc,
    fundingStatus
  ) => {
    const status = fundingStatus === true ? "Secured" : "Unsecured";
    dispatch({
      type: "LOADING_ALL_ACTIVITIES_DATA",
      payload: { isLoading: true },
    });

    try {
      const allActivities = await axios.get(
        `http://${apiEndpoint}${port}/performance_management/api/activitymetrics?start_period=${startQuarter}&end_period=${endQuarter}&organization=${organization}&isc=${isc}&funding=${status}`
      );

      dispatch({
        type: "GET_ALL_ACTIVITIES_DATA",
        payload: {
          allActivities: allActivities.data.results,
          isLoading: false,
        },
      });
    } catch (err) {
      dispatch({
        type: "GET_ALL_ACTIVITIES_ERROR",
        payload: { isLoading: true },
      });
    }
  };

  return (
    <PerformanceManagementContext.Provider
      value={{
        organisations: state.organisations,
        quarters: state.quarters,
        quarterCategories: quarterCategories,
        currentYearStartQuarter: state.currentYearStartQuarter,
        lastWorkPlanQuarter: state.lastWorkPlanQuarter,
        ISC: state.ISC,
        defaultOrganisation: state.defaultOrganisation,
        defaultISC: state.defaultISC,
        defaultFundingStatus: state.defaultFundingStatus,
        activityCompletionStatus: state.activityCompletionStatus,
        plannedActivitiesPerQuarter: state.plannedActivitiesPerQuarter,
        fundingStatus: state.fundingStatus,
        activities: state.activities,
        getOrganistations,
        getISCs,
        getActivityCompletionStatusData,
        getFundingStatusData,
        getActivitiesData,
      }}
    >
      {children}
    </PerformanceManagementContext.Provider>
  );
};
