import {
  GET_QUESTION_DISPLAY,
  GET_QUESTION_DISPLAY_SUCCESS,
  GET_QUESTION_DISPLAY_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  question: null,
};

const getQuestionDisplayReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_QUESTION_DISPLAY:
      return { ...state, loading: true };
    case GET_QUESTION_DISPLAY_SUCCESS:
      return {
        ...state,
        question: action.payload,
        loading: false,
      };
    case GET_QUESTION_DISPLAY_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default getQuestionDisplayReducer;
