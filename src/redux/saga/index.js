import { all } from "redux-saga/effects";
import Registration from "../saga/user/registrationSaga";
import OtpVerify from "../saga/user/otpVerifySaga";
import Login from "../saga/auth/loginSaga";
import Logout from "../saga/auth/logoutSaga";
import ResendOtp from "../saga/user/resendOtpSaga";
import ForgotPassword from "../saga/user/forgotPasswordSaga";
import ResetPassword from "../saga/user/resetPasswordSaga";
import UserDetail from "../saga/auth/userDetailSaga";
import Bet from "../saga/game/betSaga";
import AuthDetail from "../saga/auth/authDetailSaga";
import UserStatus from "./user/activateDeActivateSaga";
import GetUser from "../saga/user/getUserSaga";
import GetReport from "./report/reportSaga";
import Deposit from "./transaction/depositSaga";
import Withdraw from "./transaction/withdrawlSaga";
import Setting from "./game/settingSaga";
import LogoutUser from "./user/logoutUserSaga";
import GetSetting from "./game/getSettingSaga";
import Question from "./question/questionSaga";
import GetQuestion from "./question/getQuestionSaga";
import QuestionResult from "./question/questionResultSaga";
import QuestionDropdown from "./question/getQuestionDropdownSaga";
import Result from "./result/resultSaga";
import GetResult from "./result/getResultSaga";

export default function* rootSaga() {
  yield all([
    Registration(),
    OtpVerify(),
    Login(),
    Logout(),
    ResendOtp(),
    ForgotPassword(),
    ResetPassword(),
    UserDetail(),
    Bet(),
    AuthDetail(),
    UserStatus(),
    GetUser(),
    GetReport(),
    Deposit(),
    Withdraw(),
    Setting(),
    LogoutUser(),
    GetSetting(),
    Question(),
    GetQuestion(),
    QuestionResult(),
    QuestionDropdown(),
    Result(),
    GetResult()
  ]);
}
