export default (state, action) => {
  switch (action.type) {
    case 'LOADING_STOCKMANAGEMENT_DATA':
      return {
        ...state,
        stockManagementData: action.payload,
      };
    case 'LOADING_OVERVIEW_COLD_CHAIN_DATA':
      return {
        ...state,
        coldChainOverviewData: action.payload,
      };
    case 'LOADING_COVERAGE_DATA':
      return {
        ...state,
        coverageData: action.payload,
      };

    case 'SET_STOCKMANAGEMENT_DATA':
      return {
        ...state,
        stockManagementData: action.payload,
      };

    case 'SET_OVERVIEW_COLD_CHAIN_DATA':
      return {
        ...state,
        coldChainOverviewData: action.payload,
      };

    case 'SET_COVERAGE_DATA':
      return {
        ...state,
        coverageData: action.payload,
      };
    case 'SET_ELIGIBILITY_COLD_CHAIN_DATA':
      return {
        ...state,
        coldChainEligibilityData: action.payload,
      };
    case 'SET_FUNCTIONALITY_COLD_CHAIN_DATA':
      return {
        ...state,
        coldChainFunctionalityData: action.payload,
      };
    case 'SET_CAPACITY_COLD_CHAIN_DATA':
      return {
        ...state,
        coldChainCapacityData: action.payload,
      };

    case 'SET_MONTHS':
      return {
        ...state,
        months: action.payload,
      };

    case 'GET_DATA_ERROR':
      return {
        ...state,
        error: action.payload,
      };

    case 'GET_COVERAGE_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
