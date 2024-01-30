//import all Saga functions you are creating here...
//Add it inside the array like function eg:mySaga()
import { all } from "redux-saga/effects";

import Registration from "../saga/user/registrationSaga";
import OtpVerify from "../saga/user/otpVerifySaga";
import Login from "../saga/auth/loginSaga";

export default function* rootSaga() {
  yield all([Registration(), OtpVerify(), Login()]);
}
