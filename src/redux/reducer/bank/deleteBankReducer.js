import {
  DELETE_BANK,
  DELETE_BANK_SUCCESS,
  DELETE_BANK_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
};

const deleteBankReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case DELETE_BANK:
      return { ...state, loading: true };
    case DELETE_BANK_SUCCESS:
      return {
        ...state,
        login: action.payload,
        loading: false,
      };
    case DELETE_BANK_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default deleteBankReducer;
