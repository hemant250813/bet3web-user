import {
  BET, BET_SUCCESS, BET_FAILURE
} from "../../action/types";

const INIT_STATE = {
  loading: false,
};

const betReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case BET:
      return { ...state, loading: true };
    case BET_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case BET_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default betReducer;
