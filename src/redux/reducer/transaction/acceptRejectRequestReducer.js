import {
  ACCEPT_REJECT_REQUEST,
  ACCEPT_REJECT_REQUEST_SUCCESS,
  ACCEPT_REJECT_REQUEST_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
};

const acceptRejectRequestReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACCEPT_REJECT_REQUEST:
      return { ...state, loading: true };
    case ACCEPT_REJECT_REQUEST_SUCCESS:
      return {
        ...state,
        login: action.payload,
        loading: false,
      };
    case ACCEPT_REJECT_REQUEST_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default acceptRejectRequestReducer;
