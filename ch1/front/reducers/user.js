import produce from "immer";
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

export const REMOVE_POST_OF_ME = "REMOVE_POST_OF_ME";

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
  hasMoreFollowing: false,
  hasMoreFollower: false,
};

export const LOG_OUT = {
  type: LOG_OUT_REQUEST,
  data: {},
};

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      //LOG_IN, LOG_OUT
      case LOG_IN_REQUEST: {
        draft.isLogging = true;
        break;
      }
      case LOG_IN_SUCCESS: {
        draft.isLogging = false;
        draft.me = action.data; // signup.js에서 dispatch에 data를 넣어줌. (onSubmit의 else에 위치)
        break;
      }
      case LOG_IN_FAILURE: {
        draft.isLogging = false;
        draft.me = null;
        break;
      }

      case LOG_OUT_REQUEST: {
        draft.isLogging = false;
        draft.me = null;
        draft.followingList = [];
        draft.followerList = [];
      }
      // SIGN_UP
      case SIGN_UP_REQUEST: {
        draft.isSigned = false;
        draft.isSigningUp = true;
        break;
      }
      case SIGN_UP_SUCCESS: {
        draft.isSigned = true;
        draft.isSigningUp = false;
        break;
      }
      case SIGN_UP_FAILURE: {
        draft.isSigned = false;
        draft.isSigningUp = false;
        break;
      }

      case LOAD_USER_REQUEST: {
        break;
      }
      case LOAD_USER_SUCCESS:
        {
          if (action.me) {
            draft.me = action.data;
            break;
          }
        }
        {
          draft.userInfo = action.data;
          break;
        }
      case LOAD_USER_FAILURE: {
        break;
      }
      case FOLLOW_REQUEST: {
        break;
      }
      case FOLLOW_SUCCESS: {
        draft.me.Followings.unshift({ id: action.data });
        break;
      }
      case FOLLOW_FAILURE: {
        break;
      }
      case UNFOLLOW_REQUEST: {
        break;
      }
      case UNFOLLOW_SUCCESS: {
        const Index = draft.me.Followings.findIndex(
          (v) => v.id === action.data
        );
        draft.me.Followings.splice(Index, 1);
        draft.followingList.splice(Index, 1);
        break;
      }
      case UNFOLLOW_FAILURE: {
        break;
      }
      case ADD_POST_TO_ME: {
        draft.me.Posts.unshift({ id: action.data });
        break;
      }
      case LOAD_FOLLOWERS_REQUEST: {
        draft.followerList = action.offset ? draft.followerList : [];
        draft.hasMoreFollower = action.offset ? draft.hasMoreFollower : true;
        break;
      }
      case LOAD_FOLLOWERS_SUCCESS: {
        action.data.forEach((d) => {
          draft.followerList.push(d);
        });
        draft.hasMoreFollower = action.data.length === 3;
        break;
      }
      case LOAD_FOLLOWERS_FAILURE: {
        break;
      }
      case LOAD_FOLLOWINGS_REQUEST: {
        draft.followingList = action.offset ? draft.followingList : [];
        draft.hasMoreFollowing = action.offset ? draft.hasMoreFollowing : true;
        break;
      }
      case LOAD_FOLLOWINGS_SUCCESS: {
        action.data.forEach((d) => {
          draft.followingList.push(d);
        });
        draft.hasMoreFollowing = action.data.length === 3;
      }
      case LOAD_FOLLOWINGS_FAILURE: {
        break;
      }
      case REMOVE_FOLLOWER_REQUEST: {
        break;
      }
      case REMOVE_FOLLOWER_SUCCESS: {
        const Index = draft.me.Followers.findIndex((v) => v.id === action.data);
        draft.me.Followers.splice(Index, 1);
        draft.followerList.splice(Index, 1);
        break;
      }
      case REMOVE_FOLLOWER_FAILURE: {
        break;
      }
      case EDIT_NICKNAME_REQUEST: {
        draft.isEditting = true;
        draft.isEditted = false;
        break;
      }
      case EDIT_NICKNAME_SUCCESS: {
        draft.isEditting = false;
        draft.isEditted = true;
        draft.me.nickname = action.data;
        break;
      }
      case EDIT_NICKNAME_FAILURE: {
        draft.isEditting = false;
        draft.isEditted = false;
        break;
      }
      case REMOVE_POST_OF_ME: {
        const Index = draft.me.Posts.findIndex((v) => v.id === action.data);
        draft.me.Posts.splice(Index, 1);
        break;
      }

      default:
        break;
    }
  });
};

export default reducer;
