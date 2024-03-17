import {
  EDIT_BANK,
  EDIT_BANK_SUCCESS,
  EDIT_BANK_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
};

const editBankReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case EDIT_BANK:
      return { ...state, loading: true };
    case EDIT_BANK_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case EDIT_BANK_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default editBankReducer;
