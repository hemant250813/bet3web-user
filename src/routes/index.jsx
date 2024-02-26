import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../container/Home";
import Games from "../container/Games/Games";
import HeadTail from "../container/Games/HeadTail";
import RockPaperScissors from "../container/Games/RockPaperScissors";
import SpinWheel from "../container/Games/SpinWheel";
import NumberGuess from "../container/Games/NumberGuess";
import DiceRolling from "../container/Games/DiceRolling";
import CardFinding from "../container/Games/cards/CardFinding";
import NumberSlot from "../container/Games/NumberSlots/PlayNumberSlots";
import NumberPool from "../container/Games/NumberPool/PoolNumber";
import Question from "../container/Games/Question.js";
import Login from "../container/Login";
import Register from "../container/Register";
import ForgotPassword from "../container/ForgotPassword";
import VerifyEmail from "../container/VerifyMail";
import ResetPassword from "../container/ResetPassword";
import Dashboard from "../container/Dashboard";
import Deposit from "../container/Deposit/Deposit";
import DepositLog from "../container/Deposit/DepositLog";
import Withdraw from "../container/Withdraw/Withdraw";
import WithdrawLog from "../container/Withdraw/WithdrawLog";
import GameLog from "../container/Reports/GameLog";
import CommissionLog from "../container/Reports/CommissionLog";
import Transactions from "../container/Reports/Transactions";
import NewTicket from "../container/Support/NewTicket";
import Ticket from "../container/Support/Ticket";
import ProfileSetting from "../container/Account/ProfileSetting";
import ChangePassword from "../container/Account/ChangePassword";

//admin
import AdminDashboard from "../admin/container/Dashboard.jsx";
import User from "../admin/container/User/User.jsx";
import Report from "../admin/container/Report/Report.jsx";
import Setting from "../admin/container/Setting/Setting.jsx";
import Qbetting from "../admin/container/Qbetting/Qbetting.jsx";
import Result from "../admin/container/Result/Result.jsx";
//admin
import { HOME_NAVBAR, DASHBOARD_NAVBAR } from "../utils/constants";

const RouteFile = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home navbar={HOME_NAVBAR} />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/forgot_password" element={<ForgotPassword />} />
      <Route exact path="/verify_email" element={<VerifyEmail />} />
      <Route exact path="/reset_password" element={<ResetPassword />} />
      <Route
        exact
        path="/dashboard"
        element={<Dashboard navbar={DASHBOARD_NAVBAR} />}
      />
      <Route exact path="/games" element={<Games />} />
      <Route
        exact
        path="/head_tail"
        element={<HeadTail navbar={DASHBOARD_NAVBAR} />}
      />
      <Route
        exact
        path="/rock_paper_scissors"
        element={<RockPaperScissors navbar={DASHBOARD_NAVBAR} />}
      />
      <Route
        exact
        path="/spin_wheel"
        element={<SpinWheel navbar={DASHBOARD_NAVBAR} />}
      />
      <Route
        exact
        path="/number_guess"
        element={<NumberGuess navbar={DASHBOARD_NAVBAR} />}
      />
      <Route
        exact
        path="/dice_rolling"
        element={<DiceRolling navbar={DASHBOARD_NAVBAR} />}
      />
      <Route
        exact
        path="/card_finding"
        element={<CardFinding navbar={DASHBOARD_NAVBAR} />}
      />
      <Route
        exact
        path="/number_slot"
        element={<NumberSlot navbar={DASHBOARD_NAVBAR} />}
      />
      <Route
        exact
        path="/number_pool"
        element={<NumberPool navbar={DASHBOARD_NAVBAR} />}
      />
      <Route
        exact
        path="/question"
        element={<Question navbar={DASHBOARD_NAVBAR} />}
      />
      <Route
        exact
        path="/deposit"
        element={<Deposit navbar={DASHBOARD_NAVBAR} />}
      />
      <Route
        exact
        path="/deposit/log"
        element={<DepositLog navbar={DASHBOARD_NAVBAR} />}
      />
      <Route
        exact
        path="/withdraw"
        element={<Withdraw navbar={DASHBOARD_NAVBAR} />}
      />
      <Route
        exact
        path="/withdraw/log"
        element={<WithdrawLog navbar={DASHBOARD_NAVBAR} />}
      />
      <Route
        exact
        path="/game/log"
        element={<GameLog navbar={DASHBOARD_NAVBAR} />}
      />
      <Route
        exact
        path="/commission/log"
        element={<CommissionLog navbar={DASHBOARD_NAVBAR} />}
      />
      <Route
        exact
        path="/transactions"
        element={<Transactions navbar={DASHBOARD_NAVBAR} />}
      />
      <Route
        exact
        path="/ticket/new"
        element={<NewTicket navbar={DASHBOARD_NAVBAR} />}
      />
      <Route
        exact
        path="/ticket"
        element={<Ticket navbar={DASHBOARD_NAVBAR} />}
      />
      <Route
        exact
        path="/profile_setting"
        element={<ProfileSetting navbar={DASHBOARD_NAVBAR} />}
      />
      <Route
        exact
        path="/change_password"
        element={<ChangePassword navbar={DASHBOARD_NAVBAR} />}
      />

      {/* admin */}
      <Route path={`/admin-dashboard`} element={<AdminDashboard />} />
      <Route path={`/user`} element={<User />} />
      <Route path={`/report`} element={<Report />} />
      <Route path={`/report/:id`} element={<Report />} />
      <Route path={`/setting`} element={<Setting />} />
      <Route path={`/qbetting`} element={<Qbetting />} />
      <Route path={`/result`} element={<Result />} />
    </Routes>
  );
};

export default RouteFile;
