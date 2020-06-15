export default (state, action) => {
  switch (action.type) {
    case "LOADING_ORGANISATIONS":
      return {
        ...state,
        organisations: action.payload,
      };

    case "LOADING_PLANNED_ACTIVITIES_DATA":
      return {
        ...state,
        activityCompletionStatus: action.payload,
      };

    case "LOADING_FUNDING_STATUS_DATA":
      return {
        ...state,
        fundingStatus: action.payload,
      };

    case "LOADING_ALL_ACTIVITIES_DATA":
      return {
        ...state,
        activities: action.payload,
      };

    case "UPDATING_ACTIVITY":
      return {
        ...state,
      };
    case "GET_ORGANISATIONS":
      return {
        ...state,
        organisations: action.payload,
      };

    case "GET_FUNDING_SOURCES":
      return {
        ...state,
        fundingSources: action.payload,
      };

    case "GET_ISCs":
      return {
        ...state,
        ISC: action.payload,
      };

    case "GET_FUNDING_STATUS_DATA":
      return {
        ...state,
        fundingStatus: action.payload,
      };

    case "GET_PLANNED_ACTIVITIES_DATA":
      return {
        ...state,
        activityCompletionStatus: action.payload,
      };

    case "GET_ALL_ACTIVITIES_DATA":
      return {
        ...state,
        activities: action.payload,
      };

    //   Errors

    case "GET_ORGANISATIONS_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "GET_FUNDING_SOURCES_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "GET_ACTIVITY_COMPLETION_STATUS_DATA_ERROR":
      return {
        state,
        error: action.payload,
      };

    case "GET_PLANNED_ACTIVITIES_ERROR":
      return {
        state,
        error: action.payload,
      };

    case "GET_FUNDING_STATUS_DATA_ERROR":
      return {
        state,
        error: action.payload,
      };

    case "GET_ALL_ACTIVITIES_ERROR":
      return {
        state,
        error: action.payload,
      };

    default:
      return state;
  }
};
