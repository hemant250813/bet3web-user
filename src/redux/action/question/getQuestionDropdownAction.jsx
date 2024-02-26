import { GET_QUESTION_DROPDOWN, GET_QUESTION_DROPDOWN_SUCCESS, GET_QUESTION_DROPDOWN_FAILURE } from "../types";

export const getQuestionDropdown = (payload) => ({
  type: GET_QUESTION_DROPDOWN,
  payload,
});

export const getQuestionDropdownSuccess = (payload) => ({
  type: GET_QUESTION_DROPDOWN_SUCCESS,
  payload,
});

export const getQuestionDropdownFailure = () => ({
  type: GET_QUESTION_DROPDOWN_FAILURE,
});
