import {
  QUESTION_RESULT, QUESTION_RESULT_SUCCESS, QUESTION_RESULT_FAILURE 
} from "../../action/types";

const INIT_STATE = {
  loading: false,
};

const questionResultReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case QUESTION_RESULT:
      return { ...state, loading: true };
    case QUESTION_RESULT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case QUESTION_RESULT_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default questionResultReducer;
