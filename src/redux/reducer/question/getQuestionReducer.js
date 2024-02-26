import {
  GET_QUESTION, GET_QUESTION_SUCCESS, GET_QUESTION_FAILURE
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  question: null,
};

const getQuestionReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_QUESTION:
      return { ...state, loading: true };
    case GET_QUESTION_SUCCESS:
      return {
        ...state,
        question: action.payload,
        loading: false,
      };
    case GET_QUESTION_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default getQuestionReducer;
