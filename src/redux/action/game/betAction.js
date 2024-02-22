import { BET, BET_SUCCESS, BET_FAILURE } from "../types";

export const bet = (payload) => ({
  type: BET,
  payload,
});

export const betSuccess = (payload) => ({
  type: BET_SUCCESS,
  payload,
});

export const betFailure = () => ({
  type: BET_FAILURE,
});
