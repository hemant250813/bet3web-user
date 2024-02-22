import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CiWallet } from "react-icons/ci";
import { RiLuggageDepositFill } from "react-icons/ri";
import { BiMoneyWithdraw } from "react-icons/bi";
import { FaChartLine } from 'react-icons/fa'; 
import {
  Navbar,
  Sidebar,
  BottomNavbar,
  Footer,
} from "../component/layout/index";
import { getLocalStorageItem } from "../utils/helper";
import { authDetail } from "../../redux/action";

const Dashboard = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const admin_detail = useSelector((state) => state?.AuthDetail?.authDetails);
  const userData = JSON.parse(getLocalStorageItem("user"));
  
  useEffect(() => {
    // Function to update the window dimensions
    const updateWindowDimensions = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    // Add an event listener to update dimensions when the window is resized
    window.addEventListener("resize", updateWindowDimensions);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, [windowWidth, windowHeight]);

  useEffect(() => {
    dispatch(authDetail());
    if (getLocalStorageItem("token") && getLocalStorageItem("user")) {
      navigate("/admin-dashboard");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex h-screen">
      {windowWidth >= 768 && <Sidebar />}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar title="Dashboard" />
        <main
          className="flex-1 overflow-x-hidden overflow-y-auto scrollbar scrollbar-thumb-[#4fd1c5] scrollbar-track-[#93C5FD] bg-indigo-600 p-4"
          style={{ maxHeight: "calc(100vh - 120px)" }}
        >
          <h2 className="text-2xl font-semibold mb-4">
            Welcome to the Dashboard
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Card 1 */}
            <div className="bg-gray-800 rounded-lg p-12 shadow-md flex items-center">
              <CiWallet size={50} color="#0000FF" className="mr-4" />
              {/* <p className="text-[#0000FF]">Balance</p> */}
              <p className="text-[#0000FF] text-lg">{admin_detail?.balance?.toFixed(2)}</p>
            </div>
            {/* Card 2 */}
            <div className="bg-gray-800 rounded-lg p-12 shadow-md flex items-center">
              <RiLuggageDepositFill
                size={50}
                color="#008000"
                className="mr-4"
              />
              {/* <p
                className="text-[#008000]"
              >
                Deposit
              </p> */}
              <p
                className="text-[#008000] text-lg"
              >
                {admin_detail?.totalDeposit?.toFixed(2)}
              </p>
            </div>
            {/* Card 3 */}
            <div className="bg-gray-800 rounded-lg p-12 shadow-md flex items-center">
              <BiMoneyWithdraw size={50} color="#ff0000" className="mr-4" />
              {/* <p className="text-[#ff0000]">Withdraw</p> */}
              <p className="text-[#ff0000] text-lg">{admin_detail?.totalWithdrawl?.toFixed(2)}</p>
            </div>
             {/* Card 4 */}
             <div className="bg-gray-800 rounded-lg p-12 shadow-md flex items-center">
              <FaChartLine size={50} className="mr-4 bg-gradient-to-r from-sky-600 from-10% via-teal-500 via-30% to-red-600 to-100%" />
              {/* <p className="text-[#008000] text-lg">P</p><p className="text-white px-2">/</p><p className="text-[#ff0000] text-lg">L</p> */}
              <p className="text-white text-lg">{admin_detail?.total_pl?.toFixed(2)}</p>
            </div>
            {/* Add more cards as needed */}
          </div>
        </main>
        {/* Bottom navbar */}
        {windowWidth < 768 ? <BottomNavbar /> : <Footer />}
      </div>
    </div>
  );
};

export default Dashboard;
