import {
  QUESTION, QUESTION_SUCCESS, QUESTION_FAILURE 
} from "../../action/types";

const INIT_STATE = {
  loading: false,
};

const questionReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case QUESTION:
      return { ...state, loading: true };
    case QUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case QUESTION_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default questionReducer;
