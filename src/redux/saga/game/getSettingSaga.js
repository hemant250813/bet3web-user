import { all, call, put, takeEvery } from "redux-saga/effects";
import { GET_SETTING } from "../../action/types";
import { getSettingSuccess, getSettingFailure } from "../../action";
import API from "../../../utils/api";
import { notifySuccess, notifyWarning } from "../../../utils/helper";

function* getSettingRequest(action) {
  try {
    const { game } = action?.payload;
    const { data } = yield API.get(`/api/v1/get-setting?game=${game}`);
    if (data.meta.code === 200) {
      yield put(getSettingSuccess(data?.data));
    } else if (data.meta.code !== 200) {
      yield put(getSettingFailure(data));
      notifyWarning(data.meta.message);
    }
  } catch (error) {
    yield put(getSettingFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchGetSettingAPI() {
  yield takeEvery(GET_SETTING, getSettingRequest);
}

export default function* rootSaga() {
  yield all([watchGetSettingAPI()]);
}
