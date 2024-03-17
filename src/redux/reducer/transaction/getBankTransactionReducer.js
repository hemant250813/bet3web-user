import {
  GET_BANK_TRANSACTION,
  GET_BANK_TRANSACTION_SUCCESS,
  GET_BANK_TRANSACTION_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  bankTransaction: null,
};

const getBankTransactionReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_BANK_TRANSACTION:
      return { ...state, loading: true };
    case GET_BANK_TRANSACTION_SUCCESS:
      return {
        ...state,
        bankTransaction: action.payload,
        loading: false,
      };
    case GET_BANK_TRANSACTION_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default getBankTransactionReducer;
