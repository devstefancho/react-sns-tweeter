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

export const FOLLOW_REQUEST = "FOLLOW_REQUEST";
export const FOLLOW_SUCCESS = "FOLLOW_SUCCESS";
export const FOLLOW_FAILURE = "FOLLOW_FAILURE";

export const UNFOLLOW_REQUEST = "UNFOLLOW_REQUEST";
export const UNFOLLOW_SUCCESS = "UNFOLLOW_SUCCESS";
export const UNFOLLOW_FAILURE = "UNFOLLOW_FAILURE";

export const ADD_POST_TO_ME = "ADD_POST_TO_ME";

export const LOAD_FOLLOWERS_REQUEST = "LOAD_FOLLOWERS_REQUEST";
export const LOAD_FOLLOWERS_SUCCESS = "LOAD_FOLLOWERS_SUCCESS";
export const LOAD_FOLLOWERS_FAILURE = "LOAD_FOLLOWERS_FAILURE";
export const LOAD_FOLLOWINGS_REQUEST = "LOAD_FOLLOWINGS_REQUEST";
export const LOAD_FOLLOWINGS_SUCCESS = "LOAD_FOLLOWINGS_SUCCESS";
export const LOAD_FOLLOWINGS_FAILURE = "LOAD_FOLLOWINGS_FAILURE";
export const REMOVE_FOLLOWER_REQUEST = "REMOVE_FOLLOWER_REQUEST";
export const REMOVE_FOLLOWER_SUCCESS = "REMOVE_FOLLOWER_SUCCESS";
export const REMOVE_FOLLOWER_FAILURE = "REMOVE_FOLLOWER_FAILURE";

export const EDIT_NICKNAME_REQUEST = "EDIT_NICKNAME_REQUEST";
export const EDIT_NICKNAME_SUCCESS = "EDIT_NICKNAME_SUCCESS";
export const EDIT_NICKNAME_FAILURE = "EDIT_NICKNAME_FAILURE";

export const initialState = {
  isLogging: false,
  isSigned: false,
  isSigningUp: false,
  me: null,
  userInfo: {
    // 남의 정보
    id: "",
    nickname: "",
    password: "",
  },
  error: "",
  followingList: [],
  followerList: [],
  isEditting: false,
  isEditted: false,
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

    case FOLLOW_REQUEST: {
      return {
        ...state,
      };
    }
    case FOLLOW_SUCCESS: {
      return {
        ...state,
        me: {
          ...state.me,
          Followings: [{ id: action.data }, ...state.me.Followings],
        },
      };
    }
    case FOLLOW_FAILURE:
      return {
        ...state,
      };
    case UNFOLLOW_REQUEST: {
      return {
        ...state,
      };
    }
    case UNFOLLOW_SUCCESS: {
      return {
        ...state,
        me: {
          ...state.me,
          Followings: state.me.Followings.filter((v) => v.id !== action.data),
        },
        followingList: state.followingList.filter((v) => v.id !== action.data),
      };
    }
    case UNFOLLOW_FAILURE:
      return {
        ...state,
      };
    case ADD_POST_TO_ME: {
      return {
        ...state,
        me: {
          ...state.me,
          Posts: [{ id: action.data }, ...state.me.Posts],
        },
      };
    }
    case LOAD_FOLLOWERS_REQUEST: {
      return {
        ...state,
      };
    }
    case LOAD_FOLLOWERS_SUCCESS: {
      return {
        ...state,
        followerList: action.data,
      };
    }
    case LOAD_FOLLOWERS_FAILURE: {
      return {
        ...state,
      };
    }
    case LOAD_FOLLOWINGS_REQUEST: {
      return {
        ...state,
      };
    }
    case LOAD_FOLLOWINGS_SUCCESS: {
      return {
        ...state,
        followingList: action.data,
      };
    }
    case LOAD_FOLLOWINGS_FAILURE: {
      return {
        ...state,
      };
    }
    case REMOVE_FOLLOWER_REQUEST: {
      return {
        ...state,
      };
    }
    case REMOVE_FOLLOWER_SUCCESS: {
      return {
        ...state,
        me: {
          ...state.me,
          Followers: state.me.Followers.filter((v) => v.id !== action.data),
        },
        followerList: state.followerList.filter((v) => v.id !== action.data),
      };
    }
    case REMOVE_FOLLOWER_FAILURE: {
      return {
        ...state,
      };
    }
    case EDIT_NICKNAME_REQUEST: {
      return {
        ...state,
        isEditting: true,
        isEditted: false,
      };
    }
    case EDIT_NICKNAME_SUCCESS: {
      return {
        ...state,
        isEditting: false,
        isEditted: true,
        me: {
          ...state.me,
          nickname: action.data,
        },
      };
    }
    case EDIT_NICKNAME_FAILURE: {
      return {
        isEditting: false,
        isEditted: false,
        ...state,
      };
    }

    default:
      return { ...state };
  }
};

export default reducer;
