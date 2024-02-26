import { all, call, put, takeEvery } from "redux-saga/effects";
import { SETTING } from "../../action/types";
import { settingSuccess, settingFailure } from "../../action";
import API from "../../../utils/api";
import {
  notifySuccess,
  notifyWarning,
  setLocalStorageItem,
} from "../../../utils/helper";

function* settingRequest(action) {
  try {
    const { data } = yield API.post(
      "admin/game-setting",
      action?.payload?.payload
    );

    if (data.meta.code === 200) {
      yield put(settingSuccess(data));
      yield call(action.payload.callback, data);
    } else if (data.meta.code === 401) {
      localStorage.clear();
      window.location.href = "/";
      notifyWarning(data.meta.message);
    } else if (data.meta.code !== 200) {
      yield put(settingFailure(data));
      yield call(action.payload.callback, data);
      notifyWarning(data.meta.message);
    }
  } catch (error) {
    yield put(settingFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchSettingAPI() {
  yield takeEvery(SETTING, settingRequest);
}

export default function* rootSaga() {
  yield all([watchSettingAPI()]);
}
