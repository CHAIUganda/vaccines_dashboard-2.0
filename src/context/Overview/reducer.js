export default (state, action) => {
  switch (action.type) {
    case "SET_ELIGIBILITY_COLD_CHAIN_DATA":
      return {
        ...state,
        coldChainEligibilityData: action.payload,
      };
    case "SET_FUNCTIONALITY_COLD_CHAIN_DATA":
      return {
        ...state,
        coldChainfunctionalityData: action.payload,
      };
    case "SET_CAPACITY_COLD_CHAIN_DATA":
      return {
        ...state,
        coldChainCapacityData: action.payload,
      };
    default:
      return state;
  }
};
