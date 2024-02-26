import { QUESTION, QUESTION_SUCCESS, QUESTION_FAILURE } from "../types";

export const question = (payload) => ({
  type: QUESTION,
  payload,
});

export const questionSuccess = (payload) => ({
  type: QUESTION_SUCCESS,
  payload,
});

export const questionFailure = () => ({
  type: QUESTION_FAILURE,
});
