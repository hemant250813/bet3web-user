import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsArrowRightCircle } from "react-icons/bs";
import { CgLogOut } from "react-icons/cg";
import { BsPersonAdd } from "react-icons/bs";
import Logo from "../../assets/images/logo.png";
import { logoutUser, userDetail } from "../../redux/action";
import {
  removeLocalStorageItem,
  getLocalStorageItem,
  clearLocalStorage,
} from "../../utils/helper";

const Header = ({ isVerifyMail, setLoading, navbar }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [loginTimeOut, setLoginTimeOut] = useState(0);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [activeTabSubIndex, setActiveTabSubIndex] = useState(0);
  console.log("navbar", navbar);
  const isAuth = getLocalStorageItem("token");
  const userData = JSON.parse(getLocalStorageItem("user"));
  const user_detail = useSelector((state) => state?.UserDetail?.userDetails);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth && !userData) {
      navigate("/");
      clearLocalStorage();
      removeLocalStorageItem("user");
      removeLocalStorageItem("userData");
      removeLocalStorageItem("token");
    }
  }, []);

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
      clearTimeout(loginTimeOut);
    };
  }, [windowWidth, windowHeight]);

  const afterLoadingDispatch = () => {
    let payload = {
      user_id: userData?.username,
    };

    dispatch(
      logoutUser({
        payload,
        callback: async (data) => {
          if (data) {
            setLoading(false);
            clearLocalStorage();
            removeLocalStorageItem("user");
            removeLocalStorageItem("token");
            navigate("/");
            clearTimeout(loginTimeOut);
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

  const activeTab = (index) => {
    setActiveTabIndex(index);
  };

  const redirectSubTab = (route) => {
    console.log("route", route);
    navigate(`${route}`);
  };

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
            onClick={() => navigate("/")}
          />
        </div>

        {/* Middle: Home, Contact, and Game Tabs */}
        <nav className="flex items-center space-x-4 z-50">
          {navbar?.map((nav, index) => (
            <div
              className="relative"
              key={index}
              onMouseEnter={() => activeTab(index)}
            >
              <span
                onClick={() => {
                  console.log("hello", nav?.route);
                  navigate(`${nav?.route}`);
                }}
                className="hover:text-[#3F93F9] cursor-pointer p-3 text-2xl"
              >
                {nav?.name}
              </span>
              {index !== navbar?.length - 1 && <>|</>}
              {nav?.child && index === activeTabIndex && (
                <div
                  onMouseLeave={() => setActiveTabIndex(999)}
                  className="grid grid-cols-1 w-40 h-40 absolute top-12  border-2 border-[#3F93F9]  shadow-md bg-black"
                >
                  {nav?.children?.map((sub, subIndex) => (
                    <Fragment key={subIndex}>
                      <span
                        onMouseEnter={() => {
                          setActiveTabSubIndex(subIndex);
                        }}
                        onClick={() => redirectSubTab(sub?.route)}
                        className={`p-2 ${
                          subIndex === 0
                            ? "border-b-2 border-[#3F93F9] text-[#fff]"
                            : subIndex === 1
                            ? "border-b-2 border-[#3F93F9 text-[#fff]"
                            : nav?.children?.length === 3
                            ? "border-b-2 border-[#3F93F9] text-[#fff]"
                            : ""
                        } ${
                          activeTabSubIndex === subIndex
                            ? "border-[gray] bg-[#3F93F9] text-[#fff]"
                            : ""
                        } cursor-pointer`}
                      >
                        {sub?.name}
                      </span>
                      {/* <span className="p-2">{sub?.name}</span> */}
                    </Fragment>
                  ))}
                </div>
              )}
            </div>
          ))}
          {/* <span className="hover:text-[#E3BC3F] cursor-pointer">Home</span>
          <span className="hover:text-[#E3BC3F] cursor-pointer">Contact</span>
          <span
            onClick={() => navigate("/games")}
            className="hover:text-[#E3BC3F] cursor-pointer"
          >
            Game
          </span> */}
        </nav>

        {/* Right Side: Login, Registration, and Dropdown */}
        <div className="flex items-center space-x-4">
          {isVerifyMail && (
            <>
              {!isAuth && (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    className="flex items-center space-x-2 border border-[gray] text-[#E3BC3F] px-4 py-2 rounded-md focus:outline-none focus:border-yellow-700 focus:ring focus:ring-[#E3BC3F] z-20"
                  >
                    <BsArrowRightCircle />
                    <p>Login</p>
                  </button>
                  <button
                    onClick={() => navigate("/register")}
                    className="flex items-center space-x-2 border border-[gray] text-[#E3BC3F] px-4 py-2 rounded-md focus:outline-none focus:border-yellow-700 focus:ring focus:ring-[#E3BC3F] z-10"
                  >
                    <BsPersonAdd />
                    <p>Registration</p>
                  </button>
                </>
              )}
            </>
          )}

          {isAuth && (
            <button
              onClick={() => onClickLogout()}
              className="flex items-center space-x-2 border border-[gray] text-[#3F93F9] hover:bg-[#3F93F9] hover:text-[#fff] px-4 py-2 rounded-md focus:outline-none focus:border-yellow-700 focus:ring focus:ring-[#E3BC3F] z-50"
            >
              <CgLogOut />
              <p>Logout</p>
            </button>
          )}
          {/* Dropdown Example (replace with your dropdown component) */}
          {/* {isVerifyMail && (
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
          )} */}
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
