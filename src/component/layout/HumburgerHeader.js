import React, { useState, useEffect, Fragment } from "react";
import { BsArrowRightCircle } from "react-icons/bs";
import { BsPersonAdd } from "react-icons/bs";

{
  /* Desktop Header */
}
const HumburgerHeader = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [hideHeader, setHideHeader] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(false);

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

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
      <header className="md:flex absolute top-0 left-0 right-0 bg-black bg-opacity-80 text-[#e7e7f4] p-4 flex items-center justify-between z-10">
        {/* Left Side: Icon */}
        <div className="flex items-center">
          <img
            src="https://script.viserlab.com/xaxino/assets/images/logoIcon/logo.png"
            alt="site-logo"
          />
        </div>

        {/* Right Side: Hamburger Icon */}
        <button
          className="text-[#E3BC3F] focus:outline-none"
          onClick={toggleNav}
        >
          {/* Hamburger Icon */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>

        {/* Vertical Navbar */}
        {isNavVisible && (
          <div
          className={`${
            isNavVisible ? "navbar-transition-active" : "navbar-transition"
          } absolute top-16 left-0 right-0 bg-black bg-opacity-80 text-[#e7e7f4] p-4 flex flex-col items-start ease-in-out`}
        >
          <a href="#" className="hover:text-[#E3BC3F] block border-b-2 border-gray-400 pb-1 w-full">
            Home
          </a>
          <a href="#" className="hover:text-[#E3BC3F] block border-b-2 border-gray-400 pb-1 w-full">
            Contact
          </a>
          <a href="#" className="hover:text-[#E3BC3F] block border-b-2 border-gray-400 pb-1 w-full">
            Game
          </a>
          <a href="#" className="hover:text-[#E3BC3F] block border-b-2 border-gray-400 pb-1 w-full">
            Home
          </a>
          <a href="#" className="hover:text-[#E3BC3F] block border-b-2 border-gray-400 pb-1 w-full">
            Contact
          </a>
          <a href="#" className="hover:text-[#E3BC3F] block border-b-2 border-gray-400 pb-1 w-full">
            Game
          </a>
        </div>
        
        )}
      </header>
    </Fragment>
  );
};

export default HumburgerHeader;
