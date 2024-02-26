import { all, call, put, takeEvery } from "redux-saga/effects";
import { RESULT } from "../../action/types";
import { resultSuccess, resultFailure } from "../../action";
import API from "../../../utils/api";
import {
  notifySuccess,
  notifyWarning,
  setLocalStorageItem,
} from "../../../utils/helper";

function* resultRequest(action) {
  try {
    const { data } = yield API.post(
      "admin/result",
      action?.payload?.formPayload
    );

    if (data.meta.code === 200) {
      yield put(resultSuccess(data));
      yield call(action.payload.callback, data);
    } else if (data.meta.code === 401) {
      localStorage.clear();
      window.location.href = "/";
      notifyWarning(data.meta.message);
    } else if (data.meta.code !== 200) {
      yield put(resultFailure(data));
      yield call(action.payload.callback, data);
      notifyWarning(data.meta.message);
    }
  } catch (error) {
    yield put(resultFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchResultAPI() {
  yield takeEvery(RESULT, resultRequest);
}

export default function* rootSaga() {
  yield all([watchResultAPI()]);
}
