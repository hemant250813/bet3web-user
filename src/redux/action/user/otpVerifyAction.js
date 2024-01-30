import { OTP_VERIFY, OTP_VERIFY_SUCCESS, OTP_VERIFY_FAILURE } from "../types";

export const otpVerify = (payload) => ({
  type: OTP_VERIFY,
  payload,
});

export const otpVerifySuccess = (payload) => ({
  type: OTP_VERIFY_SUCCESS,
  payload,
});

export const otpVerifyFailure = () => ({
  type: OTP_VERIFY_FAILURE,
});
