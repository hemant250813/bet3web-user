import {
  GET_BANK, GET_BANK_SUCCESS, GET_BANK_FAILURE
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  bank: null,
};

const getBankReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_BANK:
      return { ...state, loading: true };
    case GET_BANK_SUCCESS:
      return {
        ...state,
        bank: action.payload,
        loading: false,
      };
    case GET_BANK_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default getBankReducer;
