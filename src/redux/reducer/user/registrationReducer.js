import {
  REGISTRATION,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
};

const registrationReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case REGISTRATION:
      return { ...state, loading: true };
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        login: action.payload,
        loading: false,
      };
    case REGISTRATION_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default registrationReducer;
