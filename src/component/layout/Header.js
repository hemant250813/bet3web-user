import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowRightCircle } from "react-icons/bs";
import { BsPersonAdd } from "react-icons/bs";
import Logo from "../../assets/images/logo.png";

const Header = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [hideHeader, setHideHeader] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (windowWidth > 768) {
      setHideHeader(true);
    } else {
      setHideHeader(false);
    }
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

  return (
    <Fragment>
      <header className="md:flex absolute top-0 left-0 right-0 bg-black bg-opacity-80 text-[#e7e7f4] p-4 flex items-center justify-around ">
        {/* Left Side: Icon */}
        <div className="flex items-center relative">
          <img
            src={Logo}
            alt="site-logo"
            height={30}
            width={130}
            className="z-50"
            onClick={()=>navigate("/")}
          />
        </div>

        {/* Middle: Home, Contact, and Game Tabs */}
        <nav className="flex items-center space-x-4">
          <span className="hover:text-[#E3BC3F] cursor-pointer">Home</span>
          <span className="hover:text-[#E3BC3F] cursor-pointer">Contact</span>
          <span onClick={()=>navigate("/games")} className="hover:text-[#E3BC3F] cursor-pointer">Game</span>
        </nav>

        {/* Right Side: Login, Registration, and Dropdown */}
        <div className="flex items-center space-x-4">
          <button onClick={()=>navigate("/login")} className="flex items-center space-x-2 border border-[gray] text-[#E3BC3F] px-4 py-2 rounded-md focus:outline-none focus:border-yellow-700 focus:ring focus:ring-[#E3BC3F] z-20">
            <BsArrowRightCircle />
            <p>Login</p>
          </button>
          <button onClick={()=>navigate("/register")} className="flex items-center space-x-2 border border-[gray] text-[#E3BC3F] px-4 py-2 rounded-md focus:outline-none focus:border-yellow-700 focus:ring focus:ring-[#E3BC3F] z-10">
            <BsPersonAdd />
            <p>Registration</p>
          </button>

          {/* Dropdown Example (replace with your dropdown component) */}
          <div className="relative inline-block text-left z-30">
            <select
              name="language"
              id="language"
              className="border border-[gray] focus:outline-none bg-[#0A0629] px-4 py-2 "
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="c++">C++</option>
              <option value="java">Java</option>
            </select>
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
