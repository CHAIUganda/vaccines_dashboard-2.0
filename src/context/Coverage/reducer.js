export default (state, action) => {
  switch (action.type) {
    case "GET_COVERAGE_BY_MONTH_DATA":
      return {
        ...state,
        coverageByMonth: action.payload,
      };

    case "GET_COVERAGE_BY_YEAR_DATA":
      return {
        ...state,
        coverageByYear: action.payload,
      };

    case "GET_DROPOUT_RATE_DATA":
      return {
        ...state,
        dropoutRate: action.payload,
      };

    case "GET_REDCAT_DATA":
      return {
        ...state,
        redCategorisation: action.payload,
      };

    case "LOADING_COVERAGE_BY_MONTH_DATA":
      return { ...state, coverageByMonth: action.payload };

    case "LOADING_COVERAGE_BY_YEAR_DATA":
      return { ...state, coverageByYear: action.payload };

    case "LOADING_DROPOUT_RATE_DATA":
      return { ...state, dropoutRate: action.payload };

    case "LOADING_REDCAT_DATA":
      return { ...state, redCategorisation: action.payload };

    case "GET_REDCAT_DATA_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "GET_DROPOUT_RATE_DATA_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "GET_COVERAGE_BY_MONTH_DATA_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "GET_COVERAGE_BY_YEAR_DATA_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
