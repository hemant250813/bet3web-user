import {
  BANK_TRANSACTION, BANK_TRANSACTION_SUCCESS, BANK_TRANSACTION_FAILURE 
} from "../../action/types";

const INIT_STATE = {
  loading: false,
};

const bankTransactionReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case BANK_TRANSACTION:
      return { ...state, loading: true };
    case BANK_TRANSACTION_SUCCESS:
      return {
        ...state,
        login: action.payload,
        loading: false,
      };
    case BANK_TRANSACTION_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default bankTransactionReducer;
