import {
  DEPOSIT,
  DEPOSIT_SUCCESS,
  DEPOSIT_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
};

const depositReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case DEPOSIT:
      return { ...state, loading: true };
    case DEPOSIT_SUCCESS:
      return {
        ...state,
        login: action.payload,
        loading: false,
      };
    case DEPOSIT_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default depositReducer;
