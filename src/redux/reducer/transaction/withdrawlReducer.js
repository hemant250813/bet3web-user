import {
  WITHDRAW,
  WITHDRAW_SUCCESS,
  WITHDRAW_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
};

const withdrawReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case WITHDRAW:
      return { ...state, loading: true };
    case WITHDRAW_SUCCESS:
      return {
        ...state,
        login: action.payload,
        loading: false,
      };
    case WITHDRAW_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default withdrawReducer;
