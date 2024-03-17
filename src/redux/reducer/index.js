import { combineReducers } from "redux";
//import all reducers creating here, and add inside the combine reducers

import Registration from "./user/registrationReducer";
import OtpVerify from "./user/otpVerifyReducer";
import Login from "./auth/loginReducer";
import Logout from "./auth/logoutReducer";
import ResendOtp from "./user/resendOtpReducer";
import ForgotPassword from "./user/forgotPasswordReducer";
import ResetPassword from "./user/resetPasswordReducer";
import UserDetail from "./auth/userDetailReducer";
import Bet from "./game/betReducer";
import AuthDetail from "./auth/authDetailReducer";
import UserStatus from "./user/activateDeActivateReducer";
import GetUser from "./user/getUserReducer";
import GetReport from "./report/reportReducer";
import Deposit from "./transaction/depositReducer";
import Withdraw from "./transaction/withdrawlReducer";
import Setting from "./game/settingReducer";
import LogoutUser from "./user/logoutUserReducer";
import GetSetting from "./game/getSettingReducer";
import Question from "./question/questionReducer";
import GetQuestion from "./question/getQuestionReducer";
import QuestionResult from "./question/questionResultReducer";
import QuestionDropdown from "./question/getQuestionDropdownReducer";
import Result from "./result/resultReducer";
import GetResult from "./result/getResultReducer";
import UpdateProfile from "./user/updateProfileReducer";
import GetQuestionDisplay from "./question/getQuestionDisplayReducer";
import BankTransaction from "./bank/bankTransactionReducer";
import GetDeposit from "./bank/getDepositReducer";
import AddBank from "./bank/addBankReducer";
import GetBank from "./bank/getBankReducer";
import EditBank from "./bank/getBankReducer";
import DeleteBank from "./bank/deleteBankReducer";
import GetWithdrawal from "./bank/getWithdrawalReducer";
import AddBankSlider from "./bank/addBankSliderReducer";
import GetBankSlider from "./bank/getBankSliderReducer";
import DeleteBankSlider from "./bank/getBankSliderReducer";
import GetBankTransaction from "./transaction/getBankTransactionReducer";
import AcceptRejectRequest from "./transaction/acceptRejectRequestReducer";

const appReducer = combineReducers({
  Registration,
  OtpVerify,
  Login,
  Logout,
  ResendOtp,
  ForgotPassword,
  ResetPassword,
  UserDetail,
  Bet,
  AuthDetail,
  UserStatus,
  GetUser,
  GetReport,
  Deposit,
  Withdraw,
  Setting,
  LogoutUser,
  GetSetting,
  Question,
  GetQuestion,
  QuestionResult,
  QuestionDropdown,
  Result,
  GetResult,
  UpdateProfile,
  GetQuestionDisplay,
  BankTransaction,
  GetDeposit,
  AddBank,
  GetBank,
  EditBank,
  DeleteBank,
  GetWithdrawal,
  AddBankSlider,
  GetBankSlider,
  DeleteBankSlider,
  GetBankTransaction,
  AcceptRejectRequest
});
const reducers = (state, action) => {
  return appReducer(state, action);
};
export default reducers;
