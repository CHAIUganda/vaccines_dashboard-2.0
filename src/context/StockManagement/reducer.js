export default (state, action) => {
  switch (action.type) {
    case "LOADING_DISTRICT_STOCKLEVELS_DATA":
      return {
        ...state,
        districtStockLevels: action.payload,
      };

    case "LOADING_REFILL_DATA":
      return {
        ...state,
        refillRate: action.payload,
      };

    case "LOADING_DISTRICT_STOCK_TRENDS_DATA":
      return {
        ...state,
        districtStockTrends: action.payload,
      };

    case "GET_DISTRICT_STOCK_TRENDS_DATA":
      return {
        ...state,
        districtStockTrends: action.payload,
      };

    case "GET_STOCK_MONTHS":
      return {
        ...state,
        stockMonths: action.payload,
      };

    case "GET_DISTRICT_STOCKLEVELS_DATA":
      return {
        ...state,
        districtStockLevels: action.payload,
      };

    case "GET_REFILL_DATA":
      return {
        ...state,
        refillRate: action.payload,
      };

    case "GET_STOCK_MONTHS_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "GET_DISTRICT_STOCKLEVELS_DATA_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "GET_DISTRICT_STOCK_TRENDS_DATA_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
