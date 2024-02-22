import { all, call, put, takeEvery } from "redux-saga/effects";
import { AUTH_DETAIL } from "../../action/types";
import { authDetailSuccess, authDetailFailure } from "../../action";
import API from "../../../utils/api";
import { notifySuccess, notifyWarning } from "../../../utils/helper";

function* authDetailRequest() {
  try {
    const { data } = yield API.get("admin/auth-detail");
    if (data.meta.code === 200) {
      yield put(authDetailSuccess(data?.data));
    } else if (data.meta.code !== 200) {
      yield put(authDetailFailure(data));
      notifyWarning(data.meta.message);
    }
  } catch (error) {
    yield put(authDetailFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchAuthDetailAPI() {
  yield takeEvery(AUTH_DETAIL, authDetailRequest);
}

export default function* rootSaga() {
  yield all([watchAuthDetailAPI()]);
}
