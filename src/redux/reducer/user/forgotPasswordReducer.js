import {
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
};

const forgotPasswordReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD:
      return { ...state, loading: true };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        login: action.payload,
        loading: false,
      };
    case FORGOT_PASSWORD_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default forgotPasswordReducer;
