import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  login: null,
};

const loginReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
      return {
        ...state,
        login: action.payload,
        loading: false,
      };
    case LOGIN_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default loginReducer;
