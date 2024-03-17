import { GET_WITHDRAWAL, GET_WITHDRAWAL_SUCCESS, GET_WITHDRAWAL_FAILURE } from "../types";

export const getWithdrawal = (payload) => ({
  type: GET_WITHDRAWAL,
  payload,
});

export const getWithdrawalSuccess = (payload) => ({
  type: GET_WITHDRAWAL_SUCCESS,
  payload,
});

export const getWithdrawalFailure = () => ({
  type: GET_WITHDRAWAL_FAILURE,
});
