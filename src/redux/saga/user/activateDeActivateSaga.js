import { all, call, put, takeEvery } from "redux-saga/effects";
import { USER_STATUS } from "../../action/types";
import { userStatusSuccess, userStatusFailure } from "../../action";
import API from "../../../utils/api";
import { notifySuccess, notifyWarning } from "../../../utils/helper";

function* activateDeActivateRequest(action) {
  try {
    const { data } = yield API.post(
      "admin/activate-deactivate-status",
      action?.payload?.formPayload
    );
    if (data?.meta?.code === 200) {
      yield put(userStatusSuccess(data));
      yield call(action.payload.callback, data);
      notifySuccess(data?.meta?.message);
    } else if (data?.code === 400) {
      yield put(userStatusFailure(data));
      yield call(action.payload.callback, data);
      notifyWarning(data.message);
    }
  } catch (error) {
    yield put(userStatusFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchActivateDeActivateAPI() {
  yield takeEvery(USER_STATUS, activateDeActivateRequest);
}

export default function* rootSaga() {
  yield all([watchActivateDeActivateAPI()]);
}
