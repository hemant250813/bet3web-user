import { EDIT_BANK, EDIT_BANK_SUCCESS, EDIT_BANK_FAILURE } from "../types";

export const editBank = (payload) => ({
  type: EDIT_BANK,
  payload,
});

export const editBankSuccess = (payload) => ({
  type: EDIT_BANK_SUCCESS,
  payload,
});

export const editBankFailure = () => ({
  type: EDIT_BANK_FAILURE,
});
