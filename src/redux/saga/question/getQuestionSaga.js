import { all, call, put, takeEvery } from "redux-saga/effects";
import { GET_QUESTION } from "../../action/types";
import { getQuestionSuccess, getQuestionFailure } from "../../action";
import API from "../../../utils/api";
import { notifyWarning } from "../../../utils/helper";

function* getQuestionRequest() {
  try {
    const { data } = yield API.get(`/api/v1/question`);
    if (data.meta.code === 200) {
      yield put(getQuestionSuccess(data?.data));
    } else if (data.meta.code !== 200) {
      yield put(getQuestionFailure(data));
      notifyWarning(data.meta.message);
    }
  } catch (error) {
    yield put(getQuestionFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchGetQuestionAPI() {
  yield takeEvery(GET_QUESTION, getQuestionRequest);
}

export default function* rootSaga() {
  yield all([watchGetQuestionAPI()]);
}
