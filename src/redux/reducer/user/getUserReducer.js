import {
  GET_USER, GET_USER_SUCCESS, GET_USER_FAILURE
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  user: null,
};

const getUserReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, loading: true };
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case GET_USER_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default getUserReducer;
