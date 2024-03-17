import { GET_BANK_TRANSACTION, GET_BANK_TRANSACTION_SUCCESS, GET_BANK_TRANSACTION_FAILURE } from "../types";

export const getBankTransaction = (payload) => ({
  type: GET_BANK_TRANSACTION,
  payload,
});

export const getBankTransactionSuccess = (payload) => ({
  type: GET_BANK_TRANSACTION_SUCCESS,
  payload,
});

export const getBankTransactionFailure = () => ({
  type: GET_BANK_TRANSACTION_FAILURE,
});
