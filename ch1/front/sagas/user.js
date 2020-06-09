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

export default function* UserSaga() {
  yield all([
    fork(loginWatch),
    fork(signUpWatch),
    fork(logoutWatch),
    fork(loadUserWatch),
    fork(followWatch),
    fork(unfollowWatch),
  ]);
}
