import { LOGOUT_USER, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAILURE } from "../../action/types";

const INIT_STATE = {
  loading: false,
  login: null,
};

const logotUserReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGOUT_USER:
      return { ...state, loading: true };
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        login: action.payload,
        loading: false,
      };
    case LOGOUT_USER_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default logotUserReducer;
