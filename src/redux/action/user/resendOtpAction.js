import { RESEND_OTP, RESEND_OTP_SUCCESS, RESEND_OTP_FAILURE } from "../types";

export const resendOtp = (payload) => ({
  type: RESEND_OTP,
  payload,
});

export const resendOtpSuccess = (payload) => ({
  type: RESEND_OTP_SUCCESS,
  payload,
});

export const resendOtpFailure = () => ({
  type: RESEND_OTP_FAILURE,
});
