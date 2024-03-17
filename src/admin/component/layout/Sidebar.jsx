// src/components/Sidebar.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi"; // Import hamburger and close icons
import { RxDashboard } from "react-icons/rx";
import { AiOutlineTransaction } from "react-icons/ai";
import { GrTransaction } from "react-icons/gr";
import { FaUsers } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import { BsBank } from "react-icons/bs";
import { TbReportSearch } from "react-icons/tb";
import { IoSettings } from "react-icons/io5";
import { MdQuestionAnswer } from "react-icons/md";
import { VscOutput } from "react-icons/vsc";
import { NAVBAR } from "../../utils/constants";
import Logo from "../../assets/images/logo.png";

const Sidebar = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [isSidebarOpened, setIsSidebarOpened] = useState(true);
  const [active, setActive] = useState(0);

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

  const toggleSidebar = () => {
    setIsSidebarOpened(!isSidebarOpened);
  };

  const redirectRoute = (index, route) => {
    navigate(`${route}`);
    setActive(index);
  };

  return (
    <div
      className={`relative ${
        windowWidth >= 1024
          ? isSidebarOpened
            ? "w-1/5"
            : "w-1/12"
          : isSidebarOpened
          ? "w-2/5"
          : "w-1/5"
      } bg-gray-900 text-white h-screen p-4 transition-all duration-300`}
    >
      <div className="flex items-center justify-between mb-4">
        {/* <div className="flex items-center ml-12"> */}
        <div className="flex items-center ">
          {/* Adjusted the margin here */}
          {/* <FaGlobe size={24} className="text-[#E3BC3F]" /> */}
          <img src={Logo} alt="logo" className="w-24 h-24 rounded-full" />
        </div>
        <button
          onClick={() => toggleSidebar()}
          className={`text-white focus:outline-none p-2`}
        >
          {/* {isSidebarOpen ? <FiX size={32} /> : <FiMenu className="text-blue-500" size={32} />} */}
          <FiMenu className="text-[#E3BC3F]" size={32} />
        </button>
      </div>
      {isSidebarOpened ? (
        <ul className="mt-20">
          {NAVBAR?.map((nav, index) => (
            <li
              key={index}
              className="mb-4 cursor-pointer"
              onClick={() => {
                redirectRoute(nav?.key, nav?.route);
              }}
            >
              <p
                className={` ${
                  active === index ? "text-[#4fd1c5]" : "text-[#E3BC3F]"
                } hover:text-[#4fd1c5] text-xl capitalize`}
              >
                {nav?.name}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="mt-20">
          {NAVBAR?.map((nav, index) => (
            <li
              key={index}
              onClick={() => {
                redirectRoute(nav?.key, nav?.route);
              }}
              className="mb-4 cursor-pointer"
            >
              {nav?.name === "dashboard" ? (
                <RxDashboard
                  size={32}
                  className={`${
                    active === index ? "text-[#4fd1c5]" : "text-[#E3BC3F]"
                  } hover:text-[#4fd1c5]`}
                />
              ) : nav?.name === "user" ? (
                <FaUsers
                  size={32}
                  className={`${
                    active === index ? "text-[#4fd1c5]" : "text-[#E3BC3F]"
                  } hover:text-[#4fd1c5]`}
                />
              ) : nav?.name === "report" ? (
                <TbReportSearch
                  size={32}
                  className={`${
                    active === index ? "text-[#4fd1c5]" : "text-[#E3BC3F]"
                  } hover:text-[#4fd1c5]`}
                />
              ) : nav?.route === "/qbetting" ? (
                <MdQuestionAnswer
                  size={32}
                  className={`${
                    active === index ? "text-[#4fd1c5]" : "text-[#E3BC3F]"
                  } hover:text-[#4fd1c5]`}
                />
              ) : nav?.route === "/result" ? (
                <VscOutput
                  size={32}
                  className={`${
                    active === index ? "text-[#4fd1c5]" : "text-[#E3BC3F]"
                  } hover:text-[#4fd1c5]`}
                />
              ) : nav?.route === "/bank" ? (
                <BsBank
                  size={32}
                  className={`${
                    active === index ? "text-[#4fd1c5]" : "text-[#E3BC3F]"
                  } hover:text-[#4fd1c5]`}
                />
              ) : nav?.route === "/bank-transaction" ? (
                <GrTransaction
                  size={32}
                  className={`${
                    active === index ? "text-[#4fd1c5]" : "text-[#E3BC3F]"
                  } hover:text-[#4fd1c5]`}
                />
              ) : (
                <IoSettings
                  size={32}
                  className={`${
                    active === index ? "text-[#4fd1c5]" : "text-[#E3BC3F]"
                  } hover:text-[#4fd1c5]`}
                />
              )}
            </li>
          ))}

          {/* <li
            onClick={() => {
              redirectRoute1("dashboard");
              setActive(0);
            }}
            className="mb-4 cursor-pointer"
          >
            <RxDashboard
              size={32}
              className={`${
                active === 2 ? "text-indigo-600" : "text-[#4fd1c5]"
              } hover:text-indigo-600`}
            />
          </li>
          <li
            onClick={() => {
              redirectRoute1("user");
              setActive(1);
            }}
            className="mb-4 cursor-pointer"
          >
            <FaUsers
              size={32}
              className={`${
                active === 2 ? "text-indigo-600" : "text-[#4fd1c5]"
              } hover:text-indigo-600`}
            />
          </li>
          <li
            onClick={() => {
              setActive(2);
            }}
            className="mb-4 cursor-pointer"
          >
            <AiOutlineTransaction
              size={32}
              className={`${
                active === 2 ? "text-indigo-600" : "text-[#4fd1c5]"
              } hover:text-indigo-600`}
            />
          </li> */}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
