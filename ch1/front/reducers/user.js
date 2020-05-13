export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";
export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const LOAD_USER_REQUEST = "LOAD_USER_REQUEST";
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS";
export const LOAD_USER_FAILURE = "LOAD_USER_FAILURE";

// dummy User

export const initialState = {
  isLogging: false,
  isSigned: false,
  isSigningUp: false,
  me: "",
  userInfo: {
    // 남의 정보
    id: "",
    nickname: "",
    password: "",
  },
  followingList: [],
  followerList: [],
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
      return { ...state, isLogging: true };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        isLogging: false,
        me: action.data, // signup.js에서 dispatch에 data를 넣어줌. (onSubmit의 else에 위치)
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        isLogging: false,
        me: null,
      };

    case LOG_OUT_REQUEST:
      return {
        ...state,
        isLogging: false,
        me: null,
      };
    // SIGN_UP
    case SIGN_UP_REQUEST:
      return {
        ...state,
        isSigned: false,
        isSigningUp: true,
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
        // error: e,
      };

    case LOAD_USER_REQUEST: {
      return {
        ...state,
      };
    }
    case LOAD_USER_SUCCESS: {
      if (action.me) {
        return {
          ...state,
          me: action.data,
        };
      }
      return {
        ...state,
        userInfo: action.data,
      };
    }
    case LOAD_USER_FAILURE:
      return {
        ...state,
        // error: e,
      };

    default:
      return { ...state };
  }
};

export default reducer;
