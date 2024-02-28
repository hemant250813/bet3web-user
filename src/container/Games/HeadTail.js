import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Header, HumburgerHeader, Footer } from "../../component/layout";
import GameTitle from "./GameTitle";
import Head from "../../assets/images/games/headAndTail/head.png";
import Tail from "../../assets/images/games/headAndTail/tail.png";
import validateHeadtail from "../../validation/game/headTail";
import HeaderBackground from "../../assets/images/headerBackground.jpg";
import { getLocalStorageItem } from "../../utils/helper";
import { Win, Lose } from "../../container/Modal/index";
import { bet, userDetail, getSetting } from "../../redux/action";
import { GAME, RESULT } from "../../utils/constants";
import { LoaderMain } from "../../component/commonComponent";

const HeadTail = ({ navbar }) => {
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [hideHeader, setHideHeader] = useState(false);
  const [clearRollingInterval, setClearRollingInterval] = useState(0);
  const [clearRollingTimeout, setClearRollingTimeout] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isRotating, setIsRotating] = useState(true);
  const [tabViews, setTabViews] = useState([
    { route: "heads", isActive: false },
    { route: `tails`, isActive: false },
  ]);
  const [clearCoinRotate, setClearCoinRotate] = useState(0);
  const [flipResult, setFlipResult] = useState(null);
  const [winOpenModal, setWinOpenModal] = useState(false);
  const [loseOpenModal, setLoseOpenModal] = useState(false);

  const isAuth = getLocalStorageItem("token");
  const userData = JSON.parse(getLocalStorageItem("user"));
  const user_detail = useSelector((state) => state?.UserDetail?.userDetails);
  const [form, setForm] = useState({
    amount: "",
    balance: user_detail?.data?.balance,
  });
  const setting = useSelector((state) => state?.GetSetting?.setting);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSetting({ game: "head_tail" }));
    dispatch(userDetail());
  }, []);

  useEffect(() => {
    setForm((prevState) => ({
      ...prevState,
      ["balance"]: user_detail?.data?.balance,
    }));
  }, [user_detail]);

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

    if (tab === "heads") {
      setRotationAngle(0);
    } else {
      setRotationAngle(180);
    }
    setIsRotating(false);
  };

  const changeHandler = (e) => {
    setWinOpenModal(false);
    setLoseOpenModal(false);
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

  const onSubmit = (coin) => {
    let payload = {
      game: GAME?.HEAD_TAIL,
    };

    if (coin === "win") {
      let pl = (parseInt(form.amount) * setting?.odd) / 100;
      payload = {
        ...payload,
        amount: parseInt(pl),
        result: RESULT?.WIN,
        invest: parseInt(form.amount),
      };
    } else {
      payload = {
        ...payload,
        amount: -parseInt(form.amount),
        result: RESULT?.LOSE,
        invest: parseInt(form.amount),
      };
    }
    dispatch(
      bet({
        payload,
        callback: async (data) => {
          if (data) {
            setIsSubmit(false);
          }
        },
      })
    );
  };

  const resetHandler = (e) => {
    setForm((prevState) => ({
      ...prevState,
      ["amount"]: "",
    }));
    setForm((prevState) => ({
      ...prevState,
      ["balance"]: form?.balance - form?.amount,
    }));
    dispatch(userDetail());
  };

  const handleClick = () => {
    setWinOpenModal(false);
    setLoseOpenModal(false);
    const { errors, isValid } = validateHeadtail(form, tabViews, setting);
    if (isValid) {
      handleCoinClick();
      setIsSubmit(true);
      // setIsRotating(true);
      // setTimeout(generateRandomBoolean, 4000); // 40 seconds delay
    } else {
      setError(errors);
    }
  };

  const handleCoinClick = () => {
    setFlipResult("");
    clearInterval(clearCoinRotate);
    let result = "";
    let coinRotate = setInterval(() => {
      const newFlipResult = Math.random();
      result = newFlipResult <= 0.5 ? "heads" : "tails";
      setFlipResult(result);
    }, 500);

    setClearCoinRotate(coinRotate);
    setTimeout(() => {
      clearInterval(coinRotate);
      if (tabViews[0].isActive) {
        if (tabViews[0].route === result) {
          setWinOpenModal(true);
          onSubmit("win");
          resetHandler();
        } else {
          setLoseOpenModal(true);
          onSubmit("lose");
          resetHandler();
        }
      } else {
        if (tabViews[1].route === result) {
          setWinOpenModal(true);
          onSubmit("win");
          resetHandler();
        } else {
          setLoseOpenModal(true);
          onSubmit("lose");
          resetHandler();
        }
      }
    }, 7000);
  };
  console.log("isSubmit", isSubmit);
  return (
    <>
      {loading ? (
        <LoaderMain />
      ) : (
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
              <HumburgerHeader setLoading={setLoading} />
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
                  // onClick={handleCoinClick}
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
                          : "text-4xl"
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
                          : "text-4xl"
                      }  text-[#3F93F9]`}
                    >
                      {" "}
                      {form?.balance?.toFixed(2)} USD
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
                          const value = e.target.value;
                          const { name } = e.target;
                          let finalAmount = user_detail?.data?.balance - value;

                          if (value <= user_detail?.data?.balance) {
                            setForm((prevState) => ({
                              ...prevState,
                              [name]: value,
                            }));

                            setForm((prevState) => ({
                              ...prevState,
                              ["balance"]: finalAmount,
                            }));
                          }

                          setIsSubmit(false);
                          setError((prevState) => ({
                            ...prevState,
                            [name]: "",
                          }));
                        }}
                        className="border p-2 focus:outline-none focus:border-blue-500 bg-[#020C25] text-white w-full"
                        style={{ height: "2rem" }}
                      />
                      <span
                        className="bg-[#3F93F9] text-[#fff] flex items-center px-2 rounded-r-sm outline-none"
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
                    Minimum : {setting?.min?.toFixed(2)} USD | Maximum :{" "}
                    {setting?.max?.toFixed(2)} USD | Win Amount{" "}
                    {setting?.odd?.toFixed(2)} %
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
                      tabSwitch(e, "heads");
                      setError((prevState) => ({
                        ...prevState,
                        ["coin"]: "",
                      }));
                      setIsSubmit(false);
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
                      alt="heads"
                    />
                  </span>
                  <span
                    onClick={(e) => {
                      tabSwitch(e, "tails");
                      setError((prevState) => ({
                        ...prevState,
                        ["coin"]: "",
                      }));
                      setIsSubmit(false);
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
                      alt="tails"
                    />
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center text-rose-600 font-serif mt-1">
                  {error?.coin}
                </div>
                <div className="flex flex-col items-center justify-center w-11/12 p-2">
                  <button
                    onClick={() => handleClick()}
                    disabled={isSubmit}
                    className={`${
                      isSubmit ? "bg-[#716e60]" : "bg-[#3F93F9]"
                    }  p-4 w-9/12 text-[#fff]`}
                  >
                    Play Now
                  </button>
                  <span className="text-white">Game Instruction</span>
                </div>
              </div>
            </div>
          </section>
          <Footer />
          {winOpenModal && (
            <Win
              winOpenModal={winOpenModal}
              setWinOpenModal={setWinOpenModal}
              flipResult={flipResult}
            />
          )}
          {loseOpenModal && (
            <Lose
              loseOpenModal={loseOpenModal}
              setLoseOpenModal={setLoseOpenModal}
              flipResult={flipResult}
            />
          )}
        </>
      )}
    </>
  );
};
export default HeadTail;
