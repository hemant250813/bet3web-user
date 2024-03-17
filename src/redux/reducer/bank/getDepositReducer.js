import {
  GET_DEPOSIT, GET_DEPOSIT_SUCCESS, GET_DEPOSIT_FAILURE
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  deposit: null,
};

const depositReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_DEPOSIT:
      return { ...state, loading: true };
    case GET_DEPOSIT_SUCCESS:
      return {
        ...state,
        deposit: action.payload,
        loading: false,
      };
    case GET_DEPOSIT_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default depositReducer;
