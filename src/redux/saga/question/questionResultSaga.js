import { all, call, put, takeEvery } from "redux-saga/effects";
import { QUESTION_RESULT } from "../../action/types";
import { questionResultSuccess, questionResultFailure } from "../../action";
import API from "../../../utils/api";
import {
  notifySuccess,
  notifyWarning,
  setLocalStorageItem,
} from "../../../utils/helper";

function* questionResultRequest(action) {
  try {
    const { data } = yield API.post(
      "/api/v1/question-result",
      action?.payload
    );

    if (data.meta.code === 200) {
      yield put(questionResultSuccess(data));
      yield call(action.payload.callback, data);
    } else if (data.meta.code === 401) {
      localStorage.clear();
      window.location.href = "/";
      notifyWarning(data.meta.message);
    } else if (data.meta.code !== 200) {
      yield put(questionResultFailure(data));
      yield call(action.payload.callback, data);
      notifyWarning(data.meta.message);
    }
  } catch (error) {
    yield put(questionResultFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchQuestionResultAPI() {
  yield takeEvery(QUESTION_RESULT, questionResultRequest);
}

export default function* rootSaga() {
  yield all([watchQuestionResultAPI()]);
}
