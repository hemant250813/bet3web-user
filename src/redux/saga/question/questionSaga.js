import { all, call, put, takeEvery } from "redux-saga/effects";
import { QUESTION } from "../../action/types";
import { questionSuccess, questionFailure } from "../../action";
import API from "../../../utils/api";
import {
  notifySuccess,
  notifyWarning,
  setLocalStorageItem,
} from "../../../utils/helper";

function* questionRequest(action) {
  try {
    const { data } = yield API.post(
      "admin/question",
      action?.payload?.groupData

    );
console.log("questionRequest",data);
    if (data.meta.code === 200) {
      yield put(questionSuccess(data));
      yield call(action.payload.callback, data);
    } else if (data.meta.code === 401) {
      localStorage.clear();
      window.location.href = "/";
      notifyWarning(data.meta.message);
    } else if (data.meta.code !== 200) {
      yield put(questionFailure(data));
      yield call(action.payload.callback, data);
      notifyWarning(data.meta.message);
    }
  } catch (error) {
    yield put(questionFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchQuestionAPI() {
  yield takeEvery(QUESTION, questionRequest);
}

export default function* rootSaga() {
  yield all([watchQuestionAPI()]);
}
