import { all, call, put, takeEvery } from "redux-saga/effects";
import { GET_QUESTION_DROPDOWN } from "../../action/types";
import { getQuestionDropdownSuccess, getQuestionDropdownFailure } from "../../action";
import API from "../../../utils/api";
import { notifyWarning } from "../../../utils/helper";

function* getQuestionDropdownRequest() {
  try {
    const { data } = yield API.get(`admin/question`);
    if (data.meta.code === 200) {
      yield put(getQuestionDropdownSuccess(data?.data));
    } else if (data.meta.code !== 200) {
      yield put(getQuestionDropdownFailure(data));
      notifyWarning(data.meta.message);
    }
  } catch (error) {
    yield put(getQuestionDropdownFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchGetQuestionDropdownAPI() {
  yield takeEvery(GET_QUESTION_DROPDOWN, getQuestionDropdownRequest);
}

export default function* rootSaga() {
  yield all([watchGetQuestionDropdownAPI()]);
}
