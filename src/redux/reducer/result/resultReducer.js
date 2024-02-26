import {
  RESULT, RESULT_SUCCESS, RESULT_FAILURE 
} from "../../action/types";

const INIT_STATE = {
  loading: false,
};

const resultReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case RESULT:
      return { ...state, loading: true };
    case RESULT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case RESULT_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default resultReducer;
