import { all, call, put, takeEvery } from "redux-saga/effects";
import { OTP_VERIFY } from "../../action/types";
import { otpVerifySuccess, otpVerifyFailure } from "../../action";
import API from "../../../utils/api";
import { notifySuccess, notifyWarning, setLocalStorageItem } from "../../../utils/helper";

function* otpVerifyRequest(action) {
  try {
    const { data } = yield API.post(
      "/api/v1/otp-verify",
      action?.payload?.formPayload
    );
    if (data?.meta?.code === 200) {
      yield put(otpVerifySuccess(data));
      yield call(setLocalStorageItem, "login", JSON.stringify(data));
      yield call(
        setLocalStorageItem,
        "token",
        JSON.stringify(data?.meta?.token)
      );
      yield call(action.payload.callback, data);
      notifySuccess(data?.meta?.message);
    } else if (data?.code === 400) {
      yield put(otpVerifyFailure(data));
      notifyWarning(data.message);
    }
  } catch (error) {
    yield put(otpVerifyFailure());
    notifyWarning(error?.response?.data?.message);
  }
}

export function* watchOtpVerifyAPI() {
  yield takeEvery(OTP_VERIFY, otpVerifyRequest);
}

export default function* rootSaga() {
  yield all([watchOtpVerifyAPI()]);
}
