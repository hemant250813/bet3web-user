import React from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import { IoWalletOutline } from "react-icons/io5";
import { GiTakeMyMoney } from "react-icons/gi";
import { TbChartHistogram } from "react-icons/tb";
import { GiTrophyCup } from "react-icons/gi";
import { GiPayMoney } from "react-icons/gi";

const Account = ({ userDetails }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* <!-- Card 1 --> */}
      <div className="flex bg-black  p-4 border border-gray-400 gap-6">
        {/* <!-- Card content goes here --> */}
        <span className="bg-[#E3BC3F] p-3 rounded-md">
          <FaMoneyBillWave backgr color="white" size={50} />
        </span>
        <span>
          <p className="text-white">Total Balance</p>
          <p className="text-white">{userDetails?.balance.toFixed(2)} USD</p>
        </span>
      </div>

      {/* <!-- Card 2 --> */}
      <div className="flex bg-black  p-4 border border-gray-400 gap-6">
        {/* <!-- Card content goes here --> */}
        <span className="bg-[#76CD20] p-3 rounded-md">
          {" "}
          <IoWalletOutline color="white" size={40} />
        </span>
        <span>
          {" "}
          <p className="text-white">Total Deposit</p>
          <p className="text-white">{userDetails?.totalDeposit.toFixed(2)} USD</p>
        </span>
      </div>

      {/* <!-- Card 3 --> */}
      <div className="flex bg-black  p-4 border border-gray-400 gap-6">
        {/* <!-- Card content goes here --> */}
        <span className="bg-[#CF4B1A] p-3 rounded-md">
          {" "}
          <GiTakeMyMoney color="white" size={40} />
        </span>
        <span>
          {" "}
          <p className="text-white">Total Withdraw</p>
          <p className="text-white">{userDetails?.totalWithdrawl.toFixed(2)} USD</p>
        </span>
      </div>

      {/* <!-- Card 4 --> */}
      <div className="flex bg-[#RRGGBB]  p-4 border border-gray-400 gap-6">
        {/* <!-- Card content goes here --> */}
        <span className="bg-[#2FADDF] p-3 rounded-md">
          {" "}
          <TbChartHistogram color="white" size={40} />
        </span>
        <span>
          {" "}
          <p className="text-white">Total Invest</p>
          <p className="text-white">{userDetails?.total_invest.toFixed(2)} USD</p>
        </span>
      </div>

      {/* <!-- Card 5 --> */}
      <div className="flex bg-black  p-4 border border-gray-400 gap-6">
        {/* <!-- Card content goes here --> */}
        <span className="bg-[#76CD20] p-3 rounded-md">
          {" "}
          <GiTrophyCup color="white" size={40} />
        </span>
        <span>
          {" "}
          <p className="text-white">Total Win</p>
          <p className="text-white">{userDetails?.total_win.toFixed(2)} USD</p>
        </span>
      </div>

      {/* <!-- Card 6 --> */}
      <div className="flex bg-black  p-4 border border-gray-400 gap-6">
        {/* <!-- Card content goes here --> */}
        <span className="bg-[#F0AA20] p-3 rounded-md">
          {" "}
          <GiPayMoney color="white" size={40} />
        </span>
        <span>
          {" "}
          <p className="text-white">Total Loss</p>
          <p className="text-white">{userDetails?.total_loss.toFixed(2)} USD</p>
        </span>
      </div>
    </div>
  );
};

export default Account;
