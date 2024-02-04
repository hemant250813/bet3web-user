import { all, call, put, takeEvery } from "redux-saga/effects";
import { LOGOUT } from "../../action/types";
import { logoutSuccess, logoutFailure } from "../../action";
import API from "../../../utils/api";
import {
  notifySuccess,
  notifyWarning,
  clearLocalStorage,
} from "../../../utils/helper";

function* logoutRequest(action) {
  try {
    console.log("logoutRequest",action);
    const { data } = yield API.post("/api/v1/logout", action?.payload?.payload);

    if (data.meta.code === 200) {
      yield put(logoutSuccess(data));
      yield call(clearLocalStorage, "user");
      yield call(clearLocalStorage, "token");
      yield call(action.payload.callback, data);
      notifySuccess(data.meta.message);
    } else if (data.meta.code !== 200) {
      yield put(logoutFailure(data));
      notifyWarning(data.meta.message);
    }
  } catch (error) {
    yield put(logoutFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchlogoutAPI() {
  yield takeEvery(LOGOUT, logoutRequest);
}

export default function* rootSaga() {
  yield all([watchlogoutAPI()]);
}
