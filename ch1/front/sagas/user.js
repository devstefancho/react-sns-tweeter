import { delay } from "redux-saga/effects";

export default function* helloSaga() {
  yield console.log("hello1");
  yield delay(1000);
  yield console.log("end1");
}
