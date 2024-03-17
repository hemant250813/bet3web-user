import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Footer } from "../../../component/layout";
import { Header, HumburgerHeader } from "../../../component/layout";
import GameTitle from "./../GameTitle";
import validateKeno from "../../../validation/game/Keno";
import HeaderBackground from "../../../assets/images/headerBackground.jpg";
import { getLocalStorageItem } from "../../../utils/helper";
import { bet, userDetail, getSetting } from "../../../redux/action";
import { GAME, RESULT } from "../../../utils/constants";
import { Win, Lose } from "../../../container/Modal/index";
import { LoaderMain } from "../../../component/commonComponent";

const Keno = ({ navbar }) => {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [initialSelectedNumbers, setInitialSelectedNumbers] = useState([]);
  const [error, setError] = useState({});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const [winOpenModal, setWinOpenModal] = useState(false);
  const [loseOpenModal, setLoseOpenModal] = useState(false);

  const isAuth = getLocalStorageItem("token");
  const userData = JSON.parse(getLocalStorageItem("user"));
  const user_detail = useSelector((state) => state?.UserDetail?.userDetails);
  const [form, setForm] = useState({
    amount: "",
    balance: user_detail?.data?.balance,
  });
  const [tabViews, setTabViews] = useState([
    { percentage: "ten", isActive: false },
    { percentage: `twenty`, isActive: false },
    { percentage: `thirty`, isActive: false },
    { percentage: "fourty", isActive: false },
    { percentage: `fifty`, isActive: false },
    { percentage: `sixty`, isActive: false },
    { percentage: "seventy", isActive: false },
  ]);

  let initialNumbers = [];

  const setting = useSelector((state) => state?.GetSetting?.setting);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSetting({ game: "keno" }));
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
      navigate("/keno");
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
    // e.preventDefault();
    console.log("sddddddddddd");
    const filterTabList = tabViews.map((el) =>
      el.percentage === tab
        ? { ...el, isActive: true }
        : { ...el, isActive: false }
    );
    setTabViews(filterTabList);
  };

  const tabSwitchLeave = (e, tab) => {
    const filterTabList = tabViews.map((el) =>
      true ? { ...el, isActive: false } : el
    );
    setTabViews(filterTabList);
  };

  const handleClick = () => {
    const { errors, isValid } = validateKeno(form, selectedNumbers, setting);
    if (isValid) {
      selectRandomNumbers(30, "stop", initialSelectedNumbers);
    } else {
      setError(errors);
    }
  };

  // Function to toggle selection of numbers
  const toggleNumber = (number, type) => {
    setError((prevState) => ({
      ...prevState,
      ["number"]: "",
    }));
    const index = selectedNumbers.indexOf(number);
    if (index === -1) {
      // If the number is not already selected, add it
      if (selectedNumbers.length < 10) {
        setSelectedNumbers([...selectedNumbers, number]);
        setInitialSelectedNumbers([...selectedNumbers, number]);
      }
    } else {
      // If the number is already selected, remove it
      const updatedNumbers = [...selectedNumbers];
      updatedNumbers.splice(index, 1);
      setSelectedNumbers(updatedNumbers);
      setInitialSelectedNumbers([updatedNumbers]);
    }
  };

  const resetHandler = (e) => {
    setForm((prevState) => ({
      ...prevState,
      ["amount"]: "",
    }));
  };

  // Function to generate numbers
  const generateNumbers = () => {
    const numbers = [];
    for (let i = 1; i <= 80; i++) {
      const isSelected = selectedNumbers.includes(i);
      const numberStyle = isSelected
        ? "bg-blue-500 text-white transition-transform duration-700 transform -translate-y-1"
        : ""; // Apply blue background and white text for selected numbers
      numbers.push(
        <span
          key={i}
          className={`text-white border border-[#3F93F9] w-12 h-12 p-4 m-2 flex justify-center items-center cursor-pointer rounded-md ${numberStyle}`}
          onClick={() => toggleNumber(i)}
        >
          {i}
        </span>
      );
    }
    return numbers;
  };

  // Function to select random numbers
  const selectRandomNumbers = (count_down, type, initial) => {
    setError((prevState) => ({
      ...prevState,
      ["number"]: "",
    }));
    let count = 0;
    let clearRandomInterval = setInterval(() => {
      count++;
      let randomNumbers = [];
      while (randomNumbers.length < 10) {
        const randomNumber = Math.floor(Math.random() * 80) + 1;
        if (!randomNumbers.includes(randomNumber)) {
          randomNumbers.push(randomNumber);
        }
      }
      if (type === "play") {
        initialNumbers = [...randomNumbers];
      }

      setSelectedNumbers(randomNumbers);
      if (type === "play") {
        setInitialSelectedNumbers(initialNumbers);
      }

      if (count === count_down) {
        clearInterval(clearRandomInterval);
        if (type === "stop") {
          let matchCount = initial?.filter((num) =>
            randomNumbers?.includes(num)
          ).length;
          resetHandler();
          if (matchCount === 4) {
            let pl = (parseInt(form.amount) * setting?.odd[0]?.match1) / 100;
            onSubmit("win", pl);
            setWinOpenModal(true);
          } else if (matchCount === 5) {
            let pl = (parseInt(form.amount) * setting?.odd[0]?.match2) / 100;
            onSubmit("win", pl);
            setWinOpenModal(true);
          } else if (matchCount === 6) {
            let pl = (parseInt(form.amount) * setting?.odd[0]?.match3) / 100;
            onSubmit("win", pl);
            setWinOpenModal(true);
          } else if (matchCount === 7) {
            let pl = (parseInt(form.amount) * setting?.odd[0]?.match4) / 100;
            onSubmit("win", pl);
            setWinOpenModal(true);
          } else if (matchCount === 8) {
            let pl = (parseInt(form.amount) * setting?.odd[0]?.match5) / 100;
            onSubmit("win", pl);
            setWinOpenModal(true);
          } else if (matchCount === 9) {
            let pl = (parseInt(form.amount) * setting?.odd[0]?.match6) / 100;
            onSubmit("win", pl);
            setWinOpenModal(true);
          } else if (matchCount === 10) {
            let pl = (parseInt(form.amount) * setting?.odd[0]?.match7) / 100;
            onSubmit("win", pl);
            setWinOpenModal(true);
          } else {
            let pl = -parseInt(form.amount);
            onSubmit("win", pl);
            setLoseOpenModal(true);
          }
          console.log("matchCount", matchCount);
        }
      }
    }, 50);
  };

  const onSubmit = (keno, pl) => {
    let payload = {
      game: GAME?.KENO,
    };
    if (keno === "win") {
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
  console.log("tabViews", tabViews);
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
            <GameTitle title="Keno" route="rock_paper_scissors" />
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
                // style={{
                //   height:
                //     windowWidth === 320
                //       ? "250px"
                //       : windowWidth === 375
                //       ? "300px"
                //       : windowWidth === 425
                //       ? "300px"
                //       : windowWidth === 768
                //       ? "650px"
                //       : windowWidth === 1024
                //       ? "650px"
                //       : windowWidth === 1440
                //       ? "700px"
                //       : "700px",
                //   width:
                //     windowWidth === 320
                //       ? "250px"
                //       : windowWidth === 375
                //       ? "300px"
                //       : windowWidth === 425
                //       ? "300px"
                //       : windowWidth === 768
                //       ? "650px"
                //       : windowWidth === 1024
                //       ? "850px"
                //       : windowWidth === 1440
                //       ? "640px"
                //       : "700px",
                //   overflow: "hidden",
                //   display: "flex",
                //   justifyContent: "center",
                //   alignItems: "center",
                //   perspective: "1000px",
                // }}
              >
                <div className="grid grid-cols-1">
                  <div className={`grid  ${windowWidth >= 425  && windowWidth < 768 ? "grid-cols-5":windowWidth >= 375 && windowWidth < 425 ?"grid-cols-4":windowWidth < 425 ?"grid-cols-3":"grid-cols-10"}`}>{generateNumbers()}</div>
                  <div className="flex flex-col items-center justify-center text-rose-600 font-serif mt-1">
                    {error?.number}
                  </div>
                  <div className="flex justify-around text-white mt-4">
                    {/* <span>Game Instruction</span> */}
                    <span className="flex">
                      <button
                        onClick={() => {
                          selectRandomNumbers(20, "play", []);
                          setInitialSelectedNumbers([]);
                        }}
                        className="mx-4 border-2 border-[#E3BC3F] hover:bg-[#E3BC3F] hover:font-bold py-2 px-4 rounded-md"
                      >
                        Random
                      </button>
                      <button
                        onClick={() => {
                          setSelectedNumbers([]);
                          setInitialSelectedNumbers([]);
                          setError((prevState) => ({
                            ...prevState,
                            ["number"]: "",
                          }));
                        }}
                        className="border-2 border-[#008000] hover:bg-[#008000] hover:font-bold py-2 px-4 rounded-md"
                      >
                        Refresh
                      </button>
                    </span>
                  </div>

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
                        } text-[#3F93F9]`}
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
                            console.log("name", name);

                            let finalAmount =
                              user_detail?.data?.balance - value;

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
                      {setting?.max?.toFixed(2)} USD
                    </span>
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

              {/* Card 2 */}
              <div className="relative group border border-gray-400 p-5">
                <div className="flex flex-col items-center justify-center text-white font-serif mt-1">
                  <p className="text-2xl font-bold mb-4">How To Win?</p>
                  <p className="text-xl mb-5">
                    Click the <span className="text-blue-500 text-2xl font-bold">10</span> numbers
                    that are on your scratch-off ticket, and then click
                    <span className="text-blue-500 text-2xl font-bold"> "Play Now"</span> button to
                    see if you are a winner!
                  </p>
                  <p
                    onMouseEnter={(e) => {
                      tabSwitch(e, "ten");
                    }}
                    onMouseLeave={() => {
                      tabSwitchLeave();
                    }}
                    className="text-xl flex justify-between w-full cursor-help"
                  >
                    <span
                      className={`${
                        tabViews[0]?.isActive
                          ? "text-white text-2xl font-bold"
                          : "text-blue-500"
                      }`}
                    >
                      If you match 4 numbers
                    </span>
                    <span
                      className={`text-blue-500 ${
                        tabViews[0]?.isActive
                          ? "transition-transform duration-700 transform -translate-x-96 text-white text-2xl font-bold"
                          : ""
                      }`}
                    >
                      {" "}
                      {setting?.odd[0]?.match1?.toFixed(2)} %
                    </span>
                  </p>
                </div>
                {/* Add the following <hr> element */}
                <hr className="my-8 border-0 h-px bg-blue-500 dark:bg-blue-500" />

                <div
                  onMouseEnter={(e) => {
                    tabSwitch(e, "twenty");
                  }}
                  onMouseLeave={() => {
                    tabSwitchLeave();
                  }}
                  className="flex flex-col items-center justify-center text-white font-serif mt-1 cursor-help"
                >
                  <p className="text-xl flex justify-between w-full ">
                    <span  className={`${
                        tabViews[1]?.isActive
                          ? "text-white text-2xl font-bold"
                          : "text-blue-500"
                      }`}>If match 5 number</span>
                    <span
                      className={`text-blue-500 ${
                        tabViews[1]?.isActive
                          ? "transition-transform duration-700 transform -translate-x-96 text-white text-2xl font-bold"
                          : ""
                      }`}
                    >
                      {setting?.odd[0]?.match2?.toFixed(2)} %
                    </span>
                  </p>
                </div>
                <hr className="my-8 border-0 h-px bg-blue-500 dark:bg-blue-500" />

                <div
                  onMouseEnter={(e) => {
                    tabSwitch(e, "thirty");
                  }}
                  onMouseLeave={() => {
                    tabSwitchLeave();
                  }}
                  className="flex flex-col items-center justify-center text-white font-serif mt-1 cursor-help"
                >
                  <p className="text-xl flex justify-between w-full ">
                    <span  className={`${
                        tabViews[2]?.isActive
                          ? "text-white text-2xl font-bold"
                          : "text-blue-500"
                      }`}>If match 6 number</span>
                    <span
                      className={`text-blue-500 ${
                        tabViews[2]?.isActive
                          ? "transition-transform duration-700 transform -translate-x-96 text-white text-2xl font-bold"
                          : ""
                      }`}
                    >
                      {" "}
                      {setting?.odd[0]?.match3?.toFixed(2)} %
                    </span>
                  </p>
                </div>
                <hr className="my-8 border-0 h-px bg-blue-500 dark:bg-blue-500" />

                <div
                  onMouseEnter={(e) => {
                    tabSwitch(e, "fourty");
                  }}
                  onMouseLeave={() => {
                    tabSwitchLeave();
                  }}
                  className="flex flex-col items-center justify-center text-white font-serif mt-1 cursor-help"
                >
                  <p className="text-xl flex justify-between w-full 3">
                    <span  className={`${
                        tabViews[3]?.isActive
                          ? "text-white text-2xl font-bold"
                          : "text-blue-500"
                      }`}>If match 7 number</span>
                    <span
                      className={`text-blue-500 ${
                        tabViews[3]?.isActive
                          ? "transition-transform duration-700 transform -translate-x-96 text-white text-2xl font-bold"
                          : ""
                      }`}
                    >
                      {" "}
                      {setting?.odd[0]?.match4?.toFixed(2)} %
                    </span>
                  </p>
                </div>
                <hr className="my-8 border-0 h-px bg-blue-500 dark:bg-blue-500" />

                <div
                  onMouseEnter={(e) => {
                    tabSwitch(e, "fifty");
                  }}
                  onMouseLeave={() => {
                    tabSwitchLeave();
                  }}
                  className="flex flex-col items-center justify-center text-white font-serif mt-1 cursor-help"
                >
                  <p className="text-xl flex justify-between w-full ">
                    <span  className={`${
                        tabViews[4]?.isActive
                          ? "text-white text-2xl font-bold"
                          : "text-blue-500"
                      }`}>If match 8 number</span>
                    <span
                      className={`text-blue-500 ${
                        tabViews[4]?.isActive
                          ? "transition-transform duration-700 transform -translate-x-96 text-white text-2xl font-bold"
                          : ""
                      }`}
                    >
                      {" "}
                      {setting?.odd[0]?.match5?.toFixed(2)} %
                    </span>
                  </p>
                </div>
                <hr className="my-8 border-0 h-px bg-blue-500 dark:bg-blue-500" />
                <div
                  onMouseEnter={(e) => {
                    tabSwitch(e, "sixty");
                  }}
                  onMouseLeave={() => {
                    tabSwitchLeave();
                  }}
                  className="flex flex-col items-center justify-center text-white font-serif mt-1"
                >
                  <p className="text-xl flex justify-between w-full ">
                    <span  className={`${
                        tabViews[5]?.isActive
                          ? "text-white text-2xl font-bold"
                          : "text-blue-500"
                      }`}>If match 9 number</span>
                    <span
                      className={`text-blue-500 ${
                        tabViews[5]?.isActive
                          ? "transition-transform duration-700 transform -translate-x-96 text-white text-2xl font-bold"
                          : ""
                      }`}
                    >
                      {" "}
                      {setting?.odd[0]?.match6?.toFixed(2)} %
                    </span>
                  </p>
                </div>
                <hr className="my-8 border-0 h-px bg-blue-500 dark:bg-blue-500" />
                <div
                  onMouseEnter={(e) => {
                    tabSwitch(e, "seventy");
                  }}
                  onMouseLeave={() => {
                    tabSwitchLeave();
                  }}
                  className="flex flex-col items-center justify-center text-white font-serif mt-1 cursor-help"
                >
                  <p className="text-xl flex justify-between w-full ">
                    <span  className={`${
                        tabViews[6]?.isActive
                          ? "text-white text-2xl font-bold"
                          : "text-blue-500"
                      }`}>If match 10 number</span>
                    <span
                      className={`text-blue-500 ${
                        tabViews[6]?.isActive
                          ? "transition-transform duration-700 transform -translate-x-96 text-white text-2xl font-bold"
                          : ""
                      }`}
                    >
                      {" "}
                      {setting?.odd[0]?.match7?.toFixed(2)} %
                    </span>
                  </p>
                </div>
                <hr className="my-8 border-0 h-px bg-blue-500 dark:bg-blue-500" />
              </div>
            </div>
          </section>
          <Footer />
          {winOpenModal && (
            <Win
              winOpenModal={winOpenModal}
              setWinOpenModal={setWinOpenModal}
              keno={true}
              flipResult={initialSelectedNumbers}
            />
          )}
          {loseOpenModal && (
            <Lose
              loseOpenModal={loseOpenModal}
              setLoseOpenModal={setLoseOpenModal}
              keno={true}
              flipResult={initialSelectedNumbers}
            />
          )}
        </>
      )}
    </>
  );
};
export default Keno;
