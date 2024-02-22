import React, { useState, useEffect, Fragment } from "react";
import { CgLogOut } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Logo from "../../assets/images/logo.png";
import { getLocalStorageItem } from "../../utils/helper";
import { logout } from "../../redux/action";

const HumburgerHeader = ({ setLoading }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [hideHeader, setHideHeader] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [loginTimeOut, setLoginTimeOut] = useState(0);

  const isAuth = getLocalStorageItem("token");
  const userData = JSON.parse(getLocalStorageItem("user"));

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      clearTimeout(loginTimeOut);
    };
  }, [windowWidth, windowHeight]);

  const afterLoadingDispatch = () => {
    let payload = {
      user_id: userData.username,
    };

    dispatch(
      logout({
        payload,
        callback: async (data) => {
          if (data) {
            setLoading(false);
            navigate("/");
          }
        },
      })
    );
  };

  const onClickLogout = () => {
    setLoading(true);
    let timeout = setTimeout(() => {
      afterLoadingDispatch();
    }, 2000);
    setLoginTimeOut(timeout);
  };

  return (
    <Fragment>
      <header className="md:flex absolute top-0 left-0 right-0 bg-black bg-opacity-80 text-[#e7e7f4] p-4 flex items-center justify-between z-50">
        {/* Left Side: Icon */}
        <div className="flex items-center">
          <img src={Logo} height={70} width={70} alt="site-logo" />
        </div>

        {/* Right Side: Hamburger Icon */}
        <button
          className={`text-[#E3BC3F] focus:outline-none`}
          onClick={toggleNav}
        >
          {/* Hamburger Icon */}
          <svg
            className={`${
              windowWidth === 320
                ? "w-14 h-14"
                : windowWidth === 375
                ? "w-14 h-14"
                : windowWidth === 425
                ? "w-14 h-14"
                : windowWidth === 768
                ? "w-16 h-16"
                : "w-6 h-6"
            } `}
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
            } absolute ${
              windowWidth === 320
                ? "top-24"
                : windowWidth === 375
                ? "top-24"
                : windowWidth === 425
                ? "top-24"
                : windowWidth === 768
                ? "top-24"
                : "top-16"
            } left-0 right-0 bg-black  text-[#e7e7f4] p-4 flex flex-col items-start ease-in-out`}
          >
            <a
              className={`hover:text-[#E3BC3F] block border-b-2 border-gray-400 pb-1 ${
                windowWidth === 320
                  ? "text-4xl"
                  : windowWidth === 375
                  ? "text-4xl"
                  : windowWidth === 425
                  ? "text-4xl"
                  : windowWidth === 768
                  ? "text-4xl"
                  : ""
              } w-full`}
            >
              Home
            </a>
            <a
              href="#"
              className={`hover:text-[#E3BC3F] block border-b-2 border-gray-400 pb-1 ${
                windowWidth === 320
                  ? "text-4xl"
                  : windowWidth === 375
                  ? "text-4xl"
                  : windowWidth === 425
                  ? "text-4xl"
                  : windowWidth === 768
                  ? "text-4xl"
                  : ""
              } w-full`}
            >
              Contact
            </a>
            <a
              href="#"
              className={`hover:text-[#E3BC3F] block border-b-2 border-gray-400 pb-1 ${
                windowWidth === 320
                  ? "text-4xl"
                  : windowWidth === 375
                  ? "text-4xl"
                  : windowWidth === 425
                  ? "text-4xl"
                  : windowWidth === 768
                  ? "text-4xl"
                  : ""
              } w-full`}
            >
              Game
            </a>
            <a
              href="#"
              className={`hover:text-[#E3BC3F] block border-b-2 border-gray-400 pb-1 ${
                windowWidth === 320
                  ? "text-4xl"
                  : windowWidth === 375
                  ? "text-4xl"
                  : windowWidth === 425
                  ? "text-4xl"
                  : windowWidth === 768
                  ? "text-4xl"
                  : ""
              } w-full`}
            >
              Home
            </a>
            <a
              href="#"
              className={`hover:text-[#E3BC3F] block border-b-2 border-gray-400 pb-1 ${
                windowWidth === 320
                  ? "text-4xl"
                  : windowWidth === 375
                  ? "text-4xl"
                  : windowWidth === 425
                  ? "text-4xl"
                  : windowWidth === 768
                  ? "text-4xl"
                  : ""
              } w-full`}
            >
              Contact
            </a>
            <a
              href="#"
              className={`hover:text-[#E3BC3F] block border-b-2 border-gray-400 pb-1 ${
                windowWidth === 320
                  ? "text-4xl"
                  : windowWidth === 375
                  ? "text-4xl"
                  : windowWidth === 425
                  ? "text-4xl"
                  : windowWidth === 768
                  ? "text-4xl"
                  : ""
              } w-full`}
            >
              Game
            </a>
            {(isAuth && userData) &&  <button
              onClick={() => onClickLogout()}
              className={`flex items-center space-x-2 border border-[gray] text-[#E3BC3F] ${windowWidth === 320?"px-28":windowWidth === 375?"px-32":windowWidth === 768?"px-80":""} py-4 mt-4 rounded-md focus:outline-none focus:border-yellow-700 focus:ring focus:ring-[#E3BC3F] z-10`}
            >
              <CgLogOut />
              <p>Logout</p>
            </button>}
           
          </div>
        )}
      </header>
    </Fragment>
  );
};

export default HumburgerHeader;
