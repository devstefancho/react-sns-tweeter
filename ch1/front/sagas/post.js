import { delay, fork, all, takeLatest, put, call } from "redux-saga/effects";
import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  LOAD_COMMENTS_REQUEST,
  LOAD_COMMENTS_SUCCESS,
  LOAD_COMMENTS_FAILURE,
  LOAD_MAIN_POSTS_FAILURE,
  LOAD_MAIN_POSTS_SUCCESS,
  LOAD_MAIN_POSTS_REQUEST,
  LOAD_HASHTAG_POSTS_REQUEST,
  LOAD_HASHTAG_POSTS_SUCCESS,
  LOAD_HASHTAG_POSTS_FAILURE,
  LOAD_USER_POSTS_REQUEST,
  LOAD_USER_POSTS_SUCCESS,
  LOAD_USER_POSTS_FAILURE,
} from "../reducers/post";
import axios from "axios";

// ACTION_API, ACTION_NAME, ACTION_WATCH are set
function addPostAPI(newPost) {
  return axios.post("/post", newPost, { withCredentials: true });
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    // console.log(`**** this is : ${result}`);
    yield put({ type: ADD_POST_SUCCESS, data: result.data });
  } catch (e) {
    console.log(e);
    yield put({ type: ADD_POST_FAILURE, postErrorReason: e });
  }
}
// add Comment
function* addPostWatch() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function addCommentAPI(data) {
  return axios.post(
    `/post/${data.postId}/comment`,
    { content: data.content },
    { withCredentials: true }
  );
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: { comment: result.data, postId: action.data.postId },
    });
  } catch (e) {
    console.log(e);
    yield put({ type: ADD_COMMENT_FAILURE, commentErrorReason: e });
  }
}

function* addCommentWatch() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment); // dispatch할때 action값이 addComment로 넘어가는듯
}

function loadCommentsAPI(postId) {
  return axios.get(`/post/${postId}/comments`);
}
function* loadComments(action) {
  try {
    const result = yield call(loadCommentsAPI, action.data); // postId값을 axios에 넘기기
    // console.log(`result : `, result); // response로 json이 넘어올때 result안에 data로 넘어오는 것을 확인할 수 있음.
    yield put({
      type: LOAD_COMMENTS_SUCCESS,
      data: {
        comments: result.data,
        postId: action.data,
      },
    });
  } catch (e) {
    console.log(e);
    yield put({ type: LOAD_COMMENTS_FAILURE });
  }
}
function* loadCommentsWatch() {
  yield takeLatest(LOAD_COMMENTS_REQUEST, loadComments);
}
function loadPostsAPI() {
  return axios.get("/posts");
}
function* loadPosts() {
  try {
    const result = yield call(loadPostsAPI);
    // console.log(`result : `, result); // response로 json이 넘어올때 result안에 data로 넘어오는 것을 확인할 수 있음.
    yield put({
      type: LOAD_MAIN_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.log(e);
    yield put({ type: LOAD_MAIN_POSTS_FAILURE });
  }
}
function* loadPostsWatch() {
  yield takeLatest(LOAD_MAIN_POSTS_REQUEST, loadPosts);
}

function loadHashtagPostsAPI(tag) {
  return axios.get(`/hashtag/${tag}`);
}
function* loadHashtagPosts(action) {
  try {
    const result = yield call(loadHashtagPostsAPI, action.data);
    // console.log(`result : `, result); // response로 json이 넘어올때 result안에 data로 넘어오는 것을 확인할 수 있음.
    yield put({
      type: LOAD_HASHTAG_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.log(e);
    yield put({ type: LOAD_HASHTAG_POSTS_FAILURE });
  }
}
function* loadHashtagPostsWatch() {
  yield takeLatest(LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
}

function loadUserPostsAPI(id) {
  return axios.get(`/user/${id}/posts`);
}
function* loadUserPosts(action) {
  try {
    const result = yield call(loadUserPostsAPI, action.data);
    // console.log(`result : `, result); // response로 json이 넘어올때 result안에 data로 넘어오는 것을 확인할 수 있음.
    yield put({
      type: LOAD_USER_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.log(e);
    yield put({ type: LOAD_USER_POSTS_FAILURE });
  }
}
function* loadUserPostsWatch() {
  yield takeLatest(LOAD_USER_POSTS_REQUEST, loadUserPosts);
}

export default function* postSaga() {
  yield all([
    fork(addPostWatch),
    fork(addCommentWatch),
    fork(loadCommentsWatch),
    fork(loadPostsWatch),
    fork(loadHashtagPostsWatch),
    fork(loadUserPostsWatch),
  ]);
}
