import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import profilePic from "../../assets/images/profile/profile.jpeg"; // Replace with the actual path to your profile picture
import {
  removeLocalStorageItem,
  getLocalStorageItem,
  clearLocalStorage
} from "../../utils/helper";

const Navbar = ({ title }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

  // useEffect(() => {
  //   if (getLocalStorageItem("token") && getLocalStorageItem("user")) {
  //     navigate("/dashboard");
  //   } else {
  //     navigate("/");
  //   }
  // }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogOut = (e) => {
    e.preventDefault();
    e.preventDefault();
    clearLocalStorage()
    removeLocalStorageItem("user");
    removeLocalStorageItem("token");
    navigate("/");
  };

  return (
    <div className="bg-gray-900 text-white p-6">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#4fd1c5]">{title}</h1>

        <div
          className="relative"
          // style={{
          //   position: "absolute",
          //   top: windowWidth === 1850 ? "6%" : "4.5%",
          //   right: "2rem",
          //   transform: "translateY(-50%)",
          // }}
        >
          <button onClick={toggleDropdown} className="focus:outline-none">
            <img
              src={profilePic}
              alt="Profile"
              className="w-20 h-20 rounded-full"
            />
          </button>

          {isDropdownOpen && (
            <div
              className="absolute top-full right-0 mt-2 bg-[#4fd1c5] text-gray-800 rounded shadow-md transition-all duration-300"
              style={{
                position: "absolute",
                top: 70,
                zIndex: 999,
              }}
            >
              <ul>
                <li className="py-2 px-4 cursor-pointer hover:bg-indigo-600 hover:text-[#4fd1c5]">
                  Profile
                </li>
                <li className="py-2 px-4 cursor-pointer hover:bg-indigo-600 hover:text-[#4fd1c5]">
                  Settings
                </li>
                <li
                  onClick={(e) => handleLogOut(e)}
                  className="py-2 px-4 cursor-pointer hover:bg-indigo-600 hover:text-[#4fd1c5]"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
