import { GET_QUESTION_DISPLAY, GET_QUESTION_DISPLAY_SUCCESS, GET_QUESTION_DISPLAY_FAILURE } from "../types";

export const getQuestionDisplay = (payload) => ({
  type: GET_QUESTION_DISPLAY,
  payload,
});

export const getQuestionDisplaySuccess = (payload) => ({
  type: GET_QUESTION_DISPLAY_SUCCESS,
  payload,
});

export const getQuestionDisplayFailure = () => ({
  type: GET_QUESTION_DISPLAY_FAILURE,
});
