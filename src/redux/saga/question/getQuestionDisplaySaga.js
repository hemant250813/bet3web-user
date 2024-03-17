import { all, call, put, takeEvery } from "redux-saga/effects";
import { GET_QUESTION_DISPLAY } from "../../action/types";
import {
  getQuestionDisplaySuccess,
  getQuestionDisplayFailure,
} from "../../action";
import API from "../../../utils/api";
import { notifyWarning } from "../../../utils/helper";

function* getQuestionDisplayRequest() {
  console.log("pppor");
  try {
    const { data } = yield API.get(`/admin/question`);
    if (data.meta.code === 200) {
      yield put(getQuestionDisplaySuccess(data?.data));
    } else if (data.meta.code !== 200) {
      yield put(getQuestionDisplayFailure(data));
      notifyWarning(data.meta.message);
    }
  } catch (error) {
    yield put(getQuestionDisplayFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchGetQuestionDisplayAPI() {
  yield takeEvery(GET_QUESTION_DISPLAY, getQuestionDisplayRequest);
}

export default function* rootSaga() {
  yield all([watchGetQuestionDisplayAPI()]);
}
