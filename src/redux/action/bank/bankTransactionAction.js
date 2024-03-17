import { BANK_TRANSACTION, BANK_TRANSACTION_SUCCESS, BANK_TRANSACTION_FAILURE } from "../types";

export const bankTransaction = (payload) => ({
  type: BANK_TRANSACTION,
  payload,
});

export const bankTransactionSuccess = (payload) => ({
  type: BANK_TRANSACTION_SUCCESS,
  payload,
});

export const bankTransactionFailure = () => ({
  type: BANK_TRANSACTION_FAILURE,
});
