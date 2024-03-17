import {
  ADD_BANK,
  ADD_BANK_SUCCESS,
  ADD_BANK_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
};

const addBankReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_BANK:
      return { ...state, loading: true };
    case ADD_BANK_SUCCESS:
      return {
        ...state,
        login: action.payload,
        loading: false,
      };
    case ADD_BANK_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default addBankReducer;
