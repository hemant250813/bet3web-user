import { combineReducers } from "redux";
//import all reducers creating here, and add inside the combine reducers

import Registration from "./user/registrationReducer";
import OtpVerify from "./user/otpVerifyReducer";
import Login from "./auth/loginReducer";

const appReducer = combineReducers({
  Registration,
  OtpVerify,
  Login
});
const reducers = (state, action) => {
  return appReducer(state, action);
};
export default reducers;
