import { GET_DEPOSIT, GET_DEPOSIT_SUCCESS, GET_DEPOSIT_FAILURE } from "../types";

export const getDeposit = (payload) => ({
  type: GET_DEPOSIT,
  payload,
});

export const getDepositSuccess = (payload) => ({
  type: GET_DEPOSIT_SUCCESS,
  payload,
});

export const getDepositFailure = () => ({
  type: GET_DEPOSIT_FAILURE,
});
