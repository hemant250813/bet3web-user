import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiWallet } from "react-icons/ci";
import { RiLuggageDepositFill } from "react-icons/ri";
import { BiMoneyWithdraw } from "react-icons/bi";
import { FaChartLine } from "react-icons/fa";
import {
  Navbar,
  Sidebar,
  BottomNavbar,
  Footer,
} from "../../component/layout/index";
import { getLocalStorageItem } from "../../utils/helper";

const Setting = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const navigate = useNavigate();

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
    if (getLocalStorageItem("token") && getLocalStorageItem("user")) {
      navigate("/setting");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex h-screen">
      {windowWidth >= 768 && <Sidebar />}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar title="Setting" />
        <main
          className="flex-1 overflow-x-hidden overflow-y-auto scrollbar scrollbar-thumb-[#4fd1c5] scrollbar-track-[#93C5FD] bg-indigo-600 p-4"
          style={{ maxHeight: "calc(100vh - 120px)" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
            <div className="mb-4">
              <label htmlFor="input1" className="block text-black text-3xl py-2">
                Input 1
              </label>
              <input
                type="text"
                id="input1"
                className="bg-gray-900 rounded-md p-2 w-full text-[#ABBCBC]"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="input2" className="block text-black text-3xl py-2" >
                Input 2
              </label>
              <input
                type="text"
                id="input2"
                className="bg-gray-900 rounded-md p-2 w-full text-[#ABBCBC]"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="input3" className="block text-blackwhite text-3xl py-2">
                Input 3
              </label>
              <input
                type="text"
                id="input3"
                className="bg-gray-900 rounded-md p-2 w-full text-[#ABBCBC]"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="input4" className="block text-black text-3xl py-2">
                Input 4
              </label>
              <input
                type="text"
                id="input4"
                className="bg-gray-900 rounded-md p-2 w-full text-[#ABBCBC]"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 mt-8">
    
            <div className="mb-4">
              <button
                type="button"
                className="w-full bg-[#4fd1c5] py-2 px-4 rounded-md h-16 text-black text-3xl"
                // onClick={() => handleClick()}
              >
                Submit
              </button>
            </div>
          </div>
        </main>
        {/* Bottom navbar */}
        {windowWidth < 768 ? <BottomNavbar /> : <Footer />}
      </div>
    </div>
  );
};

export default Setting;
