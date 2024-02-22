import {
  AUTH_DETAIL,
  AUTH_DETAIL_SUCCESS,
  AUTH_DETAIL_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  authDetails: null,
};

const userDetailReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case AUTH_DETAIL:
      return { ...state, loading: true };
    case AUTH_DETAIL_SUCCESS:
      return {
        ...state,
        authDetails: action.payload,
        loading: false,
      };
    case AUTH_DETAIL_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default userDetailReducer;
