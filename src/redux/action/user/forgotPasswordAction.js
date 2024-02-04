import {
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
} from "../types";

export const forgotPassword = (payload) => ({
  type: FORGOT_PASSWORD,
  payload,
});

export const forgotPasswordSuccess = (payload) => ({
  type: FORGOT_PASSWORD_SUCCESS,
  payload,
});

export const forgotPasswordFailure = () => ({
  type: FORGOT_PASSWORD_FAILURE,
});
