import {
  GET_QUESTION_DROPDOWN, GET_QUESTION_DROPDOWN_SUCCESS, GET_QUESTION_DROPDOWN_FAILURE
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  questionDropdown: null,
};

const getQuestionDropDownReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_QUESTION_DROPDOWN:
      return { ...state, loading: true };
    case GET_QUESTION_DROPDOWN_SUCCESS:
      return {
        ...state,
        questionDropdown: action.payload,
        loading: false,
      };
    case GET_QUESTION_DROPDOWN_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default getQuestionDropDownReducer;
