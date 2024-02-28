import { all, call, put, takeEvery } from "redux-saga/effects";
import { UPDATE_PROFILE } from "../../action/types";
import { updateProfileSuccess, updateProfileFailure } from "../../action";
import API from "../../../utils/api";
import { notifySuccess, notifyWarning } from "../../../utils/helper";

function* updateProfileRequest(action) {
  try {
    const { data } = yield API.post(
      "/api/v1/edit-profile",
      action?.payload?.payload
    );
    if (data?.meta?.code === 200) {
      yield put(updateProfileSuccess(data));
      yield call(action.payload.callback, data);
      notifySuccess(data?.meta?.message);
    } else if (data?.code === 400) {
      yield put(updateProfileFailure(data));
      yield call(action.payload.callback, data);
      notifyWarning(data.message);
    }
  } catch (error) {
    yield put(updateProfileFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchUpdateProfileAPI() {
  yield takeEvery(UPDATE_PROFILE, updateProfileRequest);
}

export default function* rootSaga() {
  yield all([watchUpdateProfileAPI()]);
}
