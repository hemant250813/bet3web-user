import {
  RESEND_OTP,
  RESEND_OTP_SUCCESS,
  RESEND_OTP_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
};

const verifyOtpReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case RESEND_OTP:
      return { ...state, loading: true };
    case RESEND_OTP_SUCCESS:
      return {
        ...state,
        login: action.payload,
        loading: false,
      };
    case RESEND_OTP_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default verifyOtpReducer;
