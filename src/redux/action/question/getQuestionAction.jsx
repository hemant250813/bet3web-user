import { GET_QUESTION, GET_QUESTION_SUCCESS, GET_QUESTION_FAILURE } from "../types";

export const getQuestion = (payload) => ({
  type: GET_QUESTION,
  payload,
});

export const getQuestionSuccess = (payload) => ({
  type: GET_QUESTION_SUCCESS,
  payload,
});

export const getQuestionFailure = () => ({
  type: GET_QUESTION_FAILURE,
});
