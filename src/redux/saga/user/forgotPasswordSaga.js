import { all, call, put, takeEvery } from "redux-saga/effects";
import { FORGOT_PASSWORD } from "../../action/types";
import { forgotPasswordSuccess, forgotPasswordFailure } from "../../action";
import API from "../../../utils/api";
import { notifySuccess, notifyWarning } from "../../../utils/helper";

function* forgotPasswordRequest(action) {
  try {
    const { data } = yield API.post(
      "/api/v1/forgot_password",
      action?.payload?.payload      
    );
    console.log("forgotPasswordRequest",data);
    if (data?.meta?.code === 200) {
      yield put(forgotPasswordSuccess(data));
      yield call(action.payload.callback, data);
      notifySuccess(data?.meta?.message);
    } else if (data?.code === 400) {
      yield put(forgotPasswordFailure(data));
      notifyWarning(data.message);
    }
  } catch (error) {
    yield put(forgotPasswordFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchForgotPasswordAPI() {
  yield takeEvery(FORGOT_PASSWORD, forgotPasswordRequest);
}

export default function* rootSaga() {
  yield all([watchForgotPasswordAPI()]);
}
