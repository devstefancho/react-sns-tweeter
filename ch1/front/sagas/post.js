import { delay, fork, all, takeLatest, put } from "redux-saga/effects";
import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
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
// add Comment
function* addPostWatch() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* addCommentAPI() {
  // return axios.post('/post')
}

function* addComment(action) {
  try {
    yield delay(2000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: { postId: action.data.postId },
    });
  } catch (e) {
    console.log(e);
    yield put({ type: ADD_COMMENT_FAILURE, commentErrorReason: e });
  }
}

function* addCommentWatch() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment); // dispatch할때 action값이 addComment로 넘어가는듯
}

export default function* postSaga() {
  yield all([fork(addPostWatch), fork(addCommentWatch)]);
}
