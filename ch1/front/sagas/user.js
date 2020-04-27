import { delay, takeLatest, put, all, fork } from "redux-saga/effects";
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from "../reducers/user";
import axios from "axios";

// ACTION_API, ACTION_NAME, ACTION_WATCH are set
function* loginWatch() {
  yield takeLatest(LOG_IN_REQUEST, login);
}

function* loginAPI() {
  return axios.post("/login");
}

function* login() {
  try {
    yield delay(2000);
    yield put({ type: LOG_IN_SUCCESS });
  } catch (e) {
    yield put({ type: LOG_IN_FAILURE });
  }
}

function* signUpWatch() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* signUpAPI() {
  return axios.push("/");
}
function* signUp() {
  try {
    yield delay(2000);
    yield put({ type: SIGN_UP_SUCCESS });
  } catch (e) {
    yield put({ type: SIGN_UP_FAILURE, error: e });
    console.log(e);
  }
}

export default function* UserSaga() {
  yield all([fork(loginWatch), fork(signUpWatch)]);
}
