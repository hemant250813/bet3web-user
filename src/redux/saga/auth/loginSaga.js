import { all, call, put, takeEvery } from "redux-saga/effects";
import { LOGIN } from "../../action/types";
import { loginSuccess, loginFailure } from "../../action";
import API from "../../../utils/api";
import {
  notifySuccess,
  notifyWarning,
  setLocalStorageItem,
} from "../../../utils/helper";

function* loginRequest(action) {
  try {
    const { data } = yield API.post(
      "admin/login",
      action?.payload?.payload
    );

    if (data.meta.code === 200) {
      yield put(loginSuccess(data));
      yield call(setLocalStorageItem, "user", JSON.stringify(data?.data));
      yield call(
        setLocalStorageItem,
        "token",
        JSON.stringify(data?.meta?.token)
      );
      yield call(action.payload.callback, data);
      notifySuccess(data.meta.message);
    } else if (data.meta.code !== 200) {
      yield put(loginFailure(data));
      notifyWarning(data.meta.message);
      yield call(action.payload.callback, data);
    }
  } catch (error) {
    yield put(loginFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchloginAPI() {
  yield takeEvery(LOGIN, loginRequest);
}

export default function* rootSaga() {
  yield all([watchloginAPI()]);
}
