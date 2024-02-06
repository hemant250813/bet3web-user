import { all, call, put, takeEvery } from "redux-saga/effects";
import { RESEND_OTP } from "../../action/types";
import { resendOtpSuccess, resendOtpFailure } from "../../action";
import API from "../../../utils/api";
import { notifySuccess, notifyWarning } from "../../../utils/helper";

function* resendOtpRequest(action) {
  try {
    const { data } = yield API.post(
      "/api/v1/resend-otp",
      action?.payload?.formPayload
    );
    if (data?.meta?.code === 200) {
      yield put(resendOtpSuccess(data));
      notifySuccess(data?.meta?.message);
    } else if (data?.code === 400) {
      yield put(resendOtpFailure(data));
      notifyWarning(data.message);
    }
  } catch (error) {
    yield put(resendOtpFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchResendOtpAPI() {
  yield takeEvery(RESEND_OTP, resendOtpRequest);
}

export default function* rootSaga() {
  yield all([watchResendOtpAPI()]);
}
