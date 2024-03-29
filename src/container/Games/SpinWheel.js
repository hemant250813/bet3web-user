import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Footer } from "../../component/layout";
import { Header, HumburgerHeader } from "../../component/layout";
import GameTitle from "./GameTitle";
import Money from "../../assets/images/games/spinWheel/money.png";
import MoneyBlack from "../../assets/images/games/spinWheel/moneyblack.png";
import HeaderBackground from "../../assets/images/headerBackground.jpg";
import validateSpinWheel from "../../validation/game/spinWheel";
import { getLocalStorageItem } from "../../utils/helper";
import { Win, Lose } from "../../container/Modal/index";
import { bet, userDetail, getSetting } from "../../redux/action";
import { GAME, RESULT } from "../../utils/constants";
import { LoaderMain } from "../../component/commonComponent";

const SpinWheel = ({ navbar }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [error, setError] = useState({});
  const [hideHeader, setHideHeader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [winOpenModal, setWinOpenModal] = useState(false);
  const [loseOpenModal, setLoseOpenModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");

  const user_detail = useSelector((state) => state?.UserDetail?.userDetails);
  const [form, setForm] = useState({
    amount: "",
    balance: user_detail?.data?.balance,
  });
  const setting = useSelector((state) => state?.GetSetting?.setting);

  const isAuth = getLocalStorageItem("token");
  const userData = JSON.parse(getLocalStorageItem("user"));

  const [tabViews, setTabViews] = useState([
    { route: `blue`, isActive: false },
    { route: "red", isActive: false },
  ]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //wheel
  const segments = [
    "blue",
    "red",
    "blue",
    "red",
    "blue",
    "red",
    "blue",
    "red",
    "blue",
    "red",
    "blue",
    "red",
  ];
  const segColors = [
    "#0F75F0",
    "#F20E18",
    "#0F75F0",
    "#F20E18",
    "#0F75F0",
    "#F20E18",
    "#0F75F0",
    "#F20E18",
    "#0F75F0",
    "#F20E18",
    "#0F75F0",
    "#F20E18",
  ];

  let winningSegment = "";
  let primaryColor = "black";
  let primaryColoraround = "#ffffffb4";
  let contrastColor = "white";
  let buttonText = "Spin";
  let isOnlyOnce = false;
  let size = 190;
  let upDuration = 10;
  let downDuration = 500;
  let fontFamily = "proxima-nova";
  let width = 100;
  let height = 100;

  let currentSegment = "";
  let isStarted = false;
  const [isFinished, setFinished] = useState(false);
  let timerHandle = 0;
  const timerDelay = segments.length;
  let angleCurrent = 0;
  let angleDelta = 0;
  let canvasContext = null;
  let maxSpeed = Math.PI / `${segments.length}`;
  const upTime = segments.length * upDuration;
  const downTime = segments.length * downDuration;
  let spinStart = 0;
  let frames = 0;
  const centerX = 300;
  const centerY = 300;
  //wheel

  useEffect(() => {
    dispatch(getSetting({ game: "spin_wheel" }));
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
      navigate("/spin_wheel");
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

  //wheel
  useEffect(() => {
    wheelInit();
    setTimeout(() => {
      window.scrollTo(0, 1);
    }, 0);
  }, []);

  const wheelInit = () => {
    const canvas = initCanvas();
    if (canvas) {
      wheelDraw(canvas);
    }
    // wheelDraw();
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

  const initCanvas = () => {
    let canvas = document.getElementById("canvas");
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.setAttribute("width", width);
      canvas.setAttribute("height", height);
      canvas.setAttribute("id", "canvas");
      document.getElementById("wheel").appendChild(canvas);
    }

    // Check if canvas is supported and context is available

    if (canvas && canvas.getContext) {
      canvasContext = canvas.getContext("2d");
      return canvas;
    } else {
      console.error("Canvas not supported or context not available");
      return null;
    }
  };

  const spin = () => {
    setWinOpenModal(false);
    setLoseOpenModal(false);
    wheelInit();
    isStarted = true;
    // onRotate();
    if (timerHandle === 0) {
      spinStart = new Date().getTime();
      // maxSpeed = Math.PI / ((segments.length*2) + Math.random())
      maxSpeed = Math.PI / segments.length;
      frames = 0;
      timerHandle = setInterval(onTimerTick, timerDelay);
    }
  };

  const onTimerTick = () => {
    frames++;
    draw();
    const duration = new Date().getTime() - spinStart;
    let progress = 0;
    let finished = false;
    if (duration < upTime) {
      progress = duration / upTime;
      angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2);
    } else {
      if (winningSegment) {
        if (currentSegment === winningSegment && frames > segments.length) {
          progress = duration / upTime;
          angleDelta =
            maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
          progress = 1;
        } else {
          progress = duration / downTime;
          angleDelta =
            maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
        }
      } else {
        progress = duration / downTime;
        if (progress >= 0.8) {
          angleDelta =
            (maxSpeed / 1.2) * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
        } else if (progress >= 0.98) {
          angleDelta =
            (maxSpeed / 2) * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
        } else
          angleDelta =
            maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
      }
      if (progress >= 1) finished = true;
    }

    angleCurrent += angleDelta;
    while (angleCurrent >= Math.PI * 2) angleCurrent -= Math.PI * 2;
    if (finished) {
      setFinished(true);
      onFinished(currentSegment);
      clearInterval(timerHandle);
      timerHandle = 0;
      angleDelta = 0;
    }
  };

  const wheelDraw = () => {
    clear();
    drawWheel();
    drawNeedle();
  };

  const draw = () => {
    clear();
    drawWheel();
    drawNeedle();
  };

  const drawSegment = (key, lastAngle, angle) => {
    const ctx = canvasContext;
    const value = segments[key];
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, size, lastAngle, angle, false);
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    ctx.fillStyle = segColors[key];
    ctx.fill();
    ctx.stroke();
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((lastAngle + angle) / 2);
    ctx.fillStyle = contrastColor || "white";
    ctx.font = "bold 1em " + fontFamily;
    ctx.fillText(value.substr(0, 21), size / 2 + 20, 0);
    ctx.restore();
  };

  const drawWheel = () => {
    const ctx = canvasContext;
    if (ctx !== null) {
      let lastAngle = angleCurrent;
      const len = segments.length;
      const PI2 = Math.PI * 2;
      ctx.lineWidth = 1;
      ctx.strokeStyle = primaryColor || "black";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.font = "1em " + fontFamily;
      for (let i = 1; i <= len; i++) {
        const angle = PI2 * (i / len) + angleCurrent;
        drawSegment(i - 1, lastAngle, angle);
        lastAngle = angle;
      }

      // Draw a center circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, 40, 0, PI2, false);
      ctx.closePath();
      ctx.fillStyle = primaryColor || "black";
      ctx.lineWidth = 5;
      ctx.strokeStyle = contrastColor || "white";
      ctx.fill();
      ctx.font = "bold 2em " + fontFamily;
      ctx.fillStyle = contrastColor || "white";
      ctx.textAlign = "center";
      ctx.fillText(buttonText || "Spin", centerX, centerY + 3);
      ctx.stroke();

      // Draw outer circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, size, 0, PI2, false);
      ctx.closePath();
      ctx.lineWidth = 25;
      ctx.strokeStyle = primaryColoraround || "white";
      ctx.stroke();
    }
  };

  const drawNeedle = () => {
    const ctx = canvasContext;
    if (ctx !== null) {
      ctx.lineWidth = 1;
      ctx.strokeStyle = contrastColor || "white";
      ctx.fileStyle = contrastColor || "white";
      ctx.beginPath();
      ctx.moveTo(centerX + 10, centerY - 40);
      ctx.lineTo(centerX - 10, centerY - 40);
      ctx.lineTo(centerX, centerY - 60);
      ctx.closePath();
      ctx.fill();
      const change = angleCurrent + Math.PI / 2;
      let i =
        segments.length -
        Math.floor((change / (Math.PI * 2)) * segments.length) -
        1;
      if (i < 0) i = i + segments.length;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "transparent";
      ctx.font = "bold 1.5em " + fontFamily;
      currentSegment = segments[i];
      isStarted &&
        ctx.fillText(currentSegment, centerX + 10, centerY + size + 50);
    }
  };

  const clear = () => {
    const ctx = canvasContext;
    if (ctx) {
      ctx.clearRect(0, 0, 1000, 800);
    }
  };

  const onFinished = (winner) => {
    if (selectedColor === winner) {
      onSubmit("win");
      setWinOpenModal(true);
      resetHandler();
    } else {
      onSubmit("lose");
      setLoseOpenModal(true);
      resetHandler();
    }
  };

  const onSubmit = (color) => {
    let payload = {
      game: GAME?.SPIN_WHEEL,
    };

    if (color === "win") {
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

  const stopWheel = () => {
    setFinished(true);
    onFinished(currentSegment);
    clearInterval(timerHandle);
    timerHandle = 0;
    angleDelta = 0;
  };

  //wheel

  const tabSwitch = (e, tab) => {
    e.preventDefault();
    const filterTabList = tabViews.map((el) =>
      el.route === tab ? { ...el, isActive: true } : { ...el, isActive: false }
    );
    setTabViews(filterTabList);
    // setIsPaused(true);

    // stopWheel();
    // wheelInit();
  };

  const handleClick = () => {
    const { errors, isValid } = validateSpinWheel(form, tabViews, setting);
    if (isValid) {
      spin();
      setIsPaused(false);
      setIsSubmit(true);
    } else {
      setError(errors);
    }
  };

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
                setLoading={setLoading}
                navbar={navbar}
              />
            )}
            <GameTitle
              title="Play Rock Paper scissors"
              route="rock_paper_scissors"
            />
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
                <div id="wheelCircle">
                  <div
                    //  onClick={() => spin()}
                    id="wheel"
                  >
                    <canvas
                      id="canvas"
                      width="600"
                      height="600"
                      style={{
                        pointerEvents:
                          isFinished && isOnlyOnce ? "none" : "auto",
                      }}
                    />
                  </div>
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
                  className={`flex items-center justify-center relative gap-6 ${
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
                      tabSwitch(e, "blue");
                      setSelectedColor("blue");
                      setError((prevState) => ({
                        ...prevState,
                        ["color"]: "",
                      }));
                      setIsSubmit(false);
                    }}
                    className={`${tabViews[0].isActive && "border p-2"}`}
                  >
                    <img src={MoneyBlack} alt="blue" />
                  </span>
                  <span
                    onClick={(e) => {
                      tabSwitch(e, "red");
                      setSelectedColor("red");
                      setError((prevState) => ({
                        ...prevState,
                        ["color"]: "",
                      }));
                      setIsSubmit(false);
                    }}
                    className={`${tabViews[1].isActive && "border p-2"}`}
                  >
                    <img src={Money} alt="red" />
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center text-rose-600 font-serif mt-1">
                  {error?.color}
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
            />
          )}
          {loseOpenModal && (
            <Lose
              loseOpenModal={loseOpenModal}
              setLoseOpenModal={setLoseOpenModal}
            />
          )}
        </>
      )}
    </>
  );
};
export default SpinWheel;
