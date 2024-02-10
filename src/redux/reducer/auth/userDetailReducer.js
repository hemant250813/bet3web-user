import {
  USER_DETAIL,
  USER_DETAIL_SUCCESS,
  USER_DETAIL_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  userDetails: null,
};

const userDetailReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case USER_DETAIL:
      return { ...state, loading: true };
    case USER_DETAIL_SUCCESS:
      return {
        ...state,
        userDetails: action.payload,
        loading: false,
      };
    case USER_DETAIL_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default userDetailReducer;
