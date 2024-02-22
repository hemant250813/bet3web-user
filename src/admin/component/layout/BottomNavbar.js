import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { AiOutlineTransaction } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { IoSettings } from "react-icons/io5";
import { NAVBAR } from "../../utils/constants";
const BottomNavbar = () => {
  const [active, setActive] = useState(0);
  const activeTab = (tab) => {
    setActive(tab);
  };
  return (
    <div className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex items-center justify-center">
        <div className="flex space-x-14">
          {/* Navbar Links */}
          {NAVBAR?.map((nav, index) => (
            <Link
              onClick={() => activeTab(index)}
              key={index}
              to={`/${nav?.route}`}
              className={` hover:text-indigo-600 ${
                active === index ? "text-indigo-600" : "text-[#4fd1c5]"
              }`}
            >
              {" "}
              {nav?.name === "dashboard" ? (
                <RxDashboard size={32} />
              ) : nav?.name === "user" ? (
                <FaUsers size={32} />
              ) : (
                nav?.name === "report" ? (
                  <TbReportSearch size={32} />
                ) : (
                  <IoSettings size={32} />
                )
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomNavbar;
