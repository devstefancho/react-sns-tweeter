import { delay, fork, all, takeLatest, put } from "redux-saga/effects";
import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
} from "../reducers/post";

// ACTION_API, ACTION_NAME, ACTION_WATCH are set
function* addPostAPI() {
  // return axios.post('/post')
}

function* addPost() {
  try {
    yield delay(2000);
    yield put({ type: ADD_POST_SUCCESS });
  } catch (e) {
    console.log(e);
    yield put({ type: ADD_POST_FAILURE, postErrorReason: e });
  }
}

function* addPostWatch() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}
export default function* postSaga() {
  yield all([fork(addPostWatch)]);
}
