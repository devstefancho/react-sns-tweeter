import { delay } from "redux-saga/effects";

export default function* helloSaga1() {
  yield console.log("hellooooooooo");
  yield delay(3000);
  yield console.log("endddddddddd");
}
