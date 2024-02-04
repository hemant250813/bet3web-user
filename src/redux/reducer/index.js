import { combineReducers } from "redux";
//import all reducers creating here, and add inside the combine reducers

import Registration from "./user/registrationReducer";
import OtpVerify from "./user/otpVerifyReducer";
import Login from "./auth/loginReducer";
import Logout from "./auth/logoutReducer";
import ResendOtp from "./user/resendOtpReducer";
import ForgotPassword from "./user/forgotPasswordReducer";
import ResetPassword from "./user/resetPasswordReducer";

const appReducer = combineReducers({
  Registration,
  OtpVerify,
  Login,
  Logout,
  ResendOtp,
  ForgotPassword,
  ResetPassword
});
const reducers = (state, action) => {
  return appReducer(state, action);
};
export default reducers;
