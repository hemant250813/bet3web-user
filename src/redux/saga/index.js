//import all Saga functions you are creating here...
//Add it inside the array like function eg:mySaga()
import { all } from "redux-saga/effects";

import Registration from "../saga/user/registrationSaga";
import OtpVerify from "../saga/user/otpVerifySaga";
import Login from "../saga/auth/loginSaga";
import Logout from "../saga/auth/logoutSaga";
import ResendOtp from "../saga/user/resendOtpSaga";
import ForgotPassword from "../saga/user/forgotPasswordSaga";
import ResetPassword from "../saga/user/resetPasswordSaga";

export default function* rootSaga() {
  yield all([
    Registration(),
    OtpVerify(),
    Login(),
    Logout(),
    ResendOtp(),
    ForgotPassword(),
    ResetPassword()
  ]);
}
