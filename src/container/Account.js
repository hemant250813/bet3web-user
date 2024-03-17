import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaMoneyBillWave } from "react-icons/fa";
import { IoWalletOutline } from "react-icons/io5";
import { GiTakeMyMoney } from "react-icons/gi";
import { TbChartHistogram } from "react-icons/tb";
import { GiTrophyCup } from "react-icons/gi";
import { GiPayMoney } from "react-icons/gi";
import { userDetail } from "../redux/action";

const Account = ({ userDetails }) => {
  const dispatch = useDispatch();
  // const user_detail = useSelector((state) => state?.UserDetail?.userDetails);
  const [count, setCount] = useState(0);
  const [clearIntervalCount, setClearIntervalCount] = useState(0);
  const [tabViews, setTabViews] = useState([
    { card: "balance", isActive: false },
    { card: `deposit`, isActive: false },
    { card: `withdraw`, isActive: false },
    { card: "invest", isActive: false },
    { card: `win`, isActive: false },
    { card: `loss`, isActive: false },
  ]);

  console.log("tabViews", tabViews);
  const handleMouseEnter = (number, card, number_controll) => {
    const filterTabList = tabViews.map((el) =>
      el.card === card ? { ...el, isActive: true } : { ...el, isActive: false }
    );
    setTabViews(filterTabList);

    let countIncrement = 0;
    let countDecrement = -1;
    const interval = setInterval(() => {
      // negative number
      if (number < 0) {
        if (countDecrement >= number) {
          setCount(countDecrement);
          if (number <= -100) {
            let data = number + number_controll;
            if (countDecrement > data) {
              countDecrement -= number_controll;
            } else {
              countDecrement -= 1;
            }
          } else {
            countDecrement -= 1;
          }
        } else {
          clearInterval(interval);
        }
      } else {
        // positive number
        if (countIncrement <= number) {
          setCount(countIncrement);
          if (number <= 100) {
            countIncrement += 1;
          } else {
            let data = number - number_controll;
            if (countIncrement < data) {
              countIncrement += number_controll;
            } else {
              countIncrement += 1;
            }
          }
        } else {
          clearInterval(interval);
        }
      }
    }, 10); // Change the interval duration as needed
    setClearIntervalCount(interval);
  };

  const handleMouseLeave = (card) => {
    const filterTabList = tabViews.map((el) =>
      el.card === card ? { ...el, isActive: false } : { ...el, isActive: false }
    );
    setTabViews(filterTabList);
    setCount(0);
    clearInterval(clearIntervalCount);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* <!-- Card 1 --> */}
      <div
        onMouseEnter={() =>
          handleMouseEnter(
            userDetails?.balance,
            "balance",
            userDetails?.balance > 6000 ? 500 : 100
          )
        }
        onMouseLeave={() => handleMouseLeave("balance")}
        className={`flex bg-black border border-gray-400 gap-6 hover:bg-[#3F93F9] ${
          tabViews[0].isActive ? "p-8 transition-transform duration-500 transform hover:-translate-x-4" : "p-4"
        } text-2xl rounded-md`}
      >
        {/* <!-- Card content goes here --> */}
        <span
          className={`bg-[#E3BC3F] rounded-md ${
            tabViews[0].isActive ? "p-6" : "p-3"
          }`}
        >
          <FaMoneyBillWave backgr color="white" size={50} />
        </span>
        <span
          className={`${tabViews[0].isActive ? "font-bold" : ""} text-white`}
        >
          {tabViews[0].isActive}
          <p className={`${tabViews[0].isActive ? "text-4xl" : ""} `}>
            Total Balance
          </p>
          <p className={`${tabViews[0].isActive ? "text-6xl" : ""} `}>
            {tabViews[0].isActive ? count : userDetails?.balance}.00 USD
          </p>
        </span>
      </div>

      {/* <!-- Card 2 --> */}
      <div
        onMouseEnter={() =>
          handleMouseEnter(
            userDetails?.totalDeposit,
            "deposit",
            userDetails?.totalDeposit > 6000 ? 500 : 100
          )
        }
        onMouseLeave={() => handleMouseLeave("deposit")}
        className={`flex bg-black border border-gray-400 gap-6 hover:bg-[#3F93F9] ${
          tabViews[1].isActive ? "p-8 transition-transform duration-500 transform hover:-translate-y-4" : "p-4"
        } text-2xl rounded-md`}
      >
        {/* <!-- Card content goes here --> */}
        <span
          className={`bg-[#76CD20] rounded-md ${
            tabViews[1].isActive ? "p-6" : "p-3"
          }`}
        >
          {" "}
          <IoWalletOutline color="white" size={40} />
        </span>
        <span
          className={`${tabViews[1].isActive ? "font-bold" : ""} text-white`}
        >
          {" "}
          {tabViews[1].isActive}
          <p className={`${tabViews[1].isActive ? "text-4xl" : ""}`}>
            Total Deposit
          </p>
          <p className={`${tabViews[1].isActive ? "text-6xl" : ""}`}>
            {tabViews[1].isActive ? count : userDetails?.totalDeposit}.00 USD
          </p>
        </span>
      </div>

      {/* <!-- Card 3 --> */}
      <div
        onMouseEnter={() =>
          handleMouseEnter(
            userDetails?.totalWithdrawl,
            "withdraw",
            userDetails?.totalWithdrawl > 6000 ? 500 : 100
          )
        }
        onMouseLeave={() => handleMouseLeave("withdraw")}
        className={`flex bg-black border border-gray-400 gap-6 hover:bg-[#3F93F9] text-2xl ${
          tabViews[2].isActive ? "p-8 transition-transform duration-500 transform hover:translate-x-4	" : "p-4"
        } rounded-md`}
      >
        {/* <!-- Card content goes here --> */}
        <span
          className={`bg-[#CF4B1A] rounded-md ${
            tabViews[2].isActive ? "p-6" : "p-3"
          }`}
        >
          {" "}
          <GiTakeMyMoney color="white" size={40} />
        </span>
        <span
          className={`${tabViews[2].isActive ? "font-bold" : ""} text-white`}
        >
          {" "}
          { tabViews[2].isActive}
          <p className={`${tabViews[2].isActive ? "text-4xl" : ""}`}>
            Total Withdraw
          </p>
          <p className={`${tabViews[2].isActive ? "text-6xl" : ""}`}>
            {tabViews[2].isActive ? count : userDetails?.totalWithdrawl}.00 USD
          </p>
        </span>
      </div>

      {/* <!-- Card 4 --> */}
      <div
        onMouseEnter={() =>
          handleMouseEnter(
            userDetails?.total_invest,
            "invest",
            userDetails?.total_invest > 6000 ? 500 : 100
          )
        }
        onMouseLeave={() => handleMouseLeave("invest")}
        className={`flex bg-[#RRGGBB] border border-gray-400 gap-6 hover:bg-[#3F93F9] text-2xl ${
          tabViews[3].isActive ? "p-8 transition-transform duration-500 transform hover:-translate-x-4" : "p-4"
        } rounded-md`}
      >
        {/* <!-- Card content goes here --> */}
        <span
          className={`bg-[#2FADDF] rounded-md ${
            tabViews[3].isActive ? "p-6" : "p-3"
          }`}
        >
          {" "}
          <TbChartHistogram color="white" size={40} />
        </span>
        <span
          className={`${tabViews[3].isActive ? "font-bold" : ""} text-white`}
        >
          {" "}
          {tabViews[3].isActive}
          <p className={`${tabViews[3].isActive ? "text-4xl" : ""}`}>
            Total Invest
          </p>
          <p className={`${tabViews[3].isActive ? "text-6xl" : ""}`}>
            {tabViews[3].isActive ? count : userDetails?.total_invest}.00 USD
          </p>
        </span>
      </div>

      {/* <!-- Card 5 --> */}
      <div
        onMouseEnter={() =>
          handleMouseEnter(
            userDetails?.total_win,
            "win",
            userDetails?.total_win > 6000 ? 500 : 100
          )
        }
        onMouseLeave={() => handleMouseLeave("win")}
        className={`flex bg-black border border-gray-400 gap-6 hover:bg-[#3F93F9] text-2xl ${
          tabViews[4].isActive ? "p-8 transition-transform duration-500 transform hover:translate-y-4" : "p-4"
        } rounded-md`}
      >
        {/* <!-- Card content goes here --> */}
        <span
          className={`bg-[#76CD20] rounded-md ${
            tabViews[4].isActive ? "p-6" : "p-3"
          }`}
        >
          {" "}
          <GiTrophyCup color="white" size={40} />
        </span>
        <span
          className={`${tabViews[4].isActive ? "font-bold" : ""} text-white`}
        >
          {" "}
          {tabViews[4].isActive}
          <p className={`${tabViews[4].isActive ? "text-4xl" : ""} `}>
            Total Win
          </p>
          <p className={`${tabViews[4].isActive ? "text-6xl" : ""}`}>
            {tabViews[4].isActive ? count : userDetails?.total_win}.00 USD
          </p>
        </span>
      </div>

      {/* <!-- Card 6 --> */}
      <div
        onMouseEnter={() =>
          handleMouseEnter(
            userDetails?.total_loss,
            "loss",
            userDetails?.total_loss > -6000 ? 500 : 100
          )
        }
        onMouseLeave={() => handleMouseLeave("loss")}
        className={`flex bg-black border border-gray-400 gap-6 hover:bg-[#3F93F9] text-2xl ${
          tabViews[5].isActive ? "p-8 transition-transform duration-500 transform hover:translate-x-4" : "p-4"
        } rounded-md`}
      >
        {/* <!-- Card content goes here --> */}
        <span
          className={`bg-[#F0AA20] rounded-md ${
            tabViews[5].isActive ? "p-6" : "p-3"
          }`}
        >
          {" "}
          <GiPayMoney color="white" size={40} />
        </span>
        <span
          className={`${tabViews[5].isActive ? "font-bold" : ""} text-white`}
        >
          {" "}
          <p>{tabViews[5].isActive}</p>
          <p className={`${tabViews[5].isActive ? "text-4xl" : ""}`}>
            Total Loss
          </p>
          <p className={`${tabViews[5].isActive ? "text-6xl" : ""}`}>
            {tabViews[5].isActive ? count : userDetails?.total_loss}.00 USD
          </p>
        </span>
      </div>
    </div>
  );
};

export default Account;
