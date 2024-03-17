import { DELETE_BANK, DELETE_BANK_SUCCESS, DELETE_BANK_FAILURE } from "../types";

export const deleteBank = (payload) => ({
  type: DELETE_BANK,
  payload,
});

export const deleteBankSuccess = (payload) => ({
  type: DELETE_BANK_SUCCESS,
  payload,
});

export const deleteBankFailure = () => ({
  type: DELETE_BANK_FAILURE,
});
