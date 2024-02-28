import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header, HumburgerHeader } from "../../component/layout";
import HeaderBackground from "../../assets/images/headerBackground.jpg";
import { getLocalStorageItem } from "../../utils/helper";
import {
  Loader,
  LoaderMain,
  SlidingMessages,
} from "../../component/commonComponent";

const Section1 = ({ loading, setLoading, navbar }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [hideHeader, setHideHeader] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const isAuth = getLocalStorageItem("token");
  const userData = JSON.parse(getLocalStorageItem("user"));

  const navigate = useNavigate();

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  useEffect(() => {
    if (windowWidth <= 768) {
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

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <section
        className="flex-grow p-4 md:p-8 lg:p-12"
        style={{
          backgroundImage: `url(${HeaderBackground})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "800px",
        }}
      >
        {/* Mobile Header with Hamburger Icon */}
       
        {hideHeader ? (
          <HumburgerHeader loading={loading} setLoading={setLoading} />
        ) : (
          <Header
            isVerifyMail={true}
            loading={loading}
            setLoading={setLoading}
            navbar={navbar}
          />
        )}

        {/* Your main content goes here */}
        {/* Your main content goes here */}
        <div
          className={`relative ${
            windowWidth <= 425
              ? "section1-title"
              : windowWidth <= 768
              ? "mt-80"
              : windowWidth <= 1024
              ? "mt-80"
              : windowWidth <= 1440
              ? "mt-80"
              : windowWidth <= 2560
              ? "mt-80"
              : ""
          } flex flex-col ml-4 md:ml-8 lg:ml-12`}
        >
           <SlidingMessages />
          {/* <h2 className="text-[#E3BC3F] text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 leading-tight whitespace-pre-line">
            Play online games
            <br />
            and win a lot of <br />
            bonuses
          </h2>
          <p className="text-white text-base md:text-lg lg:text-xl mt-4 mb-6 whitespace-pre-line">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos error
            quo cum illum, <br />
            alias similique, suscipit nihil tempore.
          </p> */}
          {!isAuth && (
            <div className="flex flex-col md:flex-row gap-4">
              <button
                onClick={() => navigate("/register")}
                className="bg-[#E3BC3F] text-[#363636] px-4 py-2 rounded overflow-hidden z-10"
              >
                SIGNUP
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </button>
              <button
                onClick={() => handleLogin()}
                className="border border-[#E3BC3F] bg-[#01162f] text-white px-4 py-2 rounded mt-4 md:mt-0 z-10"
              >
                SIGNIN
              </button>
            </div>
          )}
        </div>

        {/* ... (unchanged) */}
      </section>
    </>
  );
};

export default Section1;
