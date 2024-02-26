import {
  GET_RESULT,
  GET_RESULT_SUCCESS,
  GET_RESULT_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  result: null,
};

const getResultReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_RESULT:
      return { ...state, loading: true };
    case GET_RESULT_SUCCESS:
      return {
        ...state,
        result: action.payload,
        loading: false,
      };
    case GET_RESULT_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default getResultReducer;
