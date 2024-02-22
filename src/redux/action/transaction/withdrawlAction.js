import { WITHDRAW, WITHDRAW_SUCCESS, WITHDRAW_FAILURE } from "../types";

export const withdraw = (payload) => ({
  type: WITHDRAW,
  payload,
});

export const withdrawSuccess = (payload) => ({
  type: WITHDRAW_SUCCESS,
  payload,
});

export const withdrawFailure = () => ({
  type: WITHDRAW_FAILURE,
});
