import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Header, HumburgerHeader, Footer } from "../../../component/layout";
import GameTitle from "../GameTitle";
import Slot from "../NumberSlots/Slot";
import validateNumberSlot from "../../../validation/game/numberSlot";
import HeaderBackground from "../../../assets/images/headerBackground.jpg";
import { getLocalStorageItem } from "../../../utils/helper";
import { bet, userDetail, getSetting } from "../../../redux/action";
import { GAME, RESULT } from "../../../utils/constants";
import { Win, Lose } from "../../../container/Modal/index";

const PlayNumberSlots = ({ navbar }) => {
  const [form, setForm] = useState({
    amount: "",
  });
  const [error, setError] = useState({});
  const [isPaused, setIsPaused] = useState(false);
  const [randomNumber, setRandomNumber] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [hideHeader, setHideHeader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [numbers, setNumbers] = useState([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]);
  const [tabViews, setTabViews] = useState([
    { route: "rock", isActive: false },
    { route: `paper`, isActive: false },
    { route: `scissor`, isActive: false },
  ]);
  const [threeDigitNumber, setThreeDigitNumber] = useState("");
  const [widthSlot, setWidthSlot] = useState("");
  const [heightSlot, setHeightSlot] = useState("");
  const [paddingSlot, setPaddingSlot] = useState("");
  const [marginSlot, setMarginSlot] = useState("");
  const [fontSizeTitle, setFontSizeTitle] = useState("");
  const [letterSpacingTitle, setLetterSpacingTitle] = useState("");
  const [marginTitle, setMarginTitle] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [winOpenModal, setWinOpenModal] = useState(false);
  const [loseOpenModal, setLoseOpenModal] = useState(false);

  const isAuth = getLocalStorageItem("token");
  const userData = JSON.parse(getLocalStorageItem("user"));

  const user_detail = useSelector((state) => state?.UserDetail?.userDetails);
  const setting = useSelector((state) => state?.GetSetting?.setting);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSetting({ game: "number_slot" }));
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
      navigate("/number_slot");
    } else {
      navigate("/");
    }

    if (windowWidth === 2560) {
      setWidthSlot("110px");
      setHeightSlot("100px");
      setPaddingSlot("20px 50px 25px");
      setMarginSlot("10px");

      setFontSizeTitle("7rem");
      setLetterSpacingTitle("3px");
      setMarginTitle("20px");
    } else if (windowWidth === 768) {
      setWidthSlot("110px");
      setHeightSlot("250px");
      setPaddingSlot("25px 80px 35px");
      setMarginSlot("15px");
      setFontSizeTitle("3rem");
      setLetterSpacingTitle("1px");
      setMarginTitle("10px");
    } else if (windowWidth === 425) {
      setWidthSlot("50px");
      setHeightSlot("100px");
      setPaddingSlot("10px 30px 15px");
      setMarginSlot("10px");
      setFontSizeTitle("3rem");
      setLetterSpacingTitle("1px");
      setMarginTitle("10px");
    } else if (windowWidth === 320) {
      setWidthSlot("50px");
      setHeightSlot("100px");
      setPaddingSlot("10px 30px 15px");
      setMarginSlot("8px");
      setFontSizeTitle("2rem");
      setLetterSpacingTitle("0px");
      setMarginTitle("15px");
    } else if (windowWidth === 1440) {
      setWidthSlot("110px");
      setHeightSlot("180px");
      setPaddingSlot("20px 60px 25px");
      setMarginSlot("10px");

      setFontSizeTitle("4rem");
      setLetterSpacingTitle("3px");
      setMarginTitle("20px");
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

  const tabSwitch = (e, tab) => {
    e.preventDefault();
    const filterTabList = tabViews.map((el) =>
      el.route === tab ? { ...el, isActive: true } : { ...el, isActive: false }
    );
    setTabViews(filterTabList);
  };

  // asdas
  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 9) + 1;
  };

  const shuffleNumbers = () => {
    const shuffledNumbers = numbers.map((row) =>
      row.map(() => generateRandomNumber())
    );
    setNumbers(shuffledNumbers);
  };
  // asdas

  const handleClick = () => {
    const { errors, isValid } = validateNumberSlot(
      form,
      threeDigitNumber,
      setting
    );
    if (isValid) {
      setIsPaused(true);
      const thisAmount = Math.floor(Math.random() * 36) + 20;
      setRandomNumber(thisAmount);
    } else {
      setError(errors);
    }
  };

  const handleInputChange = (e) => {
    const { name } = e.target;
    setError((prevState) => ({
      ...prevState,
      [name]: "",
    }));
    // Allow only digits and certain control keys (backspace, delete, arrow keys)
    if (
      !(
        (e.key >= "0" && e.key <= "9") ||
        e.key === "Backspace" ||
        e.key === "Delete" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight"
      )
    ) {
      e.preventDefault();
    }

    // Limit the input length to 3 digits
    if (
      e.target.value.length >= 3 &&
      e.key !== "Backspace" &&
      e.key !== "Delete"
    ) {
      e.preventDefault();
    }

    // Update state only when input is a valid three-digit number
    if (/^\d{0,3}$/.test(e.target.value)) {
      setThreeDigitNumber(e.target.value);
    }
  };

  const callbackCardShuffledPicked = (result, jackpot, percentage) => {
    console.log({ result: result, jackpot: jackpot, percentage: percentage });
    if (result === "win") {
      if (jackpot) {
        let pl = parseInt(form.amount) * percentage;
        onSubmit("win", pl);
      } else {
        let pl = (parseInt(form.amount) * percentage) / 100;
        onSubmit("win", pl);
      }
      setWinOpenModal(true);
    } else {
      let pl = -parseInt(form.amount);
      onSubmit("lose", pl);
      setLoseOpenModal(true);
    }

    setForm((prevState) => ({
      ...prevState,
      ["amount"]: "",
    }));
  };

  const onSubmit = (slot, pl) => {
    let payload = {
      game: GAME?.NUMBER_SLOT,
    };
    if (slot === "win") {
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
        <GameTitle title="Play Number Slot" route="number_slot" />
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
            <Slot
              isPaused={isPaused}
              setIsPaused={setIsPaused}
              randomValue={randomNumber}
              widthSlot={widthSlot}
              heightSlot={heightSlot}
              paddingSlot={paddingSlot}
              marginSlot={marginSlot}
              fontSizeTitle={fontSizeTitle}
              letterSpacingTitle={letterSpacingTitle}
              marginTitle={marginTitle}
              callbackCardShuffledPicked={callbackCardShuffledPicked}
              threeDigitNumber={threeDigitNumber}
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
                Minimum : 1.00 USD | Maximum : 100.00 USD | Win Amount 150.00 (3
                digit match) % | Win Amount 100.00 (1 digit match) % | Win
                Amount 25.00 (2 digit match) % | Win Amount x 2 (jackpot -777)
              </span>
            </div>
            <div></div>
            <div className="flex items-center justify-center relative p-20">
              <input
                type="text"
                name="number"
                onKeyDown={handleInputChange}
                onChange={handleInputChange}
                placeholder="Enter 3 digit number"
                className="border p-2 focus:outline-none focus:border-blue-500 h-full bg-[#020C25] text-white w-9/12"
              />
            </div>
            <div className="text-rose-600 font-serif mt-1">{error?.number}</div>
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
export default PlayNumberSlots;
