import { QUESTION_RESULT, QUESTION_RESULT_SUCCESS, QUESTION_RESULT_FAILURE } from "../types";

export const questionResult = (payload) => ({
  type: QUESTION_RESULT,
  payload,
});

export const questionResultSuccess = (payload) => ({
  type: QUESTION_RESULT_SUCCESS,
  payload,
});

export const questionResultFailure = () => ({
  type: QUESTION_RESULT_FAILURE,
});
