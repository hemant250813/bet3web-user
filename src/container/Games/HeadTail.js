import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header, HumburgerHeader, Footer } from "../../component/layout";
import GameTitle from "./GameTitle";
import Head from "../../assets/images/games/headAndTail/head.png";
import Tail from "../../assets/images/games/headAndTail/tail.png";
import validateAmount from "../../validation/user/amount";
import HeaderBackground from "../../assets/images/headerBackground.jpg";
import { getLocalStorageItem } from "../../utils/helper";

const HeadTail = ({navbar}) => {
  const [form, setForm] = useState({
    amount: "",
  });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [hideHeader, setHideHeader] = useState(false);
  const [clearRollingInterval, setClearRollingInterval] = useState(0);
  const [clearRollingTimeout, setClearRollingTimeout] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isRotating, setIsRotating] = useState(true);
  const [tabViews, setTabViews] = useState([
    { route: "head", isActive: false },
    { route: `tail`, isActive: false },
  ]);
  const [flipResult, setFlipResult] = useState(null);

  const isAuth = getLocalStorageItem("token");
  const userData = JSON.parse(getLocalStorageItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (windowWidth <= 768) {
      setHideHeader(true);
    } else {
      setHideHeader(false);
    }
    
    if (isAuth && userData) {
      navigate("/head_tail");
    } else {
      navigate("/");
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
      clearInterval(clearRollingInterval);
      clearTimeout(clearRollingTimeout);
    };
  }, [windowWidth, windowHeight]);

  const handleToggleRotation = () => {
    setRotationAngle(180);
    setIsRotating((prevIsRotating) => !prevIsRotating);
  };

  const tabSwitch = (e, tab) => {
    e.preventDefault();
    const filterTabList = tabViews.map((el) =>
      el.route === tab ? { ...el, isActive: true } : { ...el, isActive: false }
    );
    setTabViews(filterTabList);

    if (tab === "head") {
      setRotationAngle(0);
    } else {
      setRotationAngle(180);
    }
    setIsRotating(false);
  };

  const changeHandler = (e) => {
    if (e.target) {
      const value = e.target.value;
      const { name } = e.target;
      setError((prevState) => ({
        ...prevState,
        [name]: "",
      }));
      setForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const generateRandomBoolean = () => {
    const randomBoolean = Math.random() < 0.5; // true or false with 50% probability
    setIsRotating(false);
    if (randomBoolean) {
      if (tabViews[0].isActive) {
        setRotationAngle(0);
      } else {
        setRotationAngle(180);
      }
    } else {
      if (tabViews[0].isActive) {
        setRotationAngle(180);
      } else {
        setRotationAngle(0);
      }
    }
  };

  const handleClick = () => {
    const { errors, isValid } = validateAmount(form);
    if (isValid) {
      setIsRotating(true);
      setTimeout(generateRandomBoolean, 4000); // 40 seconds delay
    } else {
      setError(errors);
    }
  };

  const handleCoinClick = () => {
    setFlipResult(null);

    let coinRotate = setInterval(() => {
      const newFlipResult = Math.random();
      setFlipResult(newFlipResult <= 0.5 ? "heads" : "tails");
    }, 1000);

    setTimeout(() => {
      clearInterval(coinRotate);
    }, 6000);
  };

  return (
    <>
      <section
        className="relative flex-grow p-4 md:p-8 lg:p-12"
        style={{
          backgroundImage: `url(${HeaderBackground})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "400px",
          display: "flex", // Add these styles
          justifyContent: "center", // to center horizontally
          alignItems: "center", // and vertically
        }}
      >
        {/* Mobile Header with Hamburger Icon */}
        {hideHeader ? (
          <HumburgerHeader setLoading={setLoading}/>
        ) : (
          <Header
            isVerifyMail={false}
            loading={loading}
            setLoading={setLoading}
            navbar={navbar}
          />
        )}
        <GameTitle title="Play Head & Tail" route="head_tail" />
      </section>

      <section
        className={`bg-black relative flex-grow p-12 md:p-8 lg:p-12 overflow-hidden`}
      >
        <div
          className={`grid justify-items-stretch grid-cols-1 gap-8 ${
            windowWidth === 320
              ? "grid-cols-1"
              : windowWidth === 1440
              ? "grid-cols-2"
              : "grid-cols-2"
          }`}
        >
          {/* Card 1 */}
          <div
            className="relative group mx-auto border border-gray-400 p-4"
            style={{
              height:
                windowWidth === 320
                  ? "250px"
                  : windowWidth === 375
                  ? "300px"
                  : windowWidth === 425
                  ? "300px"
                  : windowWidth === 768
                  ? "650px"
                  : windowWidth === 1024
                  ? "650px"
                  : windowWidth === 1440
                  ? "700px"
                  : "700px",
              width:
                windowWidth === 320
                  ? "250px"
                  : windowWidth === 375
                  ? "300px"
                  : windowWidth === 425
                  ? "300px"
                  : windowWidth === 768
                  ? "650px"
                  : windowWidth === 1024
                  ? "850px"
                  : windowWidth === 1440
                  ? "640px"
                  : "700px",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              perspective: "1000px",
            }}
          >
            {/* <div
              className="coin"
              style={{
                width: "300px",
                height: "300px",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                transform: `rotateY(${rotationAngle}deg)`,
                transformStyle: "preserve-3d",
                animation: isRotating ? "rotate .5s linear infinite" : "none",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${Head})`,
                  backfaceVisibility: "hidden",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${Tail})`,
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              ></div>
            </div> */}

            <div
              id="coin"
              className={flipResult}
              onClick={handleCoinClick}
              style={{
                width:
                  windowWidth === 320
                    ? "200px"
                    : windowWidth === 375
                    ? "220px"
                    : windowWidth === 425
                    ? "220px"
                    : windowWidth === 768
                    ? "420px"
                    : windowWidth === 1024
                    ? "520px"
                    : windowWidth === 1440
                    ? "560px"
                    : "300px",
                height:
                  windowWidth === 320
                    ? "200px"
                    : windowWidth === 375
                    ? "220px"
                    : windowWidth === 425
                    ? "220px"
                    : windowWidth === 768
                    ? "420px"
                    : windowWidth === 1024
                    ? "520px"
                    : windowWidth === 1440
                    ? "560px"
                    : "300px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${Head})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backfaceVisibility: "hidden",
                }}
                className="side-a"
              ></div>
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${Tail})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
                className="side-b"
              ></div>
            </div>
          </div>

          {/* Card 2 */}
          <div
            className="relative group mx-auto border border-gray-400 p-4"
            style={{
              height: "700px",
              width:
                windowWidth === 320
                  ? "250px"
                  : windowWidth === 375
                  ? "300px"
                  : windowWidth === 425
                  ? "300px"
                  : windowWidth === 768
                  ? "650px"
                  : windowWidth === 1024
                  ? "850px"
                  : windowWidth === 1440
                  ? "650px"
                  : "700px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column", // Display children in a column
              justifyContent: "center",
              alignItems: "center",
              perspective: "1000px",
            }}
          >
            <div className="flex flex-col items-center justify-center p-3">
              <span className="flex items-center justify-center">
                <p
                  className={`${
                    windowWidth === 320
                      ? "text-xs"
                      : windowWidth === 375
                      ? "text-sm"
                      : windowWidth === 425
                      ? "text-base"
                      : windowWidth === 768
                      ? "text-3xl"
                      : windowWidth === 1024
                      ? "text-5xl"
                      : windowWidth === 1440
                      ? "text-3xl"
                      : "text-5xl"
                  }  text-white`}
                >
                  Current Balance :
                </p>
                <p
                  className={`${
                    windowWidth === 320
                      ? "text-xs"
                      : windowWidth === 375
                      ? "text-sm"
                      : windowWidth === 425
                      ? "text-base"
                      : windowWidth === 768
                      ? "text-3xl"
                      : windowWidth === 1024
                      ? "text-5xl"
                      : windowWidth === 1440
                      ? "text-3xl"
                      : "text-5xl"
                  }  text-[#E3BC3F]`}
                >
                  {" "}
                  10.50 USD
                </p>
              </span>
              <div className="flex flex-col items-center w-11/12 mt-3">
                <div className="flex w-9/12">
                  <input
                    type="text"
                    placeholder="Amount"
                    name="amount"
                    value={form?.amount}
                    onChange={(e) => {
                      changeHandler(e);
                    }}
                    className="border p-2 focus:outline-none focus:border-blue-500 bg-[#020C25] text-white w-full"
                    style={{ height: "2rem" }}
                  />
                  <span
                    className="bg-[#E3BC3F] text-black flex items-center px-2 rounded-r-sm outline-none"
                    style={{ height: "2rem" }}
                  >
                    USD
                  </span>
                </div>
                <div className="text-rose-600 font-serif mt-1">
                  {error?.amount}
                </div>
              </div>
              <span className="text-[#adb5bd] mt-3">
                Minimum : 1.00 USD | Maximum : 100.00 USD | Win Amount 150.00 %
              </span>
            </div>
            <div></div>
            <div
              className={`flex items-center justify-center relative ${
                windowWidth === 320
                  ? "p-2"
                  : windowWidth === 375
                  ? "p-4"
                  : windowWidth === 425
                  ? "p-8"
                  : windowWidth === 1024
                  ? "p-16"
                  : windowWidth === 1440
                  ? "p-16"
                  : "p-20"
              }`}
            >
              <span
                onClick={(e) => {
                  tabSwitch(e, "head");
                }}
                className={`${tabViews[0].isActive && "border p-2"}`}
              >
                <img
                  src={Head}
                  width={
                    windowWidth === 1024
                      ? 200
                      : windowWidth === 1440
                      ? 300
                      : 100
                  }
                  height={
                    windowWidth === 1024
                      ? 200
                      : windowWidth === 1440
                      ? 300
                      : 100
                  }
                  alt="head"
                />
              </span>
              <span
                onClick={(e) => {
                  tabSwitch(e, "tail");
                }}
                className={`${tabViews[1].isActive && "border p-2"}`}
              >
                <img
                  src={Tail}
                  width={
                    windowWidth === 1024
                      ? 200
                      : windowWidth === 1440
                      ? 300
                      : 100
                  }
                  height={
                    windowWidth === 1024
                      ? 200
                      : windowWidth === 1440
                      ? 300
                      : 100
                  }
                  alt="tail"
                />
              </span>
            </div>
            <div className="flex flex-col items-center justify-center w-11/12 p-2">
              <button
                onClick={() => handleClick()}
                className="bg-[#E3BC3F] p-4 w-9/12"
              >
                Play Now
              </button>
              <span className="text-white">Game Instruction</span>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
export default HeadTail;
