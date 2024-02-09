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
import Login from "../container/Login";
import Register from "../container/Register";
import ForgotPassword from "../container/ForgotPassword";
import VerifyEmail from "../container/VerifyMail";
import ResetPassword from "../container/ResetPassword";
import Dashboard from "../container/Dashboard";
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
      <Route exact path="/head_tail" element={<HeadTail navbar={DASHBOARD_NAVBAR}/>} />
      <Route
        exact
        path="/rock_paper_scissors"
        element={<RockPaperScissors navbar={DASHBOARD_NAVBAR}/>}
      />
      <Route exact path="/spin_wheel" element={<SpinWheel navbar={DASHBOARD_NAVBAR}/>} />
      <Route exact path="/number_guess" element={<NumberGuess navbar={DASHBOARD_NAVBAR}/>} />
      <Route exact path="/dice_rolling" element={<DiceRolling navbar={DASHBOARD_NAVBAR}/>} />
      <Route exact path="/card_finding" element={<CardFinding navbar={DASHBOARD_NAVBAR}/>} />
      <Route exact path="/number_slot" element={<NumberSlot navbar={DASHBOARD_NAVBAR}/>} />
      <Route exact path="/number_pool" element={<NumberPool navbar={DASHBOARD_NAVBAR}/>} />
      {/* <Route path={`/sign-up`} element={<SignUp />} />
      <Route path={`/dashboard`} element={<Dashboard />} />
      <Route path={`/otp-screen`} element={<OtpScreen />} /> */}
      {/* <Route element={<Layout />}>
        <Route exact path="/" element={<Login />} />
        <Route path={`/sign-up`} element={<SignUp />} />
        <Route element={<PrivateRoutes />}>
          <Route path={Paths.mymarket} element={<MyMarketPage />} />
          <Route path={Paths.pl} element={<ProfitLossPage />} />
        </Route>
      </Route> */}
    </Routes>
  );
};

export default RouteFile;
