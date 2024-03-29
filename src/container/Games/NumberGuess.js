import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Footer } from "../../component/layout";
import { Header, HumburgerHeader } from "../../component/layout";
import GameTitle from "./GameTitle";
import validateNumberGuess from "../../validation/game/numberGuess";
import HeaderBackground from "../../assets/images/headerBackground.jpg";
import { getLocalStorageItem } from "../../utils/helper";
import { Win, Lose } from "../../container/Modal/index";
import { bet, userDetail, getSetting } from "../../redux/action";
import { GAME, RESULT } from "../../utils/constants";
import { LoaderMain } from "../../component/commonComponent";

const NumberGuess = ({ navbar }) => {
  const [error, setError] = useState({});
  const [randomNumber, setRandomNumber] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const [guessNumber, setGuessNumber] = useState(null);
  const [inputNumber, setInputNumber] = useState(0);
  const [numberOfAttempt, setNumberOfAttempt] = useState(0);
  const [loading, setLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [hideHeader, setHideHeader] = useState(false);
  const [winOpenModal, setWinOpenModal] = useState(false);
  const [loseOpenModal, setLoseOpenModal] = useState(false);

  const user_detail = useSelector((state) => state?.UserDetail?.userDetails);
  const [form, setForm] = useState({
    amount: "",
    balance: user_detail?.data?.balance,
  });
  const setting = useSelector((state) => state?.GetSetting?.setting);

  const isAuth = getLocalStorageItem("token");
  const userData = JSON.parse(getLocalStorageItem("user"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSetting({ game: "number_guess" }));
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
      navigate("/number_guess");
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

  const guessTheNumber = (e) => {
    e.preventDefault();
    setGuessNumber(inputNumber);

    if (numberOfAttempt === 2) {
      setIsPlay(false);
      if (guessNumber === randomNumber) {
        setWinOpenModal(true);
        onSubmit("win");
        resetHandler();
      } else {
        setLoseOpenModal(true);
        onSubmit("lose");
        resetHandler();
      }
    } else {
      if (guessNumber === randomNumber) {
        setWinOpenModal(true);
        onSubmit("win");
        resetHandler();
      }
    }
    setNumberOfAttempt(numberOfAttempt + 1);
  };

  const onSubmit = (hand) => {
    let payload = {
      game: GAME?.ROCK_PAPER_SCISSORS,
    };

    if (hand === "win") {
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
          }
        },
      })
    );
  };

  const handleClick = () => {
    const { errors, isValid } = validateNumberGuess(form, setting);
    if (isValid) {
      setIsPlay(true);
      setGuessNumber(null);
      setNumberOfAttempt(0);
      // Generate a random number between 1 and 99
      var randomNumber = Math.floor(Math.random() * 99) + 1;
      setRandomNumber(randomNumber);
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
            <GameTitle title="Play Number Guessing" route="number_guess" />
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
                className="relative group mx-auto p-4"
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
                <div className="p-6 bg-[#020C25]">
                  {numberOfAttempt === 3 ? (
                    <p className="text-[#E3BC3F] ml-8 mr-8 text-4xl">
                      Oops You Lost! The Number was {randomNumber}
                    </p>
                  ) : guessNumber === null ? (
                    <p className="text-[#E3BC3F] ml-8 mr-8 text-4xl">
                      You Will Get 3 Chances Per Invest
                    </p>
                  ) : guessNumber < randomNumber ? (
                    <p className="text-[#E3BC3F] ml-8 mr-8 text-4xl">
                      The Number is short
                    </p>
                  ) : guessNumber > randomNumber ? (
                    <p className="text-[#E3BC3F] ml-8 mr-8 text-4xl">
                      The Number is long
                    </p>
                  ) : (
                    <p className="text-[#E3BC3F] ml-8 mr-8 text-4xl">
                      You Won!!
                    </p>
                  )}
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
                  {isPlay && (
                    <div className="items-center justify-center p-12 bg-[#020C25]">
                      <input
                        type="text"
                        onChange={(e) => setInputNumber(e.target.value)}
                        placeholder="Number"
                        className="border-none p-2 focus:outline-none focus:border-0 focus:ring-0 h-full bg-[#020C25] text-white w-9/12"
                      />
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-center justify-center w-11/12 p-2">
                  {isPlay ? (
                    <button
                      onClick={(e) => guessTheNumber(e)}
                      className="bg-[#E3BC3F] p-4 w-9/12"
                    >
                      Guess The Number
                    </button>
                  ) : (
                    <button
                      onClick={() => handleClick()}
                      className="bg-[#3F93F9] p-4 w-9/12 text-[#fff]"
                    >
                      Play Now
                    </button>
                  )}

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
export default NumberGuess;
