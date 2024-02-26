import { RESULT, RESULT_SUCCESS, RESULT_FAILURE } from "../types";

export const result = (payload) => ({
  type: RESULT,
  payload,
});

export const resultSuccess = (payload) => ({
  type: RESULT_SUCCESS,
  payload,
});

export const resultFailure = () => ({
  type: RESULT_FAILURE,
});
