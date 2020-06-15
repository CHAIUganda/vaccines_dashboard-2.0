export default (state, action) => {
  switch (action.type) {
    case "LOADING_ELIGIBILITY_DATA":
      return { ...state, eligibility: action.payload };

    case "LOADING_FUNCTIONALITY_DATA":
      return { ...state, functionality: action.payload };

    case "LOADING_CAPACITY_DATA":
      return { ...state, capacity: action.payload };

    case "LOADING_OPTIMALITY_DATA":
      return { ...state, optimality: action.payload };

    case "LOADING_TEMPERATURE_DATA":
      return { ...state, temperatureMonitoring: action.payload };

    case "GET_ELIGIBILITY_DATA":
      return {
        ...state,
        eligibility: action.payload,
      };

    case "GET_FUNCTIONALITY_DATA":
      return {
        ...state,
        functionality: action.payload,
      };

    case "GET_CAPACITY_DATA":
      return {
        ...state,
        capacity: action.payload,
      };

    case "GET_OPTIMALITY_DATA":
      return {
        ...state,
        optimality: action.payload,
      };

    case "GET_TEMPERATURE_MONITORING_DATA":
      return {
        ...state,
        temperatureMonitoring: action.payload,
      };

    case "GET_ELIGIBILITY_DATA_ERROR":
      return {
        state,
        error: action.payload,
      };

    case "GET_FUNCTIONALITY_DATA_ERROR":
      return {
        state,
        error: action.payload,
      };

    default:
      return state;
  }
};
