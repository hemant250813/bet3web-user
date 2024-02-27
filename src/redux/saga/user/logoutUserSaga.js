import { all, call, put, takeEvery } from "redux-saga/effects";
import { LOGOUT_USER } from "../../action/types";
import { logoutUserSuccess, logoutUserFailure } from "../../action";
import API from "../../../utils/api";
import {
  notifySuccess,
  notifyWarning,
  clearLocalStorage,
} from "../../../utils/helper";

function* logoutUserRequest(action) {
  try {
    const { data } = yield API.post("/api/v1/logout", action?.payload?.payload);
    console.log("logoutUserRequest",data);
    if (data?.meta?.code === 200) {
      yield put(logoutUserSuccess(data));
      yield call(clearLocalStorage, "user");
      yield call(clearLocalStorage, "token");
      yield call(action.payload.callback, data);
      notifySuccess(data.meta.message);
    } else if (data?.code === 400) {
      yield put(logoutUserFailure(data));
      yield call(action.payload.callback, data);
    } else if (data?.meta?.code !== 200) {
      yield put(logoutUserFailure(data));
    }
  } catch (error) {
    yield put(logoutUserFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchlogoutUserAPI() {
  yield takeEvery(LOGOUT_USER, logoutUserRequest);
}

export default function* rootSaga() {
  yield all([watchlogoutUserAPI()]);
}
