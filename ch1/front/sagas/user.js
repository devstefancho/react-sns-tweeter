import { delay, takeLatest, put, all, fork, call } from "redux-saga/effects";
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_FAILURE,
  FOLLOW_SUCCESS,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
  LOAD_FOLLOWERS_SUCCESS,
  LOAD_FOLLOWERS_FAILURE,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_SUCCESS,
  LOAD_FOLLOWINGS_FAILURE,
  LOAD_FOLLOWINGS_REQUEST,
  REMOVE_FOLLOWER_SUCCESS,
  REMOVE_FOLLOWER_FAILURE,
  REMOVE_FOLLOWER_REQUEST,
  EDIT_NICKNAME_SUCCESS,
  EDIT_NICKNAME_FAILURE,
  EDIT_NICKNAME_REQUEST,
} from "../reducers/user";
import axios from "axios";

// ACTION_API, ACTION_NAME, ACTION_WATCH are set

function loginAPI(logInAPI) {
  return axios.post("/user/login", logInAPI, {
    withCredentials: true,
  });
}
function* login(action) {
  try {
    const result = yield call(loginAPI, action.data);
    console.log(result, result.data);
    yield put({ type: LOG_IN_SUCCESS, data: result.data });
  } catch (e) {
    yield put({ type: LOG_IN_FAILURE, error: e });
  }
}
function* loginWatch() {
  yield takeLatest(LOG_IN_REQUEST, login);
}

function logoutAPI(logoutAPI) {
  return axios.post("/user/logout", logoutAPI, {
    withCredentials: true,
  });
}
function* logout() {
  try {
    yield call(logoutAPI);
    yield put({ type: LOG_OUT_SUCCESS });
  } catch (e) {
    yield put({ type: LOG_OUT_FAILURE, error: e });
  }
}
function* logoutWatch() {
  yield takeLatest(LOG_OUT_REQUEST, logout);
}

function signUpAPI(signupData) {
  return axios.post("/user/", signupData);
}

function* signUp(action) {
  try {
    yield call(signUpAPI, action.data);
    yield put({ type: SIGN_UP_SUCCESS });
  } catch (e) {
    yield put({ type: SIGN_UP_FAILURE, error: e });
    console.log(e);
  }
}

function* signUpWatch() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function loadUserAPI(userId) {
  return axios.get(userId ? `/user/${userId}/` : "/user/", {
    withCredentials: true,
  });
}

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data);
    yield put({ type: LOAD_USER_SUCCESS, data: result.data, me: !action.data });
  } catch (e) {
    yield put({ type: LOAD_USER_FAILURE, error: e });
    console.log(e);
  }
}

function* loadUserWatch() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

function followAPI(userId) {
  return axios.post(
    `/user/${userId}/follow`,
    {},
    {
      withCredentials: true,
    }
  );
}
function* follow(action) {
  try {
    const result = yield call(followAPI, action.data);
    yield put({ type: FOLLOW_SUCCESS, data: result.data });
  } catch (e) {
    yield put({ type: FOLLOW_FAILURE, error: e });
    console.log(e);
  }
}
function* followWatch() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}

function unfollowAPI(userId) {
  return axios.delete(`/user/${userId}/follow`, {
    withCredentials: true,
  });
}
function* unfollow(action) {
  try {
    const result = yield call(unfollowAPI, action.data);
    yield put({ type: UNFOLLOW_SUCCESS, data: result.data });
  } catch (e) {
    yield put({ type: UNFOLLOW_FAILURE, error: e });
    console.log(e);
  }
}
function* unfollowWatch() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}
/* profile card followerList, followingList, removeFollower */
function loadFollowersAPI(userId, offset = 0, limit = 3) {
  return axios.get(
    `/user/${userId || 0}/followers?limit=${limit}&offset=${offset}`,
    {
      withCredentials: true,
    }
  );
}
function* loadFollowers(action) {
  try {
    const result = yield call(loadFollowersAPI, action.data, action.offset);
    yield put({ type: LOAD_FOLLOWERS_SUCCESS, data: result.data });
  } catch (e) {
    yield put({ type: LOAD_FOLLOWERS_FAILURE, error: e });
    console.log(e);
  }
}
function* loadFollowersWatch() {
  yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}
function loadFollowingsAPI(userId, offset = 0, limit = 3) {
  return axios.get(
    `/user/${userId || 0}/followings?limit=${limit}&offset=${offset}`,
    {
      withCredentials: true,
    }
  );
}
function* loadFollowings(action) {
  try {
    const result = yield call(loadFollowingsAPI, action.data, action.offset);
    yield put({ type: LOAD_FOLLOWINGS_SUCCESS, data: result.data });
  } catch (e) {
    yield put({ type: LOAD_FOLLOWINGS_FAILURE, error: e });
    console.log(e);
  }
}
function* loadFollowingsWatch() {
  yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}
function removeFollowerAPI(userId) {
  return axios.delete(`/user/${userId}/follower`, {
    withCredentials: true,
  });
}
function* removeFollower(action) {
  try {
    const result = yield call(removeFollowerAPI, action.data);
    yield put({ type: REMOVE_FOLLOWER_SUCCESS, data: result.data });
  } catch (e) {
    yield put({ type: REMOVE_FOLLOWER_FAILURE, error: e });
    console.log(e);
  }
}
function* removeFollowerWatch() {
  yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

function editNicknameAPI(nickname) {
  return axios.patch(
    `/user/nickname`,
    { nickname },
    {
      withCredentials: true,
    }
  );
}
function* editNickname(action) {
  try {
    const result = yield call(editNicknameAPI, action.data);
    yield put({ type: EDIT_NICKNAME_SUCCESS, data: result.data });
  } catch (e) {
    yield put({ type: EDIT_NICKNAME_FAILURE, error: e });
    console.log(e);
  }
}
function* editNicknameWatch() {
  yield takeLatest(EDIT_NICKNAME_REQUEST, editNickname);
}

export default function* UserSaga() {
  yield all([
    fork(loginWatch),
    fork(signUpWatch),
    fork(logoutWatch),
    fork(loadUserWatch),
    fork(followWatch),
    fork(unfollowWatch),
    fork(loadFollowersWatch),
    fork(loadFollowingsWatch),
    fork(removeFollowerWatch),
    fork(editNicknameWatch),
  ]);
}
