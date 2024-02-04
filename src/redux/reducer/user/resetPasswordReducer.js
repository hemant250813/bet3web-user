import {
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
};

const resetPasswordReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case RESET_PASSWORD:
      return { ...state, loading: true };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        login: action.payload,
        loading: false,
      };
    case RESET_PASSWORD_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default resetPasswordReducer;
