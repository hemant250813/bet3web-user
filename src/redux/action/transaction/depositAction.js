import { DEPOSIT, DEPOSIT_SUCCESS, DEPOSIT_FAILURE } from "../types";

export const deposit = (payload) => ({
  type: DEPOSIT,
  payload,
});

export const depositSuccess = (payload) => ({
  type: DEPOSIT_SUCCESS,
  payload,
});

export const depositFailure = () => ({
  type: DEPOSIT_FAILURE,
});
