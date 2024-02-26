import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Footer } from "../../component/layout";
import { Header, HumburgerHeader } from "../../component/layout";
import GameTitle from "./GameTitle";
import Rock from "../../assets/images/games/rockPaperScissors/rock.png";
import Paper from "../../assets/images/games/rockPaperScissors/paper.png";
import Scissors from "../../assets/images/games/rockPaperScissors/scissors.png";
import validateRockPaperScissors from "../../validation/game/RockPaperScissors";
import HeaderBackground from "../../assets/images/headerBackground.jpg";
import { getLocalStorageItem } from "../../utils/helper";
import { bet, userDetail, getSetting } from "../../redux/action";
import { GAME, RESULT } from "../../utils/constants";
import { Win, Lose } from "../../container/Modal/index";

const RockPaperScissors = ({ navbar }) => {
  const images = [Rock, Paper, Scissors];
  const [error, setError] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [loading, setLoading] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const [winOpenModal, setWinOpenModal] = useState(false);
  const [loseOpenModal, setLoseOpenModal] = useState(false);

  const [tabViews, setTabViews] = useState([
    { route: "rock", isActive: false },
    { route: `paper`, isActive: false },
    { route: `scissor`, isActive: false },
  ]);

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
    dispatch(getSetting({ game: "rock_paper_scissors" }));
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
      navigate("/rock_paper_scissors");
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

  const tabSwitch = (e, tab) => {
    e.preventDefault();
    const filterTabList = tabViews.map((el) =>
      el.route === tab ? { ...el, isActive: true } : { ...el, isActive: false }
    );
    setTabViews(filterTabList);
    setIsPaused(true);

    if (tab === "rock") {
      setCurrentImageIndex(0);
      setSelectedImageIndex(0);
    } else if (tab === "paper") {
      setCurrentImageIndex(1);
      setSelectedImageIndex(1);
    } else {
      setCurrentImageIndex(2);
      setSelectedImageIndex(2);
    }
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

  useEffect(() => {
    let intervalId;

    const handleAnimation = () => {
      if (!isPaused) {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
    };

    intervalId = setInterval(handleAnimation, 500); // Change the duration as needed (2000ms = 2 seconds)

    return () => clearInterval(intervalId);
  }, [isPaused, images.length]);

  const generateRandomBoolean = () => {
    setIsPaused(true);
    if (selectedImageIndex === currentImageIndex) {
      onSubmit("win");
      setWinOpenModal(true);
      resetHandler();
    } else {
      onSubmit("lose");
      setLoseOpenModal(true);
      resetHandler();
    }
  };

  const onSubmit = (hand) => {
    let payload = {
      game: GAME?.ROCK_PAPER_SCISSORS,
    };

    if (hand === "win") {
      let pl = (parseInt(form.amount) * (setting?.odd) / 100);
      payload = {
        ...payload,
        amount: parseInt(pl),
        result: RESULT?.WIN,
      };
    } else {
      payload = {
        ...payload,
        amount: -parseInt(form.amount),
        result: RESULT?.LOSE,
      };
    }
    dispatch(
      bet({
        payload,
        callback: async (data) => {
          if (data) {
          }
        },
      })
    );
  };

  const handleClick = () => {
    setWinOpenModal(false);
    setLoseOpenModal(false);
    const { errors, isValid } = validateRockPaperScissors(
      form,
      tabViews,
      setting
    );
    if (isValid) {
      setIsPaused(false);
      setTimeout(generateRandomBoolean, 6000); // 40 seconds delay
    } else {
      setError(errors);
    }
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
            <img
              src={images[currentImageIndex]}
              alt={`Image ${currentImageIndex + 1}`}
              style={{ width: "100%", height: "100%" }}
            />
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
                  } text-white`}
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
                  } text-[#E3BC3F]`}
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
                Minimum : {setting?.min?.toFixed(2)} USD | Maximum :{" "}
                {setting?.max?.toFixed(2)} USD | Win Amount {setting?.odd?.toFixed(2)} %
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
                  tabSwitch(e, "rock");
                  setError((prevState) => ({
                    ...prevState,
                    ["hand"]: "",
                  }));
                }}
                className={`${tabViews[0].isActive && "border p-2"}`}
              >
                <img src={Rock} alt="head" />
              </span>
              <span
                onClick={(e) => {
                  tabSwitch(e, "paper");
                  setError((prevState) => ({
                    ...prevState,
                    ["hand"]: "",
                  }));
                }}
                className={`${tabViews[1].isActive && "border p-2"}`}
              >
                <img src={Paper} alt="tail" />
              </span>
              <span
                onClick={(e) => {
                  tabSwitch(e, "scissor");
                  setError((prevState) => ({
                    ...prevState,
                    ["hand"]: "",
                  }));
                }}
                className={`${tabViews[2].isActive && "border p-2"}`}
              >
                <img src={Scissors} alt="scissors" />
              </span>
            </div>
            <div className="flex flex-col items-center justify-center text-rose-600 font-serif mt-1">
              {error?.hand}
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
      {winOpenModal && (
        <Win winOpenModal={winOpenModal} setWinOpenModal={setWinOpenModal} />
      )}
      {loseOpenModal && (
        <Lose
          loseOpenModal={loseOpenModal}
          setLoseOpenModal={setLoseOpenModal}
        />
      )}
    </>
  );
};
export default RockPaperScissors;
