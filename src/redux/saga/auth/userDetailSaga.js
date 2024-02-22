import { all, call, put, takeEvery } from "redux-saga/effects";
import { USER_DETAIL } from "../../action/types";
import { userDetailSuccess, userDetailFailure } from "../../action";
import API from "../../../utils/api";
import {
  notifySuccess,
  notifyWarning,
} from "../../../utils/helper";

function* userDetailRequest() {
  try {
    const { data } = yield API.get(
      "/api/v1/get-user-detail");
    if (data.meta.code === 200) {
      yield put(userDetailSuccess(data));
    } else if (data.meta.code === 401) {
      localStorage.clear();
      window.location.href = "/";
      notifyWarning(data.meta.message);
    }else if (data.meta.code !== 200) {
      yield put(userDetailFailure(data));
      notifyWarning(data.meta.message);
    }
  } catch (error) {
    yield put(userDetailFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchUserDetailAPI() {
  yield takeEvery(USER_DETAIL, userDetailRequest);
}

export default function* rootSaga() {
  yield all([watchUserDetailAPI()]);
}
