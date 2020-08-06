export default (state, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        loggedInUser: action.payload.loggedInUser,
        isSuperUser: action.payload.isSuperUser,
        imcID: action.payload.imcID,
      };

    case "LOG_OUT":
      return {
        ...state,
        isAuthenticated: false,
        token: action.payload.token,
        loggedInUser: action.payload.loggedInUser,
        isSuperUser: action.payload.isSuperUser,
        imcID: action.payload.imcID,
      };

    case "LOADING_ALL_USERS":
      return {
        ...state,
        users: action.payload,
      };

    case "GET_USER_ISCs":
      return {
        ...state,
        userISC: action.payload,
      };
    case "GET_VACCINES":
      return {
        ...state,
        loading: false,
        vaccines: action.payload,
      };

    case "GET_DISTRICTS":
      return {
        ...state,
        loading: false,
        districts: action.payload,
      };
    case "GET_QUARTERS":
      return {
        ...state,
        loading: false,
        quarters: action.payload,
      };

    case "GET_USERS":
      return {
        ...state,
        loading: false,
        users: { users: action.payload, isLoading: false },
      };

    case "GET_ELIGIBILITY_DATA":
      return {
        ...state,
        loading: false,
        coldChain: {
          eligibility: action.payload,
        },
      };

    case "GET_VACCINES_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "GET_DISTRICTS_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "GET_QUARTERS_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "GET_ELIGIBILITY_DATA_ERROR":
      return {
        state,
        error: action.payload,
      };

    case "LOGIN_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "LOGOUT_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "GET_USERS_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "GET_USER_ISCs_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
