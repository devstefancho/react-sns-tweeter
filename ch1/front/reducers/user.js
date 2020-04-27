export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";
export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";

// dummy User
const dummy = {
  userInfo: {
    id: 1,
    nickName: "stefan",
    password: "12345",
  },
};

const none = {};

export const initialState = {
  isLogged: false,
  isLogging: false,
  isSigned: false,
  isSigningUp: false,
  userInfo: {
    id: "",
    nickName: "",
    password: "",
  },
  error: "",
};

export const LOG_OUT = {
  type: LOG_OUT_REQUEST,
  data: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //LOG_IN, LOG_OUT
    case LOG_IN_REQUEST:
      return { ...state, isLogged: false, isLogging: true, userInfo: none };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        isLogged: true,
        isLogging: false,
        userInfo: dummy,
      };
    case LOG_IN_FAILURE:
      return { ...state, isLogged: false, isLogging: false, userInfo: none };

    case LOG_OUT_REQUEST:
      return {
        ...state,
        isLogged: false,
        isLogging: false,
        userInfo: action.data,
      };
    // SIGN_UP
    case SIGN_UP_REQUEST:
      return {
        ...state,
        isSigned: false,
        isSigningUp: true,
        userInfo: action.data,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        isSigned: true,
        isSigningUp: false,
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        isSigned: false,
        isSigningUp: false,
        data: action.error,
      };

    default:
      return state;
  }
};

export default reducer;
