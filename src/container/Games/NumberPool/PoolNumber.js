import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Header, HumburgerHeader, Footer } from "../../../component/layout";
import GameTitle from "../GameTitle";
import validateNumberPool from "../../../validation/game/numberPool";
import Ball1 from "../../../assets/images/games/ball/ball01.png";
import Ball2 from "../../../assets/images/games/ball/ball02.png";
import Ball3 from "../../../assets/images/games/ball/ball03.png";
import Ball4 from "../../../assets/images/games/ball/ball04.png";
import Ball5 from "../../../assets/images/games/ball/ball05.png";
import Ball6 from "../../../assets/images/games/ball/ball06.png";
import Ball7 from "../../../assets/images/games/ball/ball07.png";
import Ball8 from "../../../assets/images/games/ball/ball08.png";
import HeaderBackground from "../../../assets/images/headerBackground.jpg";
import { getLocalStorageItem } from "../../../utils/helper";
import { Win, Lose } from "../../../container/Modal/index";
import { bet, userDetail, getSetting } from "../../../redux/action";
import { GAME, RESULT } from "../../../utils/constants";

const PoolNumber = ({ navbar }) => {
  const [form, setForm] = useState({
    amount: "",
  });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [intervalIdBall, setIntervalIdBall] = useState(0);
  const [randomBall, setRandomBall] = useState(0);
  const [error, setError] = useState({});
  const [hideHeader, setHideHeader] = useState(false);
  const [pause, setPause] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedBall, setSelectedBall] = useState(0);
  const [winOpenModal, setWinOpenModal] = useState(false);
  const [loseOpenModal, setLoseOpenModal] = useState(false);
  const [tabViews, setTabViews] = useState([
    { route: "ball1", isActive: false },
    { route: `ball2`, isActive: false },
    { route: `ball3`, isActive: false },
    { route: "ball4", isActive: false },
    { route: `ball5`, isActive: false },
    { route: `ball6`, isActive: false },
    { route: `ball7`, isActive: false },
    { route: "ball8", isActive: false },
  ]);

  const [poolBall, setPoolBall] = useState([
    { ball: 3, color: "red", position: { x: 0, y: 0 } },
    { ball: 9, color: "yellow-striped", position: { x: 0, y: 0 } },
    { ball: 14, color: "green-striped", position: { x: 0, y: 0 } },
    { ball: 15, color: "brown-striped", position: { x: 0, y: 0 } },
    { ball: 8, color: "black", position: { x: 0, y: 0 } },
    { ball: 12, color: "purple-striped", position: { x: 0, y: 0 } },
    { ball: 10, color: "blue-striped", position: { x: 0, y: 0 } },
    { ball: 5, color: "orange", position: { x: 0, y: 0 } },
    { ball: 6, color: "green", position: { x: 0, y: 0 } },
    { ball: 2, color: "blue", position: { x: 0, y: 0 } },
    { ball: 13, color: "orange-striped", position: { x: 0, y: 0 } },
    { ball: 1, color: "yellow", position: { x: 0, y: 0 } },
    { ball: 4, color: "purple", position: { x: 0, y: 0 } },
    { ball: 11, color: "red-striped", position: { x: 0, y: 0 } },
    { ball: 7, color: "brown", position: { x: 0, y: 0 } },
  ]);
  const user_detail = useSelector((state) => state?.UserDetail?.userDetails);
  const setting = useSelector((state) => state?.GetSetting?.setting);

  const isAuth = getLocalStorageItem("token");
  const userData = JSON.parse(getLocalStorageItem("user"));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSetting({ game: "number_pool" }));
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
      navigate("/number_pool");
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
    };
  }, [windowWidth, windowHeight]);

  useEffect(() => {
    const intervalId = setInterval(() => moveBalls(), 300);
    setIntervalIdBall(intervalId);
    // Cleanup the interval on component unmount
    return () => {
      clearInterval(intervalId);
      clearInterval(intervalIdBall);
    };
  }, []);

  const tabSwitch = (e, tab) => {
    e.preventDefault();
    const filterTabList = tabViews.map((el) =>
      el.route === tab ? { ...el, isActive: true } : { ...el, isActive: false }
    );
    setTabViews(filterTabList);
    setError((prevState) => ({
      ...prevState,
      ["ball"]: "",
    }));
  };

  const changeHandler = (e) => {
    clearInterval(intervalIdBall);
    const intervalId = setInterval(() => moveBalls(), 300);
    setIntervalIdBall(intervalId);
    setPause(false);
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
    clearInterval(intervalIdBall);
    // Generate a random number between 1 and 15
    const randomNumber = Math.floor(Math.random() * 15) + 1;
    setRandomBall(randomNumber);
    setIsSubmit(false);
  
    clearInterval(intervalIdBall);
    setPause(true);
    setForm((prevState) => ({
      ...prevState,
      ["amount"]: "",
    }));
    console.log("randomBall", randomNumber);
    console.log("selectedBall", selectedBall);
    console.log("check", [1, 2, 3, 4, 5, 6, 7, 8]?.includes(randomNumber));
    if (randomNumber === selectedBall) {
      setWinOpenModal(true);
      let pl = (parseInt(form.amount) * setting?.odd[0]) / 100;
      onSubmit("win", pl);
    } else {
      if ([1, 2, 3, 4, 5, 6, 7, 8]?.includes(randomNumber)) {
        let pl = (parseInt(form.amount) * 100) / 100;
        setWinOpenModal(true);
        onSubmit("win", pl);
      } else {
        setLoseOpenModal(true);
        let pl = -parseInt(form.amount);
        onSubmit("lose", pl);
      }
    }
  };

  const handleClick = () => {
    const { errors, isValid } = validateNumberPool(form, tabViews, setting);
    if (isValid) {
      setPause(false);
      setIsSubmit(true);
      const intervalId = setInterval(() => moveBalls(), 50); // 2000 milliseconds = 2 seconds
      setIntervalIdBall(intervalId);
      setTimeout(generateRandomBoolean, 6000); // 40 seconds delay
    } else {
      setError(errors);
    }
  };
  // console.log("randomBall",randomBall);
  const moveBalls = () => {
    const randomX = () => Math.random() * 200 - 100; // Function to generate random X coordinate
    const randomY = () => Math.random() * 200 - 100; // Function to generate random Y coordinate

    // Update the position of each ball by updating its state
    setPoolBall((prevState) =>
      prevState.map((ball) => ({
        ...ball,
        position: { x: randomX(), y: randomY() }, // Update ball position
      }))
    );
  };

  const onSubmit = (ball, pl) => {
    let payload = {
      game: GAME?.NUMBER_POOL,
    };
    if (ball === "win") {
      payload = {
        ...payload,
        amount: parseInt(pl),
        result: RESULT?.WIN,
        invest: parseInt(form.amount),
      };
    } else {
      payload = {
        ...payload,
        amount: pl,
        result: RESULT?.LOSE,
        invest: parseInt(form.amount),
      };
    }
    dispatch(
      bet({
        payload,
        callback: async (data) => {
          if (data) {
            dispatch(userDetail());
          }
        },
      })
    );
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
          <HumburgerHeader setLoading={setLoading} />
        ) : (
          <Header
            isVerifyMail={false}
            setLoading={setLoading}
            navbar={navbar}
          />
        )}
        <GameTitle title="Play Pool Number" route="number_pool" />
      </section>

      <section
        className={`bg-black relative flex-grow p-12 md:p-8 lg:p-12 overflow-hidden`}
      >
        <div
          className={`grid justify-items-stretch gap-8 ${
            windowWidth === 320
              ? "grid-cols-1"
              : windowWidth === 1440
              ? "grid-cols-2"
              : windowWidth === 1024
              ? "grid-cols-1"
              : windowWidth === 768
              ? "grid-cols-1"
              : windowWidth === 425
              ? "grid-cols-1"
              : windowWidth === 375
              ? "grid-cols-1"
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
            {pause ? (
              <div className="grid-container">
                <div
                  className={`${
                    randomBall === 3
                      ? "ball-red"
                      : randomBall === 9
                      ? "ball-yellow-striped"
                      : randomBall === 14
                      ? "ball-green-striped"
                      : randomBall === 15
                      ? "ball-brown-striped"
                      : randomBall === 8
                      ? "ball-black"
                      : randomBall === 12
                      ? "ball-purple-striped"
                      : randomBall === 10
                      ? "ball-blue-striped"
                      : randomBall === 5
                      ? "ball-orange"
                      : randomBall === 6
                      ? "ball-green"
                      : randomBall === 2
                      ? "ball-blue"
                      : randomBall === 13
                      ? "ball-orange-striped"
                      : randomBall === 1
                      ? "ball-yellow"
                      : randomBall === 4
                      ? "ball-purple"
                      : randomBall === 11
                      ? "ball-red-striped"
                      : "ball-brown"
                  } win-ball p-2`}
                >
                  <span className="win-ball-number">{randomBall}</span>
                </div>
              </div>
            ) : (
              <div className="grid-container">
                <div className="grid grid-cols-4 gap-8">
                  {poolBall?.map((ball, index) => (
                    <div
                      key={index}
                      className={`ball ball-${ball?.color} p-2`}
                      style={{
                        transform: `translate(${ball.position.x}px, ${ball.position.y}px)`,
                      }}
                    >
                      <span className="ball-number">{ball?.ball}</span>
                    </div>
                  ))}
                </div>
              </div>

              // <div className="grid-container">
              //   <div className="grid grid-cols-4 gap-8">
              //     <div className="ball ball-red p-2">
              //       <span className="ball-number">3</span>
              //     </div>
              //     <div className="ball ball-yellow-striped p-2">
              //       <span className="ball-number">9</span>
              //     </div>
              //     <div className="ball ball-green-striped p-2">
              //       <span className="ball-number">14</span>
              //     </div>
              //     <div className="ball ball-brown-striped p-2">
              //       <span className="ball-number">15</span>
              //     </div>

              //     <div className="ball ball-black p-2">
              //       <span className="ball-number">8</span>
              //     </div>
              //     <div className="ball ball-purple-striped p-2">
              //       <span className="ball-number">12</span>
              //     </div>
              //     <div className="ball ball-blue-striped p-2">
              //       <span className="ball-number">10</span>
              //     </div>
              //     <div className="ball ball-orange p-2">
              //       <span className="ball-number">5</span>
              //     </div>
              //     <div className="ball ball-green p-2">
              //       <span className="ball-number">6</span>
              //     </div>
              //     <div className="ball ball-blue p-2">
              //       <span className="ball-number">2</span>
              //     </div>
              //     <div className="ball ball-orange-striped p-2">
              //       <span className="ball-number">13</span>
              //     </div>
              //     <div className="ball ball-yellow p-2">
              //       <span className="ball-number">1</span>
              //     </div>
              //     <div className="ball ball-purple p-2">
              //       <span className="ball-number">4</span>
              //     </div>
              //     <div className="ball ball-red-striped p-2">
              //       <span className="ball-number">11</span>
              //     </div>
              //     <div className="ball ball-brown p-2">
              //       <span className="ball-number">7</span>
              //     </div>
              //   </div>
              // </div>
            )}
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
                      : windowWidth === 1850
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
                      : windowWidth === 1850
                      ? "text-3xl"
                      : "text-4xl"
                  }  text-[#E3BC3F]`}
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
                Minimum : 1.00 USD | Maximum : 100.00 USD | Win Amount 150.00
                (exact match) % | Win Amount 100.00 (match within 8 ball)%
              </span>
            </div>
            <div></div>
            <div
              className={`flex items-center justify-center relative pt-4 gap-4 ${
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
                  tabSwitch(e, "ball1");
                  setSelectedBall(1);
                }}
                className={`${tabViews[0].isActive && "border p-2"}`}
              >
                <img src={Ball1} alt="Ball1" width={120} height={120} />
              </span>
              <span
                onClick={(e) => {
                  tabSwitch(e, "ball2");
                  setSelectedBall(2);
                }}
                className={`${tabViews[1].isActive && "border p-2"}`}
              >
                <img src={Ball2} alt="Ball2" width={120} height={120} />
              </span>
              <span
                onClick={(e) => {
                  tabSwitch(e, "ball3");
                  setSelectedBall(3);
                }}
                className={`${tabViews[2].isActive && "border p-2"}`}
              >
                <img src={Ball3} alt="Ball3" width={120} height={120} />
              </span>
              <span
                onClick={(e) => {
                  tabSwitch(e, "ball4");
                  setSelectedBall(4);
                }}
                className={`${tabViews[3].isActive && "border p-2"}`}
              >
                <img src={Ball4} alt="Ball4" width={120} height={120} />
              </span>
            </div>
            <div className="flex items-center justify-center relative pb-4 gap-4">
              <span
                onClick={(e) => {
                  tabSwitch(e, "ball5");
                  setSelectedBall(5);
                }}
                className={`${tabViews[4].isActive && "border p-2"}`}
              >
                <img src={Ball5} alt="Ball5" width={120} height={120} />
              </span>
              <span
                onClick={(e) => {
                  tabSwitch(e, "ball6");
                  setSelectedBall(6);
                }}
                className={`${tabViews[5].isActive && "border p-2"}`}
              >
                <img src={Ball6} alt="Ball6" width={120} height={120} />
              </span>
              <span
                onClick={(e) => {
                  tabSwitch(e, "ball7");
                  setSelectedBall(7);
                }}
                className={`${tabViews[6].isActive && "border p-2"}`}
              >
                <img src={Ball7} alt="Ball7" width={120} height={120} />
              </span>
              <span
                onClick={(e) => {
                  tabSwitch(e, "ball8");
                  setSelectedBall(8);
                }}
                className={`${tabViews[7].isActive && "border p-2"}`}
              >
                <img src={Ball8} alt="Ball8" width={120} height={120} />
              </span>
            </div>
            <div className="flex flex-col items-center justify-center text-rose-600 font-serif mt-1">
              {error?.ball}
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
        <Win winOpenModal={winOpenModal} setWinOpenModal={setWinOpenModal}  keno={false}/>
      )}
      {loseOpenModal && (
        <Lose
          loseOpenModal={loseOpenModal}
          setLoseOpenModal={setLoseOpenModal}
          keno={false}
        />
      )}
    </>
  );
};
export default PoolNumber;
