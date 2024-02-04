import {
  OTP_VERIFY, OTP_VERIFY_SUCCESS, OTP_VERIFY_FAILURE
} from "../../action/types";

const INIT_STATE = {
  loading: false,
};

const verifyOtpReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case OTP_VERIFY:
      return { ...state, loading: true };
    case OTP_VERIFY_SUCCESS:
      return {
        ...state,
        login: action.payload,
        loading: false,
      };
    case OTP_VERIFY_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default verifyOtpReducer;
