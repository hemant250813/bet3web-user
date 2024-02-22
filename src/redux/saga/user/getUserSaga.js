import { all, call, put, takeEvery } from "redux-saga/effects";
import { GET_USER } from "../../action/types";
import { getUserSuccess, getUserFailure } from "../../action";
import API from "../../../utils/api";
import { notifySuccess, notifyWarning } from "../../../utils/helper";

function* getUserRequest() {
  try {
    const { data } = yield API.get("admin/user");
    if (data.meta.code === 200) {
      yield put(getUserSuccess(data));
    } else if (data.meta.code !== 200) {
      yield put(getUserFailure(data));
      notifyWarning(data.meta.message);
    }
  } catch (error) {
    yield put(getUserFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchGetUserAPI() {
  yield takeEvery(GET_USER, getUserRequest);
}

export default function* rootSaga() {
  yield all([watchGetUserAPI()]);
}
