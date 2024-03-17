import {
  GET_WITHDRAWAL,
  GET_WITHDRAWAL_SUCCESS,
  GET_WITHDRAWAL_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  withdrawal: null,
};

const withdrawalReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_WITHDRAWAL:
      return { ...state, loading: true };
    case GET_WITHDRAWAL_SUCCESS:
      return {
        ...state,
        withdrawal: action.payload,
        loading: false,
      };
    case GET_WITHDRAWAL_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default withdrawalReducer;
