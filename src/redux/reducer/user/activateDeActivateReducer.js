import {
  USER_STATUS, USER_STATUS_SUCCESS, USER_STATUS_FAILURE
} from "../../action/types";

const INIT_STATE = {
  loading: false,
};

const userStatusReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case USER_STATUS:
      return { ...state, loading: true };
    case USER_STATUS_SUCCESS:
      return {
        ...state,
        login: action.payload,
        loading: false,
      };
    case USER_STATUS_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default userStatusReducer;
